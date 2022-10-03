---
title: 安装 CF
---

## 安装 CF

直接在 CF 下载地址：[github.com/teamssix/cf/releases](https://github.com/teamssix/cf/releases) 中下载系统对应的二进制文件，在命令行中运行即可，目前支持以下系统：

|            文件名            |  系统   |                架构                | 位数 |
| :--------------------------: | :-----: | :--------------------------------: | :--: |
| cf_x.x.x_darwin_amd64.tar.gz |  MacOS  |   AMD（适用于 Intel 芯片的 Mac）   |  64  |
| cf_x.x.x_darwin_arm64.tar.gz |  MacOS  | ARM（适用于苹果 M 系列芯片的 Mac） |  64  |
|  cf_x.x.x_linux_386.tar.gz   |  Linux  |                AMD                 |  32  |
| cf_x.x.x_linux_amd64.tar.gz  |  Linux  |                AMD                 |  64  |
| cf_x.x.x_linux_arm64.tar.gz  |  Linux  |                ARM                 |  64  |
|   cf_x.x.x_windows_386.zip   | Windows |                AMD                 |  32  |
|  cf_x.x.x_windows_amd64.zip  | Windows |                AMD                 |  64  |
|  cf_x.x.x_windows_arm64.zip  | Windows |                ARM                 |  64  |

### MacOS && Linux

> 注意将下面命令中的地址和文件名替换成 [releases](https://github.com/teamssix/cf/releases) 里的值。

```bash
wget https://github.com/teamssix/cf/releases/download/xxx/cf_xxx_xxx_xxx.tar.gz
tar zxvf cf_xxx_xxx_xxx.tar.gz
chmod +x cf
./cf
```

### Windows

直接在 CF 下载地址：[github.com/teamssix/cf/releases](https://github.com/teamssix/cf/releases) 中下载系统对应的 ZIP 文件，解压后，在命令行中运行即可。

<Vssue/>

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年10月2日"
    }
  }
</script>