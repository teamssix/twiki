---
title: K8s 介绍
---
<center><h1>K8s 介绍</h1></center>

---

Kubernetes 又称 k8s，是 Google 在 2014 年开源的一个用来管理容器的平台，以下是 k8s 架构图。

   <img width="1000" src="/img/1649993172.png">

k8s 主要由以下核心组件组成：

- etcd 保存了整个集群的状态
- API Server 提供了资源操作的唯一入口，并提供认证、授权、访问控制、API 注册和发现等机制

- Controller Manager 负责维护集群的状态，比如故障检测、自动扩展、滚动更新等
- Scheduler 负责资源的调度，按照预定的调度策略将 Pod 调度到相应的机器上

- Kubelet 负责维护容器的生命周期，同时也负责Volume（CVI）和网络（CNI）的管理
- Container Runtime 负责镜像管理以及 Pod 和容器的真正运行（CRI）

- Kube-proxy 负责为 Service 提供 Cluster 内部的服务发现和负载均衡

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月15日"
    }
  }
</script>
