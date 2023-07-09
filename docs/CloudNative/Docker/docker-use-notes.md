---
title: Docker 使用笔记


---

<center><h1>Docker 使用笔记</h1></center>

---

## 0x00 前言

平时在使用 Docker 时，经常会碰到忘记相关命令的情况，因此平时忘记一个就会记录一个，经过多年的记录，Docker 相关的笔记已经记录了不少。

最近在看代码审计的时候又提到了 Docker，正好借着这个机会好好的把原来记录的比较乱的 Docker 笔记整理一下。

如果你也面临过「在使用 Docker 时，时不时就会忘记某条命令」的情况，那么我相信本篇文章应该会对你有所帮助。

## 0x01 安装

### 1、安装 Docker

```
curl -fsSL https://get.docker.com/ | sh
```

或者

```
wget -qO- https://get.docker.com/ | sh
```

在命令中输入以下命令，如果输出 helloword 表示 Docker 安装成功。

```
docker run ubuntu echo "helloworld"
```

![](https://teamssix.oss-cn-hangzhou.aliyuncs.com/202110282041924.png?x-oss-process=image/auto-orient,1/quality,q_80/watermark,bucket_teamssix,image_VGVhbXNTaXhXaW5YaW5Mb2dvLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSxQXzM4,x_10,y_10)

### 2、安装 Docker-Compose

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

### 3、Docker 设置国内镜像源

```
vi /etc/docker/daemon.json

{
    "registry-mirrors": ["http://hub-mirror.c.163.com"]
}

systemctl restart docker.service
```

国内加速地址如下：

```
Docker中国区官方镜像
https://registry.docker-cn.com

网易
http://hub-mirror.c.163.com

中国科技大学
https://docker.mirrors.ustc.edu.cn

阿里云容器  服务
https://cr.console.aliyun.com/
```

## 0x02 使用

### 1、搜索镜像

```
docker search centos
```

### 2、拉取镜像

```
docker pull centos
```

### 3、查看镜像文件

```
docker images
```

查看镜像层级关系

```
docker images tree

# 以前这个命令是：

docker images --tree
```

### 4、查看docker所有进程

```
docker ps -a
```

### 5、开启容器

开启指定容器，这里的容器名为 Web

```
docker start web
```

启动所有容器

```
docker start $(docker ps -aq)
```

### 6、进入正在运行的容器

docker 创建的

```
docker attach web
```

docker-compose 创建的

container_name 需要在 docker-compose.yml 文件中查看

```
docker-compose exec container_name bash
```

### 7、指定端口启动创建进入容器

```
docker run -p 9992:80 -p 8882:8888 -it ubuntu /bin/bash
docker run --name web1 -p 9991:80 -p 8881:8888 -it centos /bin/bash
```

### 8、导出导入镜像

export\import 导入导出

```
docker export web > /home/docker_web.tar
docker import /home/docker_web.tar
```

save\load 导入导出

```
docker save 9610cfc68e8d > /home/docker_web.tar
docker load < /home/docker_web.tar
```

export\import 与 save\load 的区别：

* export\import 导出的镜像文件大小要小于 save\load 导出的镜像

* export\import 是根据容器拿到的镜像，再导入时会丢失镜像所有的历史，所以无法进行回滚操作；而 save\load 的镜像，没有丢失镜像的历史，可以回滚到之前的层。

核心原因是 export 是针对容器的导出，所以只有所有层组合的最终版本；而 save 则是针对镜像的，所以可以看到每一层的信息。

### 9、修改正在运行的容器端口映射

a、停止容器

b、 停止 docker 服务(systemctl stop docker)

c、 修改这个容器的 hostconfig.json 文件中的端口（原帖有人提到，如果 config.v2.json 里面也记录了端口，也要修改）

```
cd /var/lib/docker/3b6ef264a040* 	# 这里是 CONTAINER ID

vi hostconfig.json

# 如果之前没有端口映射, 应该有这样的一段:
"PortBindings":{}

# 增加一个映射, 这样写:
"PortBindings":{"3306/tcp":[{"HostIp":"","HostPort":"3307"}]}

# 前一个数字是容器端口, 后一个是宿主机端口
# 而修改现有端口映射更简单, 把端口号改掉就行
```

d、启动docker服务(systemctl start docker)

e、启动容器

### 10、文件传输

```
docker cp 本地文件路径 ID全称:容器路径

# 或者

docker cp ID全称:容器文件路径 本地路径
```

### 11、后台运行docker

启动全新的容器，该命令会在后台运行容器，并返回容器ID

```
docker run -d
```

对于现有的容器

```
ctrl+P+Q
```

## 0x03 卸载

### 1、停止容器

停止指定容器

```
docker stop web
```

停止所有容器

```
docker stop $(docker ps -aq)
```

### 2、删除容器和镜像

删除指定容器

```
docker container rm d383057928b4	# 指定容器 ID
```

删除所有已退出的容器

```
docker rm $(docker ps -q -f status=exited)
```

删除所有已停止的容器

```
docker rm $(docker ps -a -q)
```

删除所有正在运行和已停止的容器

```
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```

删除所有容器，没有任何标准

```
docker container rm $(docker container ps -aq)
```

Docker 资源清理

```
docker container prune	# 删除所有退出状态的容器
docker image prune			# 删除 dangling 或所有未被使用的镜像
docker network prune		# 删除所有未使用的网络
docker volume prune			# 删除未被使用的数据卷
docker system prune			# 删除已停止的容器、dangling 镜像、未被容器引用的 network 和构建过程中的 cache，安全起见，这个命令默认不会删除那些未被任何容器引用的数据卷，如果需要同时删除这些数据卷，你需要显式的指定 --volumns 参数
docker system prune --all --force --volumns 	# 这次不仅会删除数据卷，而且连确认的过程都没有了！注意，使用 --all 参数后会删除所有未被引用的镜像而不仅仅是 dangling 镜像
```

删除所有镜像

```
docker rmi $(docker images -q)
```

### 3、卸载Docker

```
yum list installed | grep docker
yum -y remove docker.x86_64
```

### 4、卸载Docker-compose

```
rm /usr/local/bin/docker-compose
```

> 参考资料：
>
> [https://blog.csdn.net/a906998248/article/details/46236687](https://blog.csdn.net/a906998248/article/details/46236687)
>
> [https://blog.csdn.net/wesleyflagon/article/details/78961990](https://blog.csdn.net/wesleyflagon/article/details/78961990)

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月15日"
    }
  }
</script>
