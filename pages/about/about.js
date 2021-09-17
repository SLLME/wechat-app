// pages/about/about.js
const app = getApp();
import { code2Session } from "./../../api/authorizedLogin"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "叶良辰",
    telephone: "18273733315",
    aboutArr: [
      // {
      //   name: '公司设置',
      //   icon: "../../images/about/company_setting.png",
      //   path: 'companySetting/companySetting',
      // },
      {
        name: '个人设置',
        icon: "../../images/about/personal_setting.png",
        path: 'personalSetting/personalSetting'
      },
      {
        name: '帮助与反馈',
        icon: "../../images/about/help.png",
        path: 'help/help'
      },
      {
        name: '操作指南',
        icon: "../../images/about/guide.png",
        path: 'guide/guide'
      }
    ],
    userInfo: null,
    hasUserInfo: false,
  },

  getUserProfile(e) {
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        app.globalData.userInfo = res.userInfo;
        app.globalData.hasUserInfo = true;
        wx.setStorageSync('userInfo', res.userInfo);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
        let params = {
          code: app.globalData.code,
          signature: res.signature,
          rawData: res.rawData,
          encryptedData: res.encryptedData,
          iv: res.iv
        }
        code2Session(params).then(res=>{
          if(res.code == 200){
            wx.setStorageSync('token', res.data);
          }else{
            wx.showToast({
              title: res.msg,
              icon: 'none',
            })
          }
        })
      },
      fail: (error)=>{
        wx.showToast({
          title: '取消授权',
          icon: 'none',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      hasUserInfo: wx.getStorageSync('userInfo') ? true : false,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading({
      success: (res) => {},
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 3
    })
  }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /** 点击事件 */
  aboutClick(e){
    console.log(e);
    let path = e.currentTarget.dataset.item.path;
    wx.navigateTo({
      url: path,
    })
  }
})