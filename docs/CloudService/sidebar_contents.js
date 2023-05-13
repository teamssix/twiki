module.exports = [
    '/CloudService/',
    {
        title: "S3 对象存储",
        collapsable: false,
        children: [
            "/CloudService/S3/",
            "/CloudService/S3/bucket-brute-force",
            "/CloudService/S3/bucket-takeover",
            "/CloudService/S3/unrestricted-file-upload",
            "/CloudService/S3/bucket-acl-able-to-write",
            "/CloudService/S3/object-acl-able-to-write",
            "/CloudService/S3/bucket-policy-able-to-write",
            "/CloudService/S3/bucket-object-traversal",
            "/CloudService/S3/specific-bucket-policy-configuration",
        ]
    },
    {
        title: "EC2 弹性计算",
        collapsable: false,
        children: [
            "/CloudService/EC2/",
            "/CloudService/EC2/user-data",
            "/CloudService/EC2/ec2-permission-maintenance",
            "/CloudService/EC2/ec2-shared-snapshot",
            "/CloudService/EC2/ec2-subdomain-takeover",
            "/CloudService/EC2/ec2-exec-command",
            "/CloudService/EC2/get-ecs-windows-permission"
        ]
    }, {
        title: "RDS 云数据库",
        collapsable: false,
        children: [
            "/CloudService/RDS/",
            "/CloudService/RDS/mssql-bulk-insert",
            "/CloudService/RDS/postgresql-ssrf"
        ]
    }, {
        title: "IAM 身份和访问管理",
        collapsable: false,
        children: [
            "/CloudService/IAM/",
            "/CloudService/IAM/iam-persistence",
            "/CloudService/IAM/list-attached-user-policies",
            "/CloudService/IAM/console-takeover",
            "/CloudService/IAM/aliyun-console-takeover"
        ]
    }, {
        title: "CloudFront",
        collapsable: false,
        children: [
            "/CloudService/CloudFront/"
        ]
    }
];