---
title: K8s 所面临的风险

---

<center><h1>K8s 所面临的风险</h1></center>

---

## 0、前言

这里学习下 k8s 中所面临的一些风险，主要有 5 个部分：

1、容器基础设施存在的风险

2、组件接口存在的风险

3、集群网络存在的风险

4、访问控制机制存在的风险

5、自身的漏洞



其中容器基础设施存在的风险和之前分享的基本一致，这里主要看剩下的四种。

## 1、组件接口存在的风险

### API Server

API Server 默认服务端口为 8080 和 6443，8080 端口提供 HTTP 服务，没有认证与授权机制，而 6443 提供 HTTP 服务，支持认证和授权服务。

默认情况下 8080 端口不启动，但如果用户开启了该服务，就会造成 API Server 的未授权访问，从而控制整个集群。

### Kubelet

与 API Server 类似，Kubelet 也运行着 API 服务，默认服务端口为 10250 和 10248

Kubelet 存在的风险主要也是未授权访问，如果 Kubelet 存在未授权访问，就可以控制所在节点的权限。

### Dashboard

Dashboard 默认端口为  8001，从 1.10.1 版本起，Dashboard 默认禁用了跳过按钮，但如果用户为了方便或者其他原因，开启了相关功能，就会导致 Dashboard 的未授权访问。

### etcd

etcd 默认监听 2379、2380 端口，前者用于客户端连接，后者用于多个 etcd 实例之间的通信。

默认情况下，etcd 提供的两个端口都需要相应的证书才能访问，但如果 RT 窃取了证书，或者用户将 etcd 设置了允许匿名访问，那么 RT 就可以直接访问 etcd 并窃取数据。

由于 Kubernetes 集群内部的各种资源及其状态都存在 etcd 中，因此如果可以读取 etcd 的数据，就可能获得高权限，从而控制集群。

## 2、集群网络存在的风险

Pod 是由一个或多个容器构成的集合，在没有其他网络隔离策略和 Pod 安全策略的默认情况下，由于 Pod 与 Pod 之间可以联通，且 Pod 内的 root 用户具有 CAP_NET_RAW 权限（即允许使用原始套接字的权限），因此集群内部可能会发生内网横向的风险。

## 3、访问控制机制存在的风险

Kubernetes 中的访问控制机制主要由认证机制、授权机制和准入机制三个部分组成。

如果访问控制比较宽松或混乱或者允许 Kubernetes 的未授权访问，RT 可能借此直接获得集群管理员权限。

## 4、无法根治的软件漏洞

Kubernetes 自身也被爆出许多安全漏洞，这类自然也属于 Kubernetes 所面临的的风险。



> 参考资料：
>
> 《云原生安全-攻防实践与体系构建》
>
> https://www.jianshu.com/p/a7f6c4f420fa
>
> https://kubernetes.io/zh/docs/concepts/overview/what-is-kubernetes/
>
> [https://www.kubernetes.org.cn/kubernetes%E8%AE%BE%E8%AE%A1%E6%9E%B6%E6%9E%84](https://www.kubernetes.org.cn/kubernetes设计架构)



<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月15日"
    }
  }
</script>
