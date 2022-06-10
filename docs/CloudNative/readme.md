---
title: 云原生
---
<center><h1>云原生</h1></center>

---

## 0x01 一些名词介绍

### 容器

Docker 是一个开放源代码软件，是一个开放平台，用于开发应用、交付（shipping）应用、运行应用。Docker允许用户将基础设施（Infrastructure）中的应用单独分割出来，形成更小的颗粒（容器），从而提高交付软件的速度。

Docker 容器与虚拟机类似，但二者在原理上不同，容器是将操作系统层虚拟化，虚拟机则是虚拟化硬件，因此容器更具有便携性、高效地利用服务器。

下图是 Docker 官方给出的架构图，里面包括了 Docker 客户端、Docker 容器所在的宿主机和 Docker 镜像仓库三个部分。

其中宿主机包括了 Docker 守护进程、本地容器和本地镜像，Docker 守护进程（dockerd）的作用是侦听 Docker API 请求和管理 Docker 对象。

<img width="700" src="/img/1649947060.png">

### 容器编排

容器编排（Container Orchestration）是指自动化容器的部署、管理、扩展和联网，容器编排可以为需要部署和管理成百上千个 Linux 容器和主机的企业提供便利。

常见的容器编排工具方案有 Kubernetes、Docker Swarm 和 Apache Mesos 等。

以下是 Sysdig 在 2021 年给出的容器编排工具流行度图表，可以看到 Kubernetes 可谓是一骑绝尘。

<img width="800" src="/img/1649948485.png">

图片来源：https://dig.sysdig.com/c/pf-2021-container-security-and-usage-report?x=u_WFRi&utm_source=gated-organic&utm_medium=website

### 无服务

无服务（Serverless）是一种云原生开发模型，可使开发人员专注构建和运行应用，这并不是说没有服务器，而是说开发者不用去管服务器只负责开发就行。

无服务计算产品通常被分为两类，分别是后端即服务（BaaS）和函数即服务（FaaS），其中 FaaS 是 Serverless 的主要实现方式，FaaS 的相关产品主要有 AWS 的 Lambda、Azure 的  Functions Serverless Compute、GCP 的 Firebase Cloud Functions、阿里云的 Function Compute 等。

### 微服务

微服务（Microservices）是一种软件架构风格，它是以专注于单一责任与功能的小型功能区块为基础，利用模块化的方式组合出复杂的大型应用程序，各功能区块使用与语言无关的API集相互通信。

这个是 Wiki 上给出的定义，如果具体的想了解微服务是什么可以看知乎上的这个帖子：https://www.zhihu.com/question/65502802

### 服务网格

服务网格（Service Mesh）用于控制应用的不同部分之间如何共享数据，服务网格内置于应用程序中的专用基础架构层，这个可见的基础架构层可以记录应用的不同部分是否能正常交互。

在服务网格中，请求将通过所在基础架构层中的代理在微服务之间路由，构成服务网格的各个代理有时被称为"sidecar"

如果没有服务网格，每项微服务都需要进行逻辑编码，才能管理服务间通信，这会导致开发人员无法专注于业务目标，同时，这也意味着通信故障难以诊断，因为管理服务间通信的逻辑隐藏在每项服务中。

<img width="800" src="/img/1649948493.png">

### CNCF

CNCF (Cloud Native Computing Foundation) 云原生计算基金会，于 2015 年7月21日成立，隶属于 Linux 基金会，CNCF 的口号是坚持和整合开源技术来编排容器作为微服务架构的一部分。

CNCF 是一个孵化、运营云原生生态的中立组织，CNCF 对于云原生应用的推广和普及发挥着重要的作用。

在 landscape.cncf.io 可以看到由 CNCF 所维护的云原生全景图。

![](/img/1649948478.png)

## 0x02 云原生安全

### 云原生

云原生（Cloud Native）可以拆分成「云」和「原生」去看。

「云」相对的就是本地，传统应用都跑在本地服务器上，而云则表示跑在云服务器上。

「原生」则可以简单的理解成出生地的意思，放在云环境中所表达的意思就是：在把应用跑到云服务器上时，应该充分的利用云自身的特点，比如弹性和分布式优势。

如果只是简单的把原来本地跑的业务放到云上，高举“上云”大旗，那只能叫做“拆迁户”，不能叫做云原生；当“上云”的风潮过去后，开始出现了直接就部署在云上的业务，这些业务完全按照“云”的特点去设计，这种是“云”的原住民，可以叫做云原生。

CNCF 对于云原生的见解为：

云原生技术有利于各组织在公有云、私有云和混合云等新型动态环境中，构建和运行可弹性扩展的应用。云原生的代表技术包括容器、服务网格、微服务、不可变基础设施和声明式 API。

这些技术能够构建容错性好、易于管理和便于观察的松耦合系统。结合可靠的自动化手段，云原生技术使工程师能够轻松地对系统作出频繁和可预测的重大变更。

对于云原生系统一般有以下特征：

- 轻、快、不变的基础设施
- 弹性服务编排

- 开发运营一体化
- 微服务架构

- 无服务模型

### 云原生安全

在介绍完云原生后，云原生安全就变得容易理解了，云原生安全至少包含了微服务安全、无服务安全、编排平台安全、服务网格安全、容器安全、宿主机安全等等。

根据云原生环境的构成，面向云原生环境的安全体系可以概括为以下三个层面：

- 容器安全
- 编排系统安全

- 云原生应用安全：包括了微服务、无服务、服务网格、零信任体系、API 安全等等

另外除了这些和云原生环境相关的技术之外，云原生安全还包含了一些传统安全的内容，比如宿主机的安全等等。

> 参考链接：
>
> 《云原生安全-攻防实践与体系构建》
>
> https://zh.wikipedia.org/wiki/Docker
>
> https://www.jianshu.com/p/a37baa7c3eff
>
> https://www.51cto.com/article/652294.html
>
> https://jimmysong.io/kubernetes-handbook/cloud-native/cncf.html
>
> https://zh.wikipedia.org/wiki/%E5%BE%AE%E6%9C%8D%E5%8B%99
>
> https://www.redhat.com/zh/topics/cloud-native-apps/what-is-serverless
>
> https://www.redhat.com/zh/topics/microservices/what-is-a-service-mesh
>
> https://decodezp.github.io/2020/05/23/quickwords43-what-is-cloudnative
>
> https://www.redhat.com/zh/topics/containers/what-is-container-orchestration
>
> https://jimmysong.io/kubernetes-handbook/cloud-native/cloud-native-definition.html
>
> https://www.cncf.io/announcements/2015/06/21/new-cloud-native-computing-foundation-to-drive-alignment-among-container-technologies/

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月14日"
    }
  }
</script>