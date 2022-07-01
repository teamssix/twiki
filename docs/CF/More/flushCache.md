---
title: 刷新缓存
---

## 刷新缓存

为了提高程序的运行速度，CF 默认会开启缓存机制，当获取到云服务资源的结果后，这些结果就会被缓存到本地，这样做可以大大提高其他操作的速度。

有了缓存，每次在实例上执行命令的时候，CF 就不用再扫描一遍所有的区域去发现实例了。

<br>

但缓存也会存在信息滞后、不能实时更新的情况，因此当你想更新目标的云服务资源结果时，可以使用 `--flushCache` 参数去刷新缓存，例如下面这样。

<br>

刷新所有缓存

```bash
cf ls --flushCache
```

仅刷新 OSS 对象存储的缓存

```bash
cf oss ls --flushCache
```

仅刷新 ECS 弹性计算服务的缓存

```bash
cf oss ls --flushCache
```

<br>

> CF 缓存的结果会被保存在 `~/.cf/cache` 目录下

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年7月1日"
    }
  }
</script>