import { defineConfig } from 'vitepress'

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

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jerryjiao/fe-interview-anki' }
    ]
  }
})
