---
title: 配置与访问凭证
---

## 配置凭证

CF 支持两种配置访问凭证的方法，一种是利用永久的访问凭证去配置，一种是利用临时的访问凭证去配置。

同时支持存储你的访问凭证在本地的数据库中，并且提供了 key 子命令方便用户在多凭证中切换和统一管理。

而凭证数据库的具体位于 `～/.cf/local.db` 的 keys 表中

### 快速配置凭证

```bash
cf configure
```

   <img width="800" src="/img/1656772180.png">

在配置凭证的时候 `Access Key ID` 和 `Access Key Secret` 参数是必填的，当配置临时访问凭证时，需要填 `STS Token` 参数。

> 配置文件被会存储在 `~/.cf/config.json`

### 查看当前凭证

```bash
cf configure ls
```

   <img width="800" src="/img/1656594154.png">

## 凭证库

在 0.3.1 版本后加入特性 key 子命令，可以用来管理多个凭证。

key 命令通过修改/存取本地数据库和配置文件 `~/.cf/config.json` 来进行管理

### 创建凭证/更新凭证信息

```bash
cf key add 
# 或者
cf key update
cf key a
```

cd进行交互式的命令行界面进行添加 

> 纯命令行添加版本并未支持

需要给予六个信息分别为

- `Name`：凭证名称 可以冲突 可以认为是助记符号
- `Platform`: 云服务提供商 这里会有选择
- `Access Key ID`: 唯一标识
- `Access Key Secret`
- `STS Token`: [可选] 不需要添加时 直接回车跳过即可 
  
  一旦添加非空 STSToken 则该整串密钥会被认为是 STS 临时密钥

  而上方的 Access Key ID 和 Access Key Secret 就会被认为是 STSToken 的 AKSK
- `Remark`: [可选] 备注信息 可以用于使用者标记资产等 自由度很高 也可以不填

当添加 AccessKeyID 相同的凭证时，那么程序会更新该凭证的信息 而不会进行添加

### 删除凭证

```bash
cf key del <需要删除的AccessKey[Optional]> 
# 或者
cf key d
cf key rm  
```

如果具有参数 需要删除的 Accesskey 那么程序会找到这个 Accesskey 并且删除

如果没有则会进行报错

而当没有输入第一个参数的时候，进入交互式选择会需要输入一个基于名称的查询然后得到一个 AccessKey 的列表

> 注意这个查询是基于 LIKE 的所以可以使用通配符 % 来匹配一段 _ 来匹配一个字符

基于该查询得到一个列表的 AccessKey 的列表再进行选择需要删除的 Key

### 查看凭证库列表

```bash
cf key ls 
# 或者
cf key list 
cf key l
```

这时会获取数据库中所有的凭证 返回一个具体的大表

### 查看当前使用的凭证

```bash
cf key head
# 或者
cf key h
```

cf 框架所使用的 Key

### 切换所使用的凭证

```bash
cf key switch <需要切换的AccessKey[Optional]>
# 或者
cf key checkout
cf key c
```

如果具有参数 需要删除的 Accesskey 那么程序会找到这个 Accesskey 并且删除

如果没有则会进行报错

而当没有输入第一个参数的时候，进入交互式选择会需要输入一个基于名称的查询然后得到一个 AccessKey 的列表

> 注意这个查询是基于 LIKE 的所以可以使用通配符 % 来匹配一段 _ 来匹配一个字符

基于该查询得到一个列表的 AccessKey 的列表再进行选择需要切换的 Key

### 快速合并凭证库

如果之前师傅是通过 configure 来进行使用 cf 框架的话 那么可以使用这个命令来合并凭证库

```bash
cf key merge
```

若师傅喜欢用 configure 来进行配置 cf 的密钥时 那么可以使用这个命令来将配置的密钥快速合并入凭证库

在输入名称和备注后 将会自动把当前使用的凭证加入凭证库之中 无需师傅再次使用 add 配置

该指令将会作为一个过度方案进行兼容。

> 需要注意的是 以上所有命令都可以通过 -h 获取使用方法。

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年6月30日"
    }
  }
</script>

