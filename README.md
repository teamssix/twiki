# T Wiki 云安全知识文库

[![GitHub stars](https://img.shields.io/github/stars/teamssix/twiki)](https://github.com/teamssix/twiki) [![](https://img.shields.io/badge/T%20Wiki%20-%E4%BA%91%E5%AE%89%E5%85%A8%E7%9F%A5%E8%AF%86%E6%96%87%E5%BA%93-blue)](https://wiki.teamssix.com/) [![](https://img.shields.io/badge/%E7%8B%BC%E7%BB%84%E5%AE%89%E5%85%A8%E5%9B%A2%E9%98%9F-%E7%9F%A5%E8%AF%86%E6%96%87%E5%BA%93-blue)](https://wiki.wgpsec.org/) [![](https://img.shields.io/badge/PeiQi-%E7%9F%A5%E8%AF%86%E6%96%87%E5%BA%93-blue)](http://wiki.peiqi.tech/) [![Twitter](https://img.shields.io/twitter/follow/teamssix?label=Followers&style=social)](https://twitter.com/teamssix)

## 前言

`T Wiki` 是一个面向云安全方向的知识库，这一点是和其他文库最大的不同，也许这是国内第一个云安全知识文库？

搭建这个文库的起因是笔者发现在云安全方向的中文资料属实不多，少有的这些资料也很散乱，于是搭建了这个文库。

文库的地址为：[wiki.teamssix.com](https://wiki.teamssix.com/)

## 本地部署

### Docker 部署（推荐）

```bash
docker pull teamssix/twiki:main
docker run --name twiki -d -p 7777:80 teamssix/twiki:main
```

然后直接访问本地 IP 的 7777 端口即可。

### 手动部署

> 需要本地先安装 node 且版本需要大于或等于 12

```bash
git clone https://github.com/teamssix/TWiki.git --depth 1
cd TWiki
npm install --global yarn
yarn install
yarn docs:build
```

build 完之后，将 docs/.vuepress/dist 目录下的文件复制到你的 nginx 或者 apache 服务的网站根目录下即可。

## 感谢以下为 T Wiki 文库贡献的师傅们 :confetti_ball:

<table>
    <tr>
        <td align="center"><img alt="TeamsSix" src="./docs/.vuepress/public/img/1651741861.png" style="width: 100px;" /><br />TeamsSix</td>
        <td align="center"><img alt="1derian" src="./docs/.vuepress/public/img/1650108029.png" style="width: 100px;" /><br />1derian</td>
        <td align="center"><img alt="ShangRui-hash" src="./docs/.vuepress/public/img/1650108092.png" style="width: 100px;" /><br />ShangRui-hash</td>
        <td align="center"><img alt="半人间丶" src="./docs/.vuepress/public/img/1650108207.png" style="width: 100px;" /><br />半人间丶</td>
        <td align="center"><img alt="UzJu" src="./docs/.vuepress/public/img/1650253985.png" style="width: 100px;" /><br />UzJu</a>
        </td>
        <td align="center"><img alt="Idle Life" src="./docs/.vuepress/public/img/1650865577.png" style="width: 100px;" /><br />Idle Life</td>
    </tr>
    <tr>
        <td align="center"><img alt="zhengjim" src="./docs/.vuepress/public/img/1650942808.png" style="width: 100px;" /><br />zhengjim</a>
        </td>
        <td align="center"><img alt="zxynull" src="./docs/.vuepress/public/img/1651146804.png" style="width: 100px;" /><br />zxynull</a>
        </td>
        <td align="center"><img alt="m4d3bug" src="./docs/.vuepress/public/img/1651740464.png" style="width: 100px;" /><br />m4d3bug</a>
        </td>
        <td align="center"><img alt="da Vinci【达文西】" src="./docs/.vuepress/public/img/1651917214.png" style="width: 100px;" /><br />da Vinci【达文西】</a>
        </td>
        <td align="center"><img alt="tanger" src="./docs/.vuepress/public/img/1653815174.png" style="width: 100px;" /><br />tanger</a>
        </td>
        <td align="center"><img alt="想走安全的小白" src="./docs/.vuepress/public/img/1654852861.png" style="width: 100px;" /><br />想走安全的小白</a>
        </td>
    </tr>
    <tr>
        <td align="center"><img alt="Esonhugh" src="./docs/.vuepress/public/img/1654854214.png" style="width: 100px;" /><br />Esonhugh</a>
        </td>
        <td align="center"><img alt="一生热爱" src="./docs/.vuepress/public/img/1657203872.png" style="width: 100px;" /><br />一生热爱</a>
        </td>
        <td align="center"><img alt="Kfzz1" src="./docs/.vuepress/public/img/1667370152.png" style="width: 100px;" /><br />Kfzz1</a>
        </td>
        <td align="center"><img alt="happi0" src="./docs/.vuepress/public/img/1674129072.png" style="width: 100px;" /><br />happi0</a>
        </td>
        <td align="center"><img alt="cr" src="./docs/.vuepress/public/img/1684313513.png" style="width: 100px;" /><br />cr</a>
        </td>
        <td align="center"><img alt="k.so" src="./docs/.vuepress/public/img/1686309883.png" style="width: 100px;" /><br />k.so</a>
        </td>
    </tr>
    <tr>
        <td align="center"><img alt="zunlongzhou" src="./docs/.vuepress/public/img/1688704501.png" style="width: 100px;" /><br />zunlongzhou</a>
        </td>
        <td align="center"><img alt="Ma1tobiose" src="./docs/.vuepress/public/img/1688880306.png" style="width: 100px;" /><br />Ma1tobiose</a>
        </td>
        <td align="center"><img alt="DVKunion" src="./docs/.vuepress/public/img/1689259230.png" style="width: 100px;" /><br />DVKunion</a>
        </td>
        <td align="center"><img alt="曾哥" src="./docs/.vuepress/public/img/1689483069.png" style="width: 100px;" /><br />曾哥</a>
        </td>
        <td align="center"><img alt="苏打养乐多" src="./docs/.vuepress/public/img/1692362083.png" style="width: 100px;" /><br />苏打养乐多</a>
        </td>
        <td align="center"><img alt="R!ng0" src="./docs/.vuepress/public/img/1692623031.png" style="width: 100px;" /><br />R!ng0</a>
        </td>
    </tr>
    <tr>
        <td align="center"><img alt="2h0ng" src="./docs/.vuepress/public/img/1692929184.png" style="width: 100px;" /><br />2h0ng</a>
        </td>
        <td align="center"><img alt="橘子怪" src="./docs/.vuepress/public/img/1694685251.png" style="width: 100px;" /><br />橘子怪</a>
        </td>
        <td align="center"><img alt="shadowabi" src="./docs/.vuepress/public/img/2000000015.png" style="width: 100px;" /><br />shadowabi</a>
        </td>
        <td align="center"><img alt="宅独青年" src="./docs/.vuepress/public/img/2000000016.png" style="width: 100px;" /><br />宅独青年</a>
        </td>
        <td align="center"><img alt="弱鸡" src="./docs/.vuepress/public/img/2000000017.png" style="width: 100px;" /><br />弱鸡</a>
        </td>
        <td align="center"><img alt="RBPi" src="./docs/.vuepress/public/img/2000000021.png" style="width: 100px;" /><br />RBPi</a>
        </td>
    </tr>
    <tr>
        <td align="center"><img alt="程皮糖别皮" src="./docs/.vuepress/public/img/2000000022.png" style="width: 100px;" /><br />程皮糖别皮</a>
        </td>
        <td align="center"><img alt="Kagantua" src="./docs/.vuepress/public/img/2000000026.png" style="width: 100px;" /><br />Kagantua</a>
        </td>
        <td align="center"><img alt="feng" src="./docs/.vuepress/public/img/2000000027.png" style="width: 100px;" /><br />feng</a>
        </td>
        <td align="center"><img alt="Poker" src="./docs/.vuepress/public/img/2000000032.png" style="width: 100px;" /><br />Poker</a>
        </td>
        <td align="center"><img alt="Yaney" src="./docs/.vuepress/public/img/2000000040.png" style="width: 100px;" /><br />Yaney</a>
        </td>
        <td align="center"><img alt="CC11001100" src="./docs/.vuepress/public/img/2000000041.png" style="width: 100px;" /><br />CC11001100</a>
        </td>
    </tr>
    <tr>
        <td align="center"><img alt="毅种循环" src="./docs/.vuepress/public/img/2000000042.png" style="width: 100px;" /><br />毅种循环</a>
        </td>
        <td align="center"><img alt="glan" src="./docs/.vuepress/public/img/2000000043.png" style="width: 100px;" /><br />glan</a>
        </td>
    </tr>
</table>

[一起补充文库？](https://wiki.teamssix.com/About/Contribute.html)


## 文库介绍

首先来看文库首页，文库主要分成了四个板块，分别为`云服务`、`云原生`、`CF 使用手册`、`云安全资源`。

![](./docs/.vuepress/public/img/1689483438.png)

首先来看 [云安全资源](https://wiki.teamssix.com/CloudSecurityResources/) 板块，这个板块是我个人觉着整个知识库较为与众不同的地方，在这里可以看到汇总的云安全资源，比如云安全相关的文章、公众号、工具、靶场等等。

![](./docs/.vuepress/public/img/1689483513.png)

这部分的内容我也同步到了 Github 上单独作为一个项目，项目名称叫做 awesome-cloud-security，项目地址为：[github.com/teamssix/awesome-cloud-security](https://github.com/teamssix/awesome-cloud-security)

如果你知道一些比较好的云安全资源，欢迎留言补充，我会更新到这个板块中，首页的贡献者处也将出现你的身影。

在 [云服务](https://wiki.teamssix.com/CloudService/) 板块可以看到云服务方向的文章、笔记。

![](./docs/.vuepress/public/img/1689483562.png)

在 [云原生](https://wiki.teamssix.com/CloudNative/) 板块可以看到云原生方向的文章、笔记。

![](./docs/.vuepress/public/img/1689483601.png)

在 [CF 使用手册](https://wiki.teamssix.com/cf/) 板块里详细记录了云环境利用框架 CF 工具的使用方法，CF 云环境利用框架工具项目地址：[github.com/teamssix/cf](https://github.com/teamssix/cf)

![](./docs/.vuepress/public/img/1689483836.png)

如果你想要投稿的话，那么在文库的 [一起补充](https://wiki.teamssix.com/About/Contribute.html) 处可以找到投稿的方式。

## 最后

相信通过这些资料能够在一定程度上帮助想要学习或者正在学习云安全的人，同时也欢迎读者一起来完善这个文库，从而帮助到更多的人，一起助力国内云安全的发展。

>  更多信息欢迎关注我的个人微信公众号：TeamsSix

<div align=center><img width="800" src="https://cdn.jsdelivr.net/gh/teamssix/BlogImages/imgs/202204152148071.png" div align=center/></div>
