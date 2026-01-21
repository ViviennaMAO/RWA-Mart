const config = require('../../config.js')

Page({
    data: {
        url: config.webViewUrl
    },
    onLoad(options) {
        console.log('Loading web-view with URL:', this.data.url)

        // 如果从其他页面传递了 URL 参数，使用传递的 URL
        if (options.url) {
            this.setData({
                url: decodeURIComponent(options.url)
            })
        }
    },
    onShow() {
        console.log('Page shown')
    },
    onMessage(e) {
        console.log('Message from web-view:', e.detail.data)
    },
    onError(e) {
        console.error('Web-view error:', e)
        wx.showModal({
            title: '加载失败',
            content: '页面加载失败，请检查网络连接或联系管理员',
            showCancel: false
        })
    }
})
