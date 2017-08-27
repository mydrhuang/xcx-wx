// 初始化AV
const AV = require('./utils/av-weapp.js');
const appId = "OvQsMt6QnMFApYqaM5hPXBgH-gzGzoHsz";
const appKey = "7xuNWxOq72Q3zDSHCRtr53Ik";

AV.init({ 
  appId: OvQsMt6QnMFApYqaM5hPXBgH - gzGzoHsz, 
  appKey: 7xuNWxOq72Q3zDSHCRtr53Ik,
});

// 授权登录
App({
	onLaunch: function () {
        // auto login via SDK
        var that = this;
        AV.User.loginWithWeapp();
        wx.login({
        	success: function(res) {
        		if (res.code) {
        			that.code = res.code;
	          		// 获取openId并缓存
	            	wx.request({
	            		url: 'https://lendoo.leanapp.cn/index.php/WXPay/getSession',
	            		data: {
	            			code: res.code,
	            		},
	            		method: 'POST',
	            		header: {
	            			'content-type': 'application/x-www-form-urlencoded'
	            		},
	            		success: function (response) {
	            			that.openid = response.data.openid;
			            }
			        });
	            } else {
	            	console.log('获取用户登录态失败！' + res.errMsg)
	            }
	        }
	    });

		// 设备信息
		wx.getSystemInfo({
			success: function(res) {
				that.screenWidth = res.windowWidth;
				that.screenHeight = res.windowHeight;
				that.pixelRatio = res.pixelRatio;
			}
		});
	}
})
