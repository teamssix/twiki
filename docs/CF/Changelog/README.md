---
title: 更新日志
---

<center><h1>CF 更新日志</h1></center>

## [v0.5.0](https://github.com/teamssix/cf/releases/tag/v0.5.0) 2023.7.1

### 新增功能

* [#227](https://github.com/teamssix/cf/pull/227) 新增阿里云用户数据后门功能
* [#228](https://github.com/teamssix/cf/pull/228) 新增阿里云镜像共享功能
* [#231](https://github.com/teamssix/cf/pull/231) 新增阿里云接管控制台时自动创建 AK 功能
* [#235](https://github.com/teamssix/cf/pull/235) 新增阿里云 RDS 列出详细信息功能
* [#235](https://github.com/teamssix/cf/pull/235) 新增阿里云 RDS 添加账号功能
* [#235](https://github.com/teamssix/cf/pull/235) 新增阿里云 RDS 创建公网访问地址的功能
* [#235](https://github.com/teamssix/cf/pull/235) 新增阿里云 RDS 添加白名单的功能
* [#238](https://github.com/teamssix/cf/pull/238) [#239](https://github.com/teamssix/cf/pull/239) 新增查询 AK 所属云厂商功能
* [#251](https://github.com/teamssix/cf/pull/251) 新增支持 brew 安装

### 功能优化

* [#243](https://github.com/teamssix/cf/pull/243) 优化配置功能，现在能自动识别配置是否处于可用状态
* [#245](https://github.com/teamssix/cf/pull/245) 优化实例公网 IP 展示，不存在时会展示为空
* [#246](https://github.com/teamssix/cf/pull/246) 优化 OSS 下载功能，现在默认会下载所有文件
* [#248](https://github.com/teamssix/cf/pull/248) 优化更新处理逻辑
* [#249](https://github.com/teamssix/cf/pull/249) 优化华为云 OBS 列出功能

### Bug 修复

* [#244](https://github.com/teamssix/cf/pull/244) 修复批量执行命令时，没有安装云助手导致批量执行中断的 Bug
* [#247](https://github.com/teamssix/cf/pull/247) 修复 OSS 下载文件无法自动创建目录的 Bug

## [v0.4.5](https://github.com/teamssix/cf/releases/tag/v0.4.5) 2023.4.29

### 新增功能

* [#221](https://github.com/teamssix/cf/pull/221) 增加华为云控制台接管和权限枚举功能

### 功能优化

* [#220](https://github.com/teamssix/cf/pull/220) 优化错误信息输出
* [#225](https://github.com/teamssix/cf/pull/225) 优化更新功能

### Bug 修复

* [#201](https://github.com/teamssix/cf/pull/201) 修复配置令牌功能的 Bug
* [#203](https://github.com/teamssix/cf/pull/203) [#204](https://github.com/teamssix/cf/pull/204) 修复两处缓存功能的 Bug
* [#208](https://github.com/teamssix/cf/pull/208) 修复更新功能 Bug
* [#224](https://github.com/teamssix/cf/pull/224) 修复腾讯云 cvm 和 lh 无法列全的 Bug

## [v0.4.4](https://github.com/teamssix/cf/releases/tag/v0.4.4) 2022.12.13

### 新增功能

* [#196](https://github.com/teamssix/cf/pull/196) 增加本地访问密钥扫描功能
* [#198](https://github.com/teamssix/cf/pull/198) 增加 huawei obs ls 功能

### 功能优化

* [#197](https://github.com/teamssix/cf/pull/197) 优化错误信息输出

### Bug 修复

* [#193](https://github.com/teamssix/cf/pull/193) 修复一处 aws ec2 ls 处的 Bug
* [#194](https://github.com/teamssix/cf/pull/194) 修复一处配置功能处的 Bug

## [v0.4.3](https://github.com/teamssix/cf/releases/tag/v0.4.3) 2022.12.4

### 新增功能

* [#189](https://github.com/teamssix/cf/pull/189) 在配置访问密钥时，会自动识别并提示导入本地的访问密钥
* [#190](https://github.com/teamssix/cf/pull/190) 增加 aws ec2 实例的列出功能

### 功能优化

* [#186](https://github.com/teamssix/cf/pull/186) 优化输出信息的展示
* [#188](https://github.com/teamssix/cf/pull/188) 优化 config 命令功能

### Bug 修复

* [#187](https://github.com/teamssix/cf/pull/187) 修复一处删除配置时的 Bug

## [v0.4.2](https://github.com/teamssix/cf/releases/tag/v0.4.2) 2022.10.11

### 新增功能

* [#176](https://github.com/teamssix/cf/pull/176) 增加 aws s3 列出功能
* [#177](https://github.com/teamssix/cf/pull/177) 增加阿里云 oss 指定 Bucket 的功能
* [#179](https://github.com/teamssix/cf/pull/179) 增加阿里云 ecs ecs 指定区域的功能

### 功能优化

* [#166](https://github.com/teamssix/cf/pull/166) 优化权限获取功能
* [#169](https://github.com/teamssix/cf/pull/169) 优化程序提示信息
* [#170](https://github.com/teamssix/cf/pull/170) 优化配置 AK 的逻辑
* [#178](https://github.com/teamssix/cf/pull/178) 增强阿里云 ecs 列出功能

### Bug 修复

* [#167](https://github.com/teamssix/cf/pull/167) 修复一处由于历史代码造成的 Bug
* [#175](https://github.com/teamssix/cf/pull/175) 修复一处配置 AK 时的 Bug

## [v0.4.1](https://github.com/teamssix/cf/releases/tag/v0.4.1) 2022.9.20

### 新增功能

* [#161](https://github.com/teamssix/cf/pull/161) 增加对象列表导出功能
* [#162](https://github.com/teamssix/cf/pull/162) 增加指定查询对象列表数量功能

### 功能优化

* [#164](https://github.com/teamssix/cf/pull/164) 优化接管控制台输出信息

## [v0.4.0](https://github.com/teamssix/cf/releases/tag/v0.4.0) 2022.9.7

### 新增功能

* [#143](https://github.com/teamssix/cf/pull/143) 增加对已有的访问凭证修改功能
* [#146](https://github.com/teamssix/cf/pull/146) 增加控制台接管历史记录查看功能
* [#147](https://github.com/teamssix/cf/pull/147) 增加接管控制台指定用户名功能

### 功能优化

* [#137](https://github.com/teamssix/cf/pull/137) 优化阿里云 OSS 相关功能
* [#142](https://github.com/teamssix/cf/pull/142) 全面优化配置访问凭证功能
* [#144](https://github.com/teamssix/cf/pull/144) 全面优化程序缓存功能

## [v0.3.5](https://github.com/teamssix/cf/releases/tag/v0.3.5) 2022.8.16

### 新增功能

* [#133](https://github.com/teamssix/cf/pull/133) 新增腾讯云 AK 权限查看功能

### 功能优化

* [#129](https://github.com/teamssix/cf/pull/129) 优化升级功能，自动识别最优下载线路
* [#135](https://github.com/teamssix/cf/pull/135) 优化腾讯云 CVM 相关功能

### Bug 修复

* [#131](https://github.com/teamssix/cf/pull/131) 修复阿里云下载存储桶对象时的一个 Bug

## [v0.3.4](https://github.com/teamssix/cf/releases/tag/v0.3.4) 2022.8.10

- [#124](https://github.com/teamssix/cf/pull/124) fix: 修复了实例执行命令时的一个 bug
- [#125](https://github.com/teamssix/cf/pull/125) perf: 优化腾讯云接管控制台的提示信息
- [#126](https://github.com/teamssix/cf/pull/126) fix: 修复了实例列出不完整的 bug
- [#127](https://github.com/teamssix/cf/pull/127) perf: 优化程序升级处理代码

## [v0.3.3](https://github.com/teamssix/cf/releases/tag/v0.3.3) 2022.8.3

- [#99](https://github.com/teamssix/cf/pull/99) feat: 新增腾讯云轻量引用服务器的命令执行功能
- [#103](https://github.com/teamssix/cf/pull/103) fix: 修复了当阿里云 oss object 超过 1000 时无法完全展示的 bug
- [#109](https://github.com/teamssix/cf/pull/109) fix: 修复了配置腾讯云 AK 时的一个 bug

## [v0.3.2](https://github.com/teamssix/cf/releases/tag/v0.3.2) 2022.7.29

- [#63](https://github.com/teamssix/cf/pull/63) feat: 增加 key 管理功能
- [#80](https://github.com/teamssix/cf/pull/80) fix: 修复云镜增加 Instances 结构体导致的 CVM 命令执行不能正常执行的问题
- [`adf7d90`](https://github.com/teamssix/cf/commit/adf7d9028bb7f1df68f2f21d32ae3d532f9d72ed) fix: 修复了阿里云 ECS 实例执行命令时的一个 bug

## [v0.3.1](https://github.com/teamssix/cf/releases/tag/v0.3.1) 2022.7.21

- [`afe82e5`](https://github.com/teamssix/cf/commit/afe82e511813f452cab021a5665d1ff084a9ce16) feat: 新增腾讯云安全组操作功能 (tencent cloud security group policy add/del)
- [`06ca14c`](https://github.com/teamssix/cf/commit/06ca14c02fae3d0c5749988ca2be70b755829d94) feat: 新增腾讯云控制台接管功能 (add tencent takeover console function)
- [`5afae3a`](https://github.com/teamssix/cf/commit/5afae3a67f93bfefa4d90f9ba66728637ecdf67b) feat: 新增腾讯云云镜的相关操作 (add tencent functions)

## [v0.3.0](https://github.com/teamssix/cf/releases/tag/v0.3.0) 2022.7.17

- [`cabf3d4`](https://github.com/teamssix/cf/commit/cabf3d432606a8a575825d615f47e12a079d28fe) feat: 支持腾讯云 CVM 的相关功能 (support tencent cloud cvm)

## [v0.2.4](https://github.com/teamssix/cf/releases/tag/v0.2.4) 2022.7.12

- [`b702e63`](https://github.com/teamssix/cf/commit/b702e6363642ef24582118dd14f18128a13108a3) feat: 增加 OSS 下载对象功能权限的检测 (support oss get function for permission detection)
- [`eda092a`](https://github.com/teamssix/cf/commit/eda092ae7636bac734be1a8362d1e8968394daac) fix: 修复了一个在 ECS 实例上执行命令时的 bug (fixed a bug when ecs exec)
- [`75a1b4e`](https://github.com/teamssix/cf/commit/75a1b4e9494145558e6aeedfb15799a2b1097c1c) fix: 修复了一个在获取当前凭证权限时的 bug (fixed a bug in getting permission)

## [v0.2.3](https://github.com/teamssix/cf/releases/tag/v0.2.3) 2022.7.11

- [`71536bc`](https://github.com/teamssix/cf/commit/71536bcc17692cea5cbc68c9ac05b9bfd2e95a99) feat: 增加对象存储中对象的下载功能 (add object download function)
- [`579bcb6`](https://github.com/teamssix/cf/commit/579bcb60a7c8f73ae1b778869e0fe4b4b1df9982) perf: 在列出实例时展示实例的名称 (add the instance name to the output)
- [`7de034f`](https://github.com/teamssix/cf/commit/7de034fabe183fd66babda39981e510214391b0d) fix: 修复了一个更新功能的 bug (fixed a bug in the upgrade)

## [v0.2.2](https://github.com/teamssix/cf/releases/tag/v0.2.2) 2022.7.10

- [`b0ee137`](https://github.com/teamssix/cf/commit/b0ee137755ca3e775669f871c60cac8c4decda23) feat: 增加 OSS 对象列出功能 (add ls objects function)
- [`c0044c9`](https://github.com/teamssix/cf/commit/c0044c930c133cfb92f8649c5dea3c76357215b8) perf: 资源缓存修改为超过 24 小时就自动刷新 (maximum cache validity changed to 24 hours)
- [`2a4691c`](https://github.com/teamssix/cf/commit/2a4691c1851e7f4e0561c1e2e13d690f6395d6f6) perf: 在配置 AK 的时候，如果直接回车则使用原来的 AK (optimize the experience when configuring the access key)

## [v0.2.1](https://github.com/teamssix/cf/releases/tag/v0.2.1) 2022.7.8

- [`eb496bb`](https://github.com/teamssix/cf/commit/eb496bbafb68ff576a06e24cc8ca72eb17919fb3) feat: 增加查看当前凭证权限的功能 (add view permissions function)

## [v0.2.0](https://github.com/teamssix/cf/releases/tag/v0.2.0) 2022.7.5

- [`b4ba960`](https://github.com/teamssix/cf/commit/b4ba960c4f0d056eb728fd774b34547aeaef8fd7) feat: 增加控制台接管功能 (add takeover console function)
- [`1022d49`](https://github.com/teamssix/cf/commit/1022d49f64f01740428dbfc2b06fb4ffa7469bd2) perf: 增加权限不足时的提示，优化使用体验 (add a prompt if no permission)
- [`a20f58e`](https://github.com/teamssix/cf/commit/a20f58e72e214e62aa5a868d11b637741a16e3bb) perf: 美化更新程序时的进度条显示 (optimize the display of update progress bar)

## [v0.1.1](https://github.com/teamssix/cf/releases/tag/v0.1.1) 2022.7.4

- [`c00029d`](https://github.com/teamssix/cf/commit/c00029d964f94c676aaacc166c9f44810ab679a4) perf: 优化了两处程序逻辑处理问题 (optimize program logic processing)

## [v0.1.0](https://github.com/teamssix/cf/releases/tag/v0.1.0) 2022.7.3

- [`826b981`](https://github.com/teamssix/cf/commit/826b9818dfe6f147b4649e1021844426ca9617e2) feat: 增加 RDS 云数据库的列出功能 (add rds ls command)

## [v0.0.5](https://github.com/teamssix/cf/releases/tag/v0.0.5) 2022.7.3

- [`0c46427`](https://github.com/teamssix/cf/commit/0c464272eb74e9b3f78bd9a65215fdadaf160fe4) perf: 增加了在执行命令的时候选择实例的功能，提升使用体验 (add the function of selecting instances)

## [v0.0.4](https://github.com/teamssix/cf/releases/tag/v0.0.4) 2022.7.2

- [`d3db762`](https://github.com/teamssix/cf/commit/d3db762c2e2ef0d76278b920c2c782a1bd3aafda) fix: 修复了一个自动更新的 bug (fix a bug of automatic update failure)
- [`bcadc33`](https://github.com/teamssix/cf/commit/bcadc33d1683a45519bca66706222055a1d2a017) fix: 修复了一个缓存文件的 bug (fixed a bug in the cache file)
- [`00a85cb`](https://github.com/teamssix/cf/commit/00a85cb3f09bce8bf1ec905d711afb4a3591bc78) perf: 增加了操作提示，优化使用体验 (add tips to improve the experience of using)
- [`387b73f`](https://github.com/teamssix/cf/commit/387b73f619d146991b6893a1be9ebb214f13fb34) perf: 优化代码 (optimized a miss)

## [v0.0.3](https://github.com/teamssix/cf/releases/tag/v0.0.3) 2022.7.1

* [`cef7914`](https://github.com/teamssix/cf/commit/cef7914e401f3c1883f68d59070b4edb77ade15f) fix: 修复了一个自动更新的 bug

## [v0.0.2](https://github.com/teamssix/cf/releases/tag/v0.0.2) 2022.7.1

- [`5be633`](https://github.com/teamssix/cf/commit/b5be6332d67a16c1c667e2c183371fa1640c8e16) feat: 增加自动更新功能
- [`44111b6`](https://github.com/teamssix/cf/commit/44111b69a0040230d8df7562fc18729348d35684) perf: 优化、规范代码

## [v0.0.1](https://github.com/teamssix/cf/releases/tag/v0.0.1) 2022.7.1

- 列出对象存储（包括存储桶大小和文件数量信息）
- 列出实例
- 一键获得实例上的临时访问凭证
- 一键为所有实例执行三要素，方便 HVV
- 一键为实例反弹 Shell
- 支持阿里云
- ……

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2023 年 7 月 5 日"
    }
  }
</script>
