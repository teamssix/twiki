module.exports = [
    '/CF/',
    {
        title: "开始使用",
        collapsable: false,
        children: [
            "/CF/Config/",
            "/CF/Config/config",
        ]
    }, {
        title: "访问控制",
        collapsable: false,
        children: [
            "/CF/RAM/",
            "/CF/RAM/lsPermissions",
        ]
    }, {
        title: "对象存储",
        collapsable: false,
        children: [
            "/CF/OSS/",
            "/CF/OSS/lsObjects",
            "/CF/OSS/getObjects"
        ]
    }, {
        title: "弹性计算服务",
        collapsable: false,
        children: [
            "/CF/ECS/",
            "/CF/ECS/exec",
            "/CF/ECS/batchCommand",
            "/CF/ECS/metaDataSTSToken",
            "/CF/ECS/userData",
            "/CF/ECS/reverseShell",
            "/CF/ECS/userDataBackdoor",
            "/CF/ECS/imageShare",

        ]
    }, {
        title: "云数据库",
        collapsable: false,
        children: [
            "/CF/RDS/",
            "/CF/RDS/account",
            "/CF/RDS/public",
            "/CF/RDS/whiteList",
        ]
    }, {
        title: "使用案例",
        collapsable: false,
        children: [
            "/CF/Cases/",
            "/CF/Cases/cfCase2",
            "/CF/Cases/cf_best_practices"
        ]
    }, {
        title: "更多",
        collapsable: false,
        children: [
            "/CF/More/",
            "/CF/More/regions",
            "/CF/More/flushCache",
            "/CF/More/logLevel",
            "/CF/More/version",
            "/CF/More/upgrade",
            "/CF/More/cfQA",
            "/CF/More/help",
            "/CF/More/aboutMe"
        ]
    }, {
        title: "更新介绍",
        collapsable: false,
        children: [
            "/CF/Changelog/",
            "/CF/Changelog/v0_5_0",
        ]
    },
];