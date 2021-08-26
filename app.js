// app.js
import { promisifyAll } from "wx-promise-pro" 
promisifyAll();
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    wx.getUserInfo({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.globalData.userInfo = res.userInfo;
        this.globalData.hasUserInfo = true;
      }
    })
  },
  globalData: {
    userInfo: null,
    hasUserInfo: false,
    routeObj: {},
  },
})
