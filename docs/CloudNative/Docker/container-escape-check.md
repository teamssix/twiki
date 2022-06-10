---
title: 容器逃逸方法检测指北
---

<center><h1>容器逃逸方法检测指北</h1></center>

---

## 0x00 前言

最近发现有关容器逃逸的文章大多覆盖的方法不全，而且有些缺少相应的检测方法，导致 RT 在拿到一个容器权限时，比较难以判断这个容器存在哪些逃逸方法。

本文尽可能覆盖全容器逃逸检测的方法，并尽可能的给出在容器内部就能检测的方法，这样 RT 在容器内运行一下命令，根据返回的结果就能判断有没有这个漏洞了。

针对这些检测方法，我这边也写了相应的脚本，方便在容器内部一键检测，脚本放到文章底部了。

对于一些无法直接在容器内部检测到的逃逸方法，这里是不列举的，如果读者知道其他逃逸漏洞的检测方法，欢迎留言或者给脚本提 PR

### 判断是否为容器环境

首先对于 RT 而言，需要先判断当前环境是不是容器环境，可以直接使用下面的命令去判断

```bash
cat /proc/1/cgroup | grep -qi docker && echo "Is Docker" || echo "Not Docker"
```

如果返回 Is Docker，说明当前是 Docker 容器环境，反之亦然。

### 容器逃逸介绍

在开始之前对于容器逃逸主要有以下三种方法：

1. 不安全的配置
2. 相关程序漏洞
3. 内核漏洞

这里分别列举一下每种逃逸的检测方法，这样在拿到一个容器权限的时候，本文可以起到一个手册的作用。

RT 可以通过本文中所提到的检测方法，判断出当前容器可能存在哪种逃逸漏洞，从而采取对应的逃逸方法。

*注意：*

1. *以下检测方法大多是基于笔者自己的经验，可能会存在误检或者漏检的情况，如果读者发现，欢迎留言或者给脚本提 Issue*
2. *由于「相关程序漏洞」这种逃逸方法需要根据目标 Docker 的版本去判断，这里暂时没想到从容器内部获取 Docker 版本的方法，因此脚本暂时还不支持这块的检测。*

## 0x01 不安全的配置

### 1、特权模式

执行以下命令，如果返回 Is privileged mode 则说明当前是特权模式

```bash
cat /proc/self/status | grep -qi "0000003fffffffff" && echo "Is privileged mode" || echo "Not privileged mode"
```

如果返回 Not privileged mode 则说明当前不是特权模式

### 2、挂载 Docker Socket

执行以下命令，如果返回 Docker Socket is mounted. 说明当前挂载了 Docker Socket

```bash
ls /var/run/ | grep -qi docker.sock && echo "Docker Socket is mounted." || echo "Docker Socket is not mounted."
```

如果返回 Docker Socket is not mounted. 则说明没有挂载

### 3、挂载 procfs

执行以下命令，如果返回 Procfs is mounted. 说明当前挂载了 procfs

```bash
find / -name core_pattern 2>/dev/null | wc -l | grep -q 2 && echo "Procfs is mounted." || echo "Procfs is not mounted."
```

如果返回 Procfs is not mounted. 则说明没有挂载

### 4、挂载宿主机根目录

执行以下命令，如果返回 Root directory is mounted. 则说明宿主机目录被挂载

```bash
find / -name passwd 2>/dev/null | grep /etc/passwd | wc -l | grep -q 7 && echo "Root directory is mounted." || echo "Root directory is not mounted."
```

如果返回 Root directory is not mounted. 则说明没有挂载

### 5、Docker remote api 未授权访问

执行以下命令，如果返回 Docker Remote API Is Enabled. 说明目标存在 Docker remote api 未授权访问

```bash
IP=`hostname -i | awk -F. '{print $1 "." $2 "." $3 ".1"}' ` && timeout 3 bash -c "echo >/dev/tcp/$IP/2375" > /dev/null 2>&1 && echo "Docker Remote API Is Enabled." || echo "Docker Remote API is Closed."
```

如果返回 Docker Remote API is Closed. 则表示目标不存在 Docker remote api 未授权访问

## 0x02 内核漏洞

### 1、CVE-2016-5195  DirtyCow 逃逸

执行 uname -r 命令，如果在 2.6.22 <= 版本 <= 4.8.3 之间说明可能存在 CVE-2016-5195 DirtyCow 漏洞。

### 2、CVE-2020-14386 

执行 uname -r 命令，如果在 4.6 <= 版本 < 5.9 之间说明可能存在 CVE-2020-14386 漏洞。

### 3、CVE-2022-0847  DirtyPipe 逃逸

执行 uname -r 命令，如果在 5.8 <= 版本 < 5.10.102 < 版本 < 5.15.25 < 版本 < 5.16.11 之间说明可能存在 CVE-2022-0847 DirtyPipe 漏洞。

## 0x03 容器逃逸检测脚本

项目地址：https://github.com/teamssix/container-escape-check

直接在容器中执行以下命令即可

```bash
wget https://raw.githubusercontent.com/teamssix/container-escape-check/main/container-escape-check.sh -O -| bash
```

不过大多容器可能没有 wget 命令，因此可以将脚本先克隆到本地，然后上传到容器再执行

```bash
git clone https://github.com/teamssix/container-escape-check.git
cd container-escape-check
chmod +x container-escape-check.sh
./container-escape-check.sh
```

![](/img/1649924405.png)

> 参考资料：
>
> 《云原生安全-攻防实践与体系构建》
>
> [https://github.com/brant-ruan/awesome-container-escape](https://github.com/brant-ruan/awesome-container-escape)
>
> 原文链接：[https://zone.huoxian.cn/d/990](https://zone.huoxian.cn/d/990)

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月14日"
    }
  }
</script>
