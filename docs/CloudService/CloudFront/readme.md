---
title: 未配置默认根对象的风险简单分析
---
<center><h1>AWS CloudFront 未配置默认根对象的风险简单分析</h1></center>

---

## 0x00 前言

AWS CloudFront 简单理解就是 AWS 的 CDN 服务，在 AWS 安全标准和最佳实践中，AWS 官方将 CloudFront 未配置默认根对象这个问题定级为严重，这里来学习了解一下这个问题。

## 0x01 介绍

我一般在直接看他们官方介绍的时候，第一眼往往会让人摸不着头脑，再仔细看看才会明白所表达的意思，不知道是不是因为翻译的问题，这里谈谈我所消化的理解。

要明白默认根对象，可以先看个例子：一般当我们在浏览器里输入访问一个网站时，比如 `teamssix.com`，实际上浏览器打开的是 `teamssix.com/index.html` ，这里的 `index.html` 就是默认根对象。

所以默认根对象其实就是指当我们访问一个网站根目录时，这个网站所默认跳转指向的对象，故而叫默认根对象。

在使用 CloudFront 时，如果不配置默认根对象，就意味着当我们访问 `teamssix.com` 时，就真的会访问 `teamssix.com`，而不是 `teamssix.com/index.html`，这时用户如果想浏览这个网站就需要自己拼接 `/index.html` 路径到 URL 中了。

## 0x02 简单分析

根据官方的描述，不配置默认根对象对和 S3 相关的 CloudFront 影响比较多，首先这里先创建一个 S3，然后再创建一个和 S3 关联的 CloudFront，创建完成后，CloudFront 会分配给我们一个 URL 地址，通过这个地址就可以访问到 S3 服务了。

> 实际上这里的描述是不太准确的，为了帮助理解，我简化了这里的描述。

前面说过，当没有配置默认根对象的时候，我们访问一个网站的根目录，真的就是在访问它的根目录，那么这时我们访问刚才 CloudFront 分配给我们的地址看看会是什么。

</br><img width="800" src="/img/1678349592.png"></br>

可以看到和直接访问 S3 根目录是一样的效果，如果此时 S3 存在列举对象的风险的话，那么在没有配置默认根对象的时候，直接访问 CloudFront 分配地址看到的就是这样的效果。

</br><img width="700" src="/img/1678349600.png"></br>

> 这个页面中泄漏了 S3 存储桶的名字，即这个地址所对应的 S3 真实地址。

但如果我们把默认根对象配置成了 index.html，再次访问 CloudFront 分配的地址，就是这样子，这才是预期的展示效果。

</br><img width="700" src="/img/1678349608.png"></br>

## 0x03 总结

综上分析，配置默认根对象可以在一定程度上避免以下问题：

1. 减少 S3 的攻击面
2. 避免真实的 S3 地址泄漏
3. 避免潜在的安全风险和漏洞
4. 避免默认起始页混乱，使 CloudFront 能更好的处理客户端请求，提升访问者体验



不管是什么问题，其影响程度还是需要根据实际情况去具体分析，毕竟在某些情况下，这个问题有可能会造成很大的影响，在某些情况下，这个问题可能不会造成啥影响。

最后其实还是有一些疑惑，在 AWS 安全标准和最佳实践中，定级为严重的问题是很少的，这个未配置默认根对象的问题我个人觉着定级为高危或者中危应该是比较合理的，对于这个问题如果你还知道一些其他的信息，欢迎一起沟通。



**参考链接：**

- 《什么是 Amazon CloudFront？》

  [https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)

- 《指定默认根对象》

  [https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DefaultRootObject.html](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DefaultRootObject.html)

- 《CloudFront distributions should have a default root object configured》

  [https://docs.aws.amazon.com/securityhub/latest/userguide/cloudfront-controls.html#cloudfront-1](https://docs.aws.amazon.com/securityhub/latest/userguide/cloudfront-controls.html#cloudfront-1)



<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2023年3月9日"
    }
  }
</script>

