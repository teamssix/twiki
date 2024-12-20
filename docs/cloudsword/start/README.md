﻿---
title: 安装云鉴
---

## 安装云鉴

### HomeBrew 安装

安装

```bash
brew tap wgpsec/tap
brew install wgpsec/tap/cloudsword
```

更新

```bash
brew update
brew upgrade cloudsword
```

### 下载二进制包

云鉴下载地址：[github.com/wgpsec/cloudsword/releases](https://github.com/wgpsec/cloudsword/releases)

下载系统对应的压缩文件，解压后在命令行中运行即可，目前支持以下系统：

|            文件名             |  系统   |                架构                | 位数 |
| :---------------------------: | :-----: | :--------------------------------: | :--: |
| cloudsword_x.x.x_darwin_amd64.tar.gz  |  MacOS  |   AMD（适用于 Intel 芯片的 Mac）   |  64  |
| cloudsword_x.x.x_darwin_arm64.tar.gz  |  MacOS  | ARM（适用于苹果 M 系列芯片的 Mac） |  64  |
|  cloudsword_x.x.x_freebsd_386.tar.gz  | FreeBSD |                AMD                 |  32  |
| cloudsword_x.x.x_freebsd_amd64.tar.gz | FreeBSD |                AMD                 |  64  |
|  cloudsword_x.x.x_freebsd_arm.tar.gz  | FreeBSD |                ARM                 |  32  |
| cloudsword_x.x.x_freebsd_arm64.tar.gz | FreeBSD |                ARM                 |  64  |
|   cloudsword_x.x.x_linux_386.tar.gz   |  Linux  |                AMD                 |  32  |
|  cloudsword_x.x.x_linux_amd64.tar.gz  |  Linux  |                AMD                 |  64  |
|   cloudsword_x.x.x_linux_arm.tar.gz   |  Linux  |                ARM                 |  32  |
|  cloudsword_x.x.x_linux_arm64.tar.gz  |  Linux  |                ARM                 |  64  |
|   cloudsword_x.x.x_windows_386.zip    | Windows |                AMD                 |  32  |
|  cloudsword_x.x.x_windows_amd64.zip   | Windows |                AMD                 |  64  |
|   cloudsword_x.x.x_windows_arm.zip    | Windows |                ARM                 |  32  |
|  cloudsword_x.x.x_windows_arm64.zip   | Windows |                ARM                 |  64  |

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2024 年 12 月 21 日"
    }
  }
</script>
