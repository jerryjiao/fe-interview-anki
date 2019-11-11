module.exports = {
  title: '前端基础知识艾宾浩斯记忆',
  description: '前端基础知识艾宾浩斯记忆（anki）',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/index' },
      { text: '附加内容', link: '/config' }
    ]
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }]]
}
