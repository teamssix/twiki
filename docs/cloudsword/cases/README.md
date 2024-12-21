---
title: 集成模块
---

目前云鉴已经集成的模块如下：

| 序号 | ID   | 云提供商 | 推荐评级 | 模块名称                      | 描述                                 |
| :--- | :--- | :------- | :------- | :---------------------------- | :----------------------------------- |
| 1    | 1101 | 阿里云   | ★★★★     | list_cloud_assets             | 列出  OSS、ECS、RAM、Domain 服务资产 |
| 2    | 1201 | 阿里云   | ★★       | oss_list_buckets              | 列出阿里云  OSS 对象存储桶           |
| 3    | 1202 | 阿里云   | ★★★★     | oss_search_objects            | 搜索阿里云  OSS 对象                 |
| 4    | 1203 | 阿里云   | ★★★      | oss_bucket_only_upload_images | 使用云函数限制存储桶只允许上传图片   |
| 5    | 1301 | 阿里云   | ★★       | ecs_list_instances            | 列出阿里云  ECS 弹性计算实例         |
| 6    | 1401 | 阿里云   | ★★       | ram_list_users                | 列出阿里云  RAM 用户                 |
| 7    | 1402 | 阿里云   | ★        | ram_list_roles                | 列出阿里云  RAM 角色                 |
| 8    | 1403 | 阿里云   | ★        | ram_create_user               | 创建阿里云  RAM 用户                 |
| 9    | 1404 | 阿里云   | ★        | ram_attach_policy_to_user     | 为阿里云  RAM 用户添加策略           |
| 10   | 1405 | 阿里云   | ★★★      | ram_create_login_profile      | 创建阿里云  RAM 用户 Web 登录配置    |
| 11   | 1406 | 阿里云   | ★        | ram_create_access_key         | 创建阿里云  RAM 用户访问凭证         |
| 12   | 1501 | 阿里云   | ★        | domain_list_domains           | 列出阿里云  Domains 域名资产         |
| 13   | 2101 | 腾讯云   | ★★★★     | list_cloud_assets             | 列出  COS、EVM、LH、RAM 服务资产     |
| 14   | 2102 | 腾讯云   | ★★★★★    | create_honey_token            | 创建腾讯云访问凭证蜜标               |
| 15   | 2201 | 腾讯云   | ★★       | cos_list_buckets              | 列出腾讯云 COS 对象存储桶            |
| 16   | 2301 | 腾讯云   | ★★       | cvm_list_instances            | 列出腾讯云 CVM 弹性计算实例          |
| 17   | 2302 | 腾讯云   | ★        | lh_list_instances             | 列出腾讯云 LH 轻量应用服务器         |
| 18   | 2401 | 腾讯云   | ★★       | cam_list_users                | 列出腾讯云 CAM 用户                  |
| 19   | 2402 | 腾讯云   | ★        | cam_list_roles                | 列出腾讯云 CAM 角色                  |
| 20   | 2403 | 腾讯云   | ★        | cam_create_user               | 创建腾讯云 CAM 用户                  |
| 21   | 2404 | 腾讯云   | ★        | cam_attach_policy_to_user     | 为腾讯云 CAM 用户添加策略            |
| 22   | 2405 | 腾讯云   | ★★★      | cam_create_login_profile      | 创建腾讯云 CAM 用户 Web 登录配置     |
| 23   | 2406 | 腾讯云   | ★        | cam_create_access_key         | 创建腾讯云 CAM 用户访问凭证          |
| 24   | 3201 | 华为云   | ★★       | obs_list_buckets              | 列出华为云  OBS 对象存储桶           |
| 25   | 4201 | 百度云   | ★★       | bos_list_buckets              | 列出百度云  BOS 对象存储桶           |

> 推荐评级最高 5 颗星，推荐评级根据模块的复杂程度、受欢迎程度、价值程度等因素综合判定。

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2024 年 12 月 21 日"
    }
  }
</script>
