// pages/home/fileanalysis/fileanalysis.js
const utils = require("../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperIndex: 0,
    navTabs: [
      'test',
      'test1'
    ]
  },
  /** 改变swiper-item */
  swiperChange(e){
    this.setData({
      swiperIndex: e.detail.current,
    })
  },
  /** 删除滑块视图 */
  swipeDelete(e){
    if(this.data.navTabs.length <= 1){
      /** 返回选择文件页面 */
      wx.navigateBack({
        delta: 1
      })
    }
    let index = e.currentTarget.dataset;
    let arr = this.data.navTabs;
    arr.splice(index, 1);
    this.setData({
      navTabs: arr,
    })
  },
  /** 保存 */
  analysisFormSubmit(){
    wx.showLoading({
      mask: true,
      title: '正在保存',
    })
    setTimeout(()=>{
      wx.hideLoading({
        success: (res) => {},
      })
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  }
})