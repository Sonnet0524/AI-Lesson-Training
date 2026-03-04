import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'AI 种子团队培训',
  description: '国网四川电力人工智能种子团队 Agentic AI 实战培训课程',
  
  // 语言配置
  lang: 'zh-CN',
  
  // 最后更新时间
  lastUpdated: true,
  
  // 清理 URL（去掉 .html 后缀）
  cleanUrls: true,
  
  // 忽略死链接（临时方案，后续修复）
  ignoreDeadLinks: true,
  
  // 站点地图
  sitemap: {
    hostname: 'https://sonnet0524.github.io/AI-Lesson-Training/'
  },
  
  // 主题配置
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { 
        text: '预授课', 
        link: '/pre-lesson/',
        activeMatch: '/pre-lesson/'
      },
      { 
        text: '课程',
        items: [
          { text: 'Day 1：AI趋势与基础', link: '/lesson-01/day1-ai-trends' },
          { text: 'Day 2：Agent开发实战', link: '/lesson-01/day2-agent-dev' },
          { text: 'Day 3：Agent优化与发布', link: '/lesson-01/day3-agent-optimize' },
          { text: 'Day 4：前端开发', link: '/lesson-01/day4-frontend' },
          { text: 'Day 5：项目展示与总结', link: '/lesson-01/day5-showcase' }
        ]
      },
      { 
        text: '项目设计',
        items: [
          { text: '智能问数', link: '/projects/smart-query' },
          { text: '智能写作', link: '/projects/smart-writing' },
          { text: '工单处理', link: '/projects/work-order' }
        ]
      },
      { 
        text: '平台指南',
        items: [
          { text: '快速开始', link: '/platform-guide/quick-start' },
          { text: '模块概览', link: '/platform-guide/modules/' },
          { text: '知识库管理', link: '/platform-guide/advanced/knowledge-base' },
          { text: 'MCP服务', link: '/platform-guide/advanced/mcp' }
        ]
      },
      { text: '资源中心', link: '/resources/' }
    ],
    
    // 侧边栏
    sidebar: {
      '/pre-lesson/': [
        {
          text: '预授课',
          items: [
            { text: '课程概览', link: '/pre-lesson/' },
            { text: '第1次：灵知平台入门', link: '/pre-lesson/01-platform-intro' },
            { text: '第2次：核心模块与编排', link: '/pre-lesson/02-core-modules' },
            { text: '第3次：VibeCoding环境准备', link: '/pre-lesson/03-vibe-coding' }
          ]
        }
      ],
      
      '/lesson-01/': [
        {
          text: 'Lesson-01',
          items: [
            { text: '课程概览', link: '/lesson-01/' },
            { text: 'Day 1：AI趋势与基础', link: '/lesson-01/day1-ai-trends' },
            { text: 'Day 2：Agent开发实战', link: '/lesson-01/day2-agent-dev' },
            { text: 'Day 3：Agent优化与发布', link: '/lesson-01/day3-agent-optimize' },
            { text: 'Day 4：前端开发', link: '/lesson-01/day4-frontend' },
            { text: 'Day 5：项目展示与总结', link: '/lesson-01/day5-showcase' }
          ]
        }
      ],
      
      '/projects/': [
        {
          text: '项目设计',
          items: [
            { text: '项目概览', link: '/projects/' },
            { text: '智能问数', link: '/projects/smart-query' },
            { text: '智能写作', link: '/projects/smart-writing' },
            { text: '工单处理', link: '/projects/work-order' }
          ]
        }
      ],
      
      '/resources/': [
        {
          text: '资源中心',
          items: [
            { text: '资源概览', link: '/resources/' },
            { text: '技术栈速查', link: '/resources/tech-stack' },
            { 
              text: '环境搭建',
              items: [
                { text: 'OpenCode安装', link: '/resources/env-setup/opencode' },
                { text: 'Trae-cn使用', link: '/resources/env-setup/trae-cn' },
                { text: 'Git环境配置', link: '/resources/env-setup/git-setup' }
              ]
            }
          ]
        }
      ],
      
      '/platform-guide/': [
        {
          text: '平台指南',
          items: [
            { text: '快速开始', link: '/platform-guide/quick-start' },
            { 
              text: '基础模块',
              items: [
                { text: '模块概览', link: '/platform-guide/modules/' },
                { text: '用户提问', link: '/platform-guide/modules/user-question' },
                { text: '智能对话', link: '/platform-guide/modules/smart-dialogue' },
                { text: '知识库搜索', link: '/platform-guide/modules/knowledge-search' },
                { text: '信息分类', link: '/platform-guide/modules/info-classification' },
                { text: '循环模块', link: '/platform-guide/modules/loop' }
              ]
            },
            {
              text: '高级功能',
              items: [
                { text: '知识库管理', link: '/platform-guide/advanced/knowledge-base' },
                { text: 'MCP服务', link: '/platform-guide/advanced/mcp' }
              ]
            }
          ]
        }
      ]
    },
    
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Sonnet0524/AI-Lesson-Training' }
    ],
    
    // 页脚
    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2026 国网四川电力人工智能种子团队'
    },
    
    // 搜索配置
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },
    
    // 编辑链接（可选）
    // editLink: {
    //   pattern: 'https://github.com/Sonnet0524/AI-Lesson-Training/edit/main/content/:path'
    // },
    
    // 文档页脚
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    
    // 大纲标题
    outline: {
      label: '页面导航'
    },
    
    // 最后更新时间文本
    lastUpdatedText: '最后更新',
    
    // 返回顶部
    returnToTopLabel: '返回顶部',
    
    // 菜单
    sidebarMenuLabel: '菜单',
    
    // 深色模式
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  },
  
  // Markdown 配置
  markdown: {
    // 代码块主题
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    
    // 行号
    lineNumbers: true,
    
    // 配置
    config: (md) => {
      // 可以在这里添加 markdown-it 插件
    }
  },
  
  // Vite 配置
  vite: {
    // 添加 Mermaid 支持
    plugins: [],
    
    // 优化配置
    optimizeDeps: {
      include: ['mermaid']
    }
  },
  
  // 构建配置
  build: {
    // 输出目录
    outDir: '.vitepress/dist'
  },
  
  // 头部配置
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#667eea' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'zh-CN' }],
    ['meta', { name: 'og:site_name', content: 'AI 种子团队培训' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ]
})
