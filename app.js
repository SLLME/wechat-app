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
        // console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.code = res.code;
      }
    })

    // wx.getUserInfo({
    //   desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    //   success: (res) => {
    //     console.log(res)
    //     this.globalData.userInfo = res.userInfo;
    //     this.globalData.hasUserInfo = true;
    //   }
    // })

    let accountInfo = wx.getAccountInfoSync();
    let nowEnv = accountInfo.miniProgram.envVersion;
    let tempObj = {
      'develop': 'http://192.168.31.153:8086/miniapp', // 开发请求地址
      'trial': 'https://vat.zzhcn.net/test/prod', // 测试请求地址
      'release': 'https://vat.zzhcn.net/test/prod', // 生产请求地址
    };
    this.globalData.env.baseUrl = tempObj[nowEnv];
  },
  globalData: {
    code: null,
    userInfo: null,
    hasUserInfo: false,
    routeObj: {},
    /** 不同环境参数配置 */
    env: {
      baseUrl: "",
    },
    /** 文件识别结果，路由跳转只能在url后面携带参数，ocr识别结果太大，故设定一个全局变量存放 */
    discernResult: null,
  },
  myShowToast(title, icon='none', duration=2000){
    wx.showToast({
      title: title,
      icon: icon,
      duration: duration
    })
  },
})
