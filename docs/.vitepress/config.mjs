import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Frontend Basics Anki",
  description: "A VitePress Site for Frontend Basics",
  
  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    zh: {
      label: '中文',
      lang: 'zh-CN',
      link: '/zh/'
    }
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Frontend Basics', link: '/' },
      { text: 'Interview Questions', link: '/real' },
      { text: 'Coding Questions', link: '/write' }
    ],

    sidebar: [
      {
        items: [
          { text: 'html', link: '/html' },
          { text: 'css', link: '/css'},
          { text: 'javascript基础知识', link: '/js' },
          { text: 'Dom和Bom', link: '/domandbom' },
          { text: 'Http', link: '/http' },
          { text: '浏览器', link: '/browser' },
          { text: 'vue', link: '/vue' },
          { text: 'react', link: '/react' },
          { text: 'webpack', link: '/webpack' },
        ],
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jerryjiao/fe-interview-anki' }
    ]
  },
})
