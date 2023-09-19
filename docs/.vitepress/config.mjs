import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端基础知识艾宾浩斯记忆（anki）",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '前端基础知识', link: '/' },
      { text: '面试真题', link: '/real' },
      { text: '手写题', link: 'write'}
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jerryjiao/fe-interview-anki' }
    ]
  }
})
