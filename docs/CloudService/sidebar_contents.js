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
            "/CloudService/S3/limiting-bucket-upload-types-using-cloud-functions"
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
            "/CloudService/RDS/postgresql-ssrf",
            "/CloudService/RDS/the-cloud-has-an-isolation-problem-postgresql-vulnerabilities"
        ]
    }, {
        title: "IAM 身份和访问管理",
        collapsable: false,
        children: [
            "/CloudService/IAM/",
            "/CloudService/IAM/iam-persistence",
            "/CloudService/IAM/list-attached-user-policies",
            "/CloudService/IAM/console-takeover",
            "/CloudService/IAM/aliyun-console-takeover",
            "/CloudService/IAM/the_big_iam_challenge_writeup",
            "/CloudService/IAM/the-big-iam-challenge-writeup-by-shadowabi",
            "/CloudService/IAM/enum_user_and_role",
            "/CloudService/IAM/azure_ad_pentest",
        ]
    }, {
        title: "CloudFront",
        collapsable: false,
        children: [
            "/CloudService/CloudFront/"
        ]
    }, {
        title: "更多",
        collapsable: false,
        children: [
            "/CloudService/more/",
            "/CloudService/more/use-honeytokens-to-discover-attackers"
        ]
    }
];