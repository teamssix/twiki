---
title: 使用示例
---

## 列出阿里云  OSS 对象存储桶

```bash
CloudSword > use 1201_aliyun_oss_list_buckets
CloudSword 阿里云 (1201_oss_list_buckets) > set ak_id XXXXXXXXXXXX
ak_id ==> XXXXXXXXXXXX
CloudSword 阿里云 (1201_oss_list_buckets) > set ak_secret XXXXXXXXXXXX
ak_secret ==> XXXXXXXXXXXX
CloudSword 阿里云 (1201_oss_list_buckets) > run
[INFO] 2024-12-20 23:23:23 正在运行 1201_aliyun_oss_list_buckets 模块。
[INFO] 2024-12-20 23:23:23 找到以下存储桶：
XXXXXXXX
XXXXXXXX
```

<div align=center><img width="900" src="/img/2000000053.gif" div align=center/></div>

## 搜索阿里云存储桶对象

<div align=center><img width="900" src="/img/2000000057.png" div align=center/></div>

## 创建云访问凭证蜜标

<div align=center><img width="900" src="/img/2000000058.png" div align=center/></div>


<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2024 年 12 月 21 日"
    }
  }
</script>
