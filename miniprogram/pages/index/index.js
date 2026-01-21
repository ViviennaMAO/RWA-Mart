Page({
    data: {
        url: ''
    },
    onLoad() {
        // Check if running in dev tool
        const accountInfo = wx.getAccountInfoSync();
        const env = accountInfo.miniProgram.envVersion;

        // In real development, you would check env. 
        // For local dev, we point to localhost.
        // Replace with your local IP if testing on device.
        let url = 'http://localhost:5173/';

        if (env === 'release') {
            url = 'https://your-production-url.com/';
        }

        this.setData({ url });
    }
})
