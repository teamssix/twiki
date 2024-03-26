module.exports = [
    '/CloudNative/',
    {
        title: "Docker",
        collapsable: false,
        children: [
            "/CloudNative/Docker/",
            "/CloudNative/Docker/docker-use-notes",
            "/CloudNative/Docker/docker-risks",
            "/CloudNative/Docker/docker-escape-vulnerability-summary",
            "/CloudNative/Docker/container-escape-check",
            "/CloudNative/Docker/docker-procfs-escape",
            "/CloudNative/Docker/docker-socket-escape",
            "/CloudNative/Docker/docker-privileged-escape",
            "/CloudNative/Docker/docker-remote-api-unauth-escape",
            "/CloudNative/Docker/CVE-2016-5195",
            "/CloudNative/Docker/CVE-2019-16884",
            "/CloudNative/Docker/CVE-2021-3493",
            "/CloudNative/Docker/CVE-2021-22555",
            "/CloudNative/Docker/CVE-2022-0492",
            "/CloudNative/Docker/CVE-2022-0847",
            "/CloudNative/Docker/CVE-2022-0847-dirty-pipe",
            "/CloudNative/Docker/CVE-2022-23222",
            "/CloudNative/Docker/docker-user-group-privilege-escalation",
        ]
    }, {
        title: "Kubernetes",
        collapsable: false,
        children: [
            "/CloudNative/Kubernetes/",
            "/CloudNative/Kubernetes/k8s-risks",
            "/CloudNative/Kubernetes/CVE-2018-1002105",
            "/CloudNative/Kubernetes/k8s-var-log-escape",
            "/CloudNative/Kubernetes/k8s-cluster-penetration",
            "/CloudNative/Kubernetes/k8s-practical-exercise-1",
            "/CloudNative/Kubernetes/k8s-horizontal-taints",
            "/CloudNative/Kubernetes/wiz-eks-cluster-games-wp",
            "/CloudNative/Kubernetes/wiz-k8s-lan-party-wp"
        ]
    }, {
        title: "Terraform",
        collapsable: false,
        children: [
            "/CloudNative/Terraform/",
            "/CloudNative/Terraform/terraform-experience",
            "/CloudNative/Terraform/terraform-enable-plugin-cache",
            "/CloudNative/Terraform/terraform-visualization-online",
            "/CloudNative/Terraform/terraform-visualization",
            "/CloudNative/Terraform/terraform-code-security-check",
            "/CloudNative/Terraform/terraform-introductory",
        ]
    }, {
        title: "APISIX",
        collapsable: false,
        children: [
            "/CloudNative/APISIX/",
            "/CloudNative/APISIX/apisix-cve-2022-29266",
        ]
    }, {
        title: "Virtualization",
        collapsable: false,
        children: [
            "/CloudNative/Virtualization/",
        ]
    }
];