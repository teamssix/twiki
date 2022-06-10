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
        ]
    }, {
        title: "Kubernetes",
        collapsable: false,
        children: [
            "/CloudNative/Kubernetes/",
            "/CloudNative/Kubernetes/k8s-risks",
            "/CloudNative/Kubernetes/CVE-2018-1002105",
            "/CloudNative/Kubernetes/k8s-var-log-escape",
        ]
    }, {
        title: "Terraform",
        collapsable: false,
        children: [
            "/CloudNative/Terraform/",
            "/CloudNative/Terraform/terraform-experience",
            "/CloudNative/Terraform/terraform-enable-plugin-cache",
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
    }
];