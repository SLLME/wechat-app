// pages/home/home.js
const utils = require("../../utils/util")
const request = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyName: "广州众智汇科技有限公司",
    userName: "叶良辰",
    operationNavArr:[
      {
        name: '扫一扫',
        icon: "../../images/home/scan.png",
        route: "",
      },
      {
        name: '拍照',
        icon: "../../images/home/camera.png",
        route: "",
      },
      {
        name: '打印',
        icon: "../../images/home/print.png",
        route: "",
      },
      {
        name: '发票查验',
        icon: "../../images/home/check.png",
        route: "/checked",
      }
    ],
    collectionTypeArr: [
      {
        name: '微信',
        icon: "../../images/about/wx.png",
      },
      {
        name: '支付宝',
        icon: "../../images/about/zhifubao.png",
      },
      {
        name: '短信',
        icon: "../../images/about/short_message.png",
      },
      {
        name: '邮箱',
        icon: "../../images/about/email.png",
      },
      {
        name: '照片',
        icon: "../../images/about/photo.png",
      }
      ,{
        name: '手工',
        icon: "../../images/about/manual.png",
      },
      {
        name: '携程',
        icon: "../../images/about/xiecheng.png",
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(utils.formatTime(new Date()));
    request.publicRequest({
      url: '/captchaImage',
      method: 'get',
      success: res=>{
        console.log(res);
      }
    })
    this.setData({
      date1: "222"
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

  },

  showToptips(){
    this.setData({
      msg: "这是一个成功提示文本"
    })
  },
  /** 跳转 */
  operationJump(event){
    let item = event.currentTarget.dataset.params;
    console.log(item);
  }
})