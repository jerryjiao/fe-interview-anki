module.exports = {
  title: 'Vuepress',
  description: 'This is a Zeit Now 2.0 example',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/index' },
      { text: 'Config Page', link: '/config' }
    ]
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }]]
}
