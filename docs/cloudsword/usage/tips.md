---
title: 命令使用技巧
---

## 命令简写

为了方便使用，云鉴针对一些常用命令支持了简写，具体如下：

| 简写 | 命令 | 描述             | 类型     |
| :--- | :--- | :--------------- | :------- |
| h    | help | 查看帮助信息     | 全局命令 |
| l    | list | 列出模块         | 全局命令 |
| q    | quit | 退出程序         | 全局命令 |
| u    | use  | 使用模块         | 全局命令 |
| i    | info | 查看模块使用方法 | 二级命令 |
| r    | run  | 运行模块         | 二级命令 |
| s    | set  | 设置运行参数     | 二级命令 |

具体使用效果如下：

```bash
CloudSword > u 1201_aliyun_oss_list_buckets

CloudSword 阿里云 (1201_oss_list_buckets) > s ak_id xxxxxx
ak_id ==> xxxxxx

CloudSword 阿里云 (1201_oss_list_buckets) > q
[WARN] 2024-12-20 23:23:23 云鉴已退出。
```


## 自动补全

在使用云鉴时，云鉴会自动补全命令，继续输入云鉴会自动过滤补全提示，方便使用者快速找到自己想要的命令和模块。

在自动补全界面，使用 `Tap` 键可以选择要使用的操作或模块，按下 `Enter` 可以进行选择，具体效果如下：

<div align=center><img width="1000" src="/img/2000000056.gif" div align=center/></div>



<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2024 年 12 月 21 日"
    }
  }
</script>
