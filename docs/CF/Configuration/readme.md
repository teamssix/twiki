---
title: 配置访问凭证
---

## 配置凭证

CF 支持两种配置访问凭证的方法，一种是利用永久的访问凭证去配置，一种是利用临时的访问凭证去配置。

直接输入以下命令即可配置。

```bash
cf configure
```

   <img width="1000" src="/img/1656583779.png">

在配置凭证的时候 `Access Key ID` 和 `Access Key Secret` 参数是必填的，当配置临时访问凭证时，需要填 `STS Token` 参数。

> 配置文件被会存储在 `~/.cf/config.json`

## 查看当前凭证

```bash
cf configure ls
```

   <img width="600" src="/img/1656594154.png">

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年6月30日"
    }
  }
</script>