// pages/home/more/more.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parentObj: {},
    toolArr: [
      {name: '扫一扫', icon: "../../../images/home/scan.png"},
      {name: '拍照', icon: "../../../images/home/camera.png"},
      {name: '短信', icon: "../../../images/about/short_message.png"},
      {name: '文件录入', icon: "../../../images/about/photo.png",route: "../fileinput/fileinput"},
      {name: '邮箱', icon: "../../../images/about/email.png",route: "../email/email"},
      {name: '手工', icon: "../../../images/about/manual.png",route: '../manual/manual'},
    ],
    ticketActive: 0,
    ticketArr: [
      {
        title: '常用', value: [
          {name: '微信', icon: "../../../images/about/wx.png"},
          {name: '支付宝', icon: "../../../images/about/zhifubao.png", disable: true},
          {name: '淘宝', icon: "../../../images/about/taobao.png", disable: true},
          {name: '滴滴', icon: "../../../images/about/didi.png", disable: true},
          {name: '携程', icon: "../../../images/about/xiecheng.png", disable: true},
          {name: '京东', icon: "../../../images/about/jingdong.png", disable: true},
          {name: '苏宁', icon: "../../../images/about/suning.png", disable: true},
          {name: '南航', icon: "../../../images/about/nanhang.png", disable: true},
          {name: '电信', icon: "../../../images/about/dianxin.png", disable: true},
          {name: '联通', icon: "../../../images/about/liantong.png", disable: true},

        ]
      },
      {
        title: '出行', value: [
          {name: '滴滴', icon: "../../../images/about/didi.png", disable: true},
          {name: '携程', icon: "../../../images/about/xiecheng.png", disable: true},
          {name: '南航', icon: "../../../images/about/nanhang.png", disable: true},
        ]
      },
      {
        title: '购物', value: [
          {name: '淘宝', icon: "../../../images/about/taobao.png", disable: true},
          {name: '京东', icon: "../../../images/about/jingdong.png", disable: true},
          {name: '苏宁', icon: "../../../images/about/suning.png", disable: true},
        ]
      },
      {
        title: '通讯', value: [
          {name: '微信', icon: "../../../images/about/wx.png"},
          {name: '电信', icon: "../../../images/about/dianxin.png", disable: true},
          {name: '联通', icon: "../../../images/about/liantong.png", disable: true},
        ]
      },
      {
        title: '旅游', value: [
          {name: '携程', icon: "../../../images/about/xiecheng.png", disable: true},
          {name: '南航', icon: "../../../images/about/nanhang.png", disable: true},
        ]
      },
      {
        title: '酒店', value: [
          {name: '携程', icon: "../../../images/about/xiecheng.png", disable: true},
        ]
      },
    ]
  },

  handleOperation(e){
    let item = e.currentTarget.dataset.params;
    this.data.parentObj.operationJump(e);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      parentObj: app.globalData.routeObj['pages/home/home']
    })
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