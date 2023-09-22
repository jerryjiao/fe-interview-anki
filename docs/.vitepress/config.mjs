import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "GPT4搞前端面试",
  description: "利用anki来学习前端基础知识",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '前端基础知识', link: '/js' },
      { text: '面试真题', link: '/real' },
    ],

    sidebar: [
      {
        items: [
          { text: 'html', link: '/html' },
          { text: 'css', link: '/css'},
          { text: 'javascript基础知识', link: '/js' },
          { text: 'javascript手写题', link: '/jswriting' },
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
  mermaid:{
    //mermaidConfig !theme here works for ligth mode since dark theme is forced in dark mode
  },
})
