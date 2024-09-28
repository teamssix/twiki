module.exports = {
    title: 'T Wiki',
    description: '面向云安全方向的知识文库',
    theme: 'antdocs',
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
        backToTop: true,
        docsRepo: 'teamssix/twiki',
        docsDir: 'docs',
        docsBranch: 'beta',
        editLinks: true,
        editLinkText: '编辑这个页面 ~',
        logo: '/img/logo.svg',
        nav: require("./config/nav"),
        repo: 'teamssix/twiki',
        sidebar: require("./config/sidebar"),
        sidebarDepth: 0,
        lastUpdated: '上次更新',
        pageAnchor: {
            isDisabled: false,
            anchorDepth: 2
        },
        ads: {
            style: 2,
            speed: 30000,
            items: [{
                image: '/img/2000000024.png',
                text: '关注我的个人公众号',
                link: '/About/#%E6%88%91%E7%9A%84%E4%B8%AA%E4%BA%BA%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7',
            }, {
                image: '/img/2000000023.png',
                text: '给博主买杯咖啡',
                link: '/About/#%E8%87%B4%E8%B0%A2',
            }]
        },
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