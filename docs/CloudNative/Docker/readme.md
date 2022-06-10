---
title: Docker 介绍
---
<center><h1>Docker 介绍</h1></center>

---

Docker 是一个开放源代码软件，是一个开放平台，用于开发应用、交付（shipping）应用、运行应用。Docker允许用户将基础设施（Infrastructure）中的应用单独分割出来，形成更小的颗粒（容器），从而提高交付软件的速度。

Docker 容器与虚拟机类似，但二者在原理上不同，容器是将操作系统层虚拟化，虚拟机则是虚拟化硬件，因此容器更具有便携性、高效地利用服务器。

下图是 Docker 官方给出的架构图，里面包括了 Docker 客户端、Docker 容器所在的宿主机和 Docker 镜像仓库三个部分。

其中宿主机包括了 Docker 守护进程、本地容器和本地镜像，Docker 守护进程（dockerd）的作用是侦听 Docker API 请求和管理 Docker 对象。

<img width="900" src="/img/1649947060.png">

</br>

> 参考地址：
>
> https://zh.wikipedia.org/wiki/Docker
>

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月14日"
    }
  }
</script>