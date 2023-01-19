module.exports = {
    title: 'T Wiki',
    description: '面向云安全方向的知识文库',
    theme: 'antdocs',
    backToTop: true,
    head: [
        [
            'link', { rel: 'icon', href: '/img/favicon.ico' }
        ],
        [
            'script', {}, `
            var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?5abe668add09d35abb6558cdf1982175";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();
            `
        ]
    ],
    themeConfig: {
        repo: 'teamssix',
        docsRepo: 'teamssix/TWiki',
        docsDir: 'docs',
        docsBranch: 'beta',
        editLinks: true,
        editLinkText: '编辑这个页面 ~',
        logo: '/img/logo.svg',
        nav: require("./config/nav"),
        sidebar: require("./config/sidebar"),
        sidebarDepth: 0,
        lastUpdated: '上次更新'
    },
    markdown: {
        lineNumbers: true
    },
    plugins: [
        [
            '@vssue/vuepress-plugin-vssue',
            {
                platform: 'github',
                owner: 'teamssix',
                repo: 'twiki-vssue',
                clientId: 'VSSUECLIENTID',
                clientSecret: 'VSSUECLIENTSECRET',
                autoCreateIssue: true
            }
        ],
        [
            '@vuepress/google-analytics',
            {
                'ga': 'UA-233600566-1'
            }
        ]
    ]
}