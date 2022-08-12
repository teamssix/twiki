---
title: 本地部署


---

<center><h1>本地部署</h1></center>

---

### Docker 部署（推荐）

```bash
docker pull teamssix/twiki:main
docker run --name twiki -d -p 7777:80 teamssix/twiki:main
```

然后直接访问本地 IP 的 7777 端口即可。

### 手动部署

::: warning 注意

需要本地先安装 node 且版本大于或等于 12，推荐使用 12.22.12 版本。

:::

```bash
git clone https://github.com/teamssix/TWiki.git --depth 1
cd TWiki
npm install --global yarn
yarn install
yarn docs:build
```

build 完之后，将 docs/.vuepress/dist 目录下的文件复制到你的 nginx 或者 apache 服务的网站根目录下即可。

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年8月12日"
    }
  }
</script>
