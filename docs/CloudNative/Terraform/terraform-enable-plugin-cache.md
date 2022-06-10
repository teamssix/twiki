---
title: 启用插件缓存


---

<center><h1>启用插件缓存</h1></center>

---

在刚刚进行 init 初始化时，Terraform 会根据 tf 文件内的 Provider 下载对应的插件，这些插件往往体积比较大。

例如上面初始化时下载的 AWS Provider 体积就有两百多兆，如果不启用插件缓存，那么在每个 Terraform 项目中都会反复下载这些插件，就很浪费磁盘空间与流量，因此建议将插件缓存开启。

Windows 下是在相关用户的 %APPDATA% 目录下创建名为 "terraform.rc" 的文件，Macos 和 Linux 用户则是在用户的 home 下创建名为 ".terraformrc" 的文件

.terraformrc 文件内容为：

```json
plugin_cache_dir = "$HOME/.terraform.d/plugin-cache"
```

这样每次下载 Provider 插件时，就会下载到 "$HOME/.terraform.d/plugin-cache" 目录下了。

不过 Terraform 不会主动清理这个文件夹，因此可能随着插件版本的更迭，这个文件夹内会保存一些历史版本的 Provider 插件，这时就需要自己手动清理一下了。

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月15日"
    }
  }
</script>