// pages/home/home.js
const utils = require("../../utils/util")
const request = require("../../utils/request")
const test = require("./../../api/test")
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    companyName: "广州众智汇科技有限公司",
    userName: "叶良辰",
    operationNavArr:[
      {
        id: "scan",
        name: '扫一扫',
        icon: "../../images/home/scan.png",
        route: "",
      },
      {
        id: "camera",
        name: '拍照',
        icon: "../../images/home/camera.png",
        route: "",
      },
      {
        id: "print",
        name: '打印',
        icon: "../../images/home/print.png",
        route: "",
      },
      {
        id: "check",
        name: '发票查验',
        icon: "../../images/home/check.png",
        route: "checked/checked",
      }
    ],
    collectionTypeArr: [
      {
        id: "wechat",
        name: '微信',
        icon: "../../images/about/wx.png",
      },
      {
        id: "alipay",
        name: '支付宝',
        icon: "../../images/about/zhifubao.png",
      },
      {
        id: "message",
        name: '短信',
        icon: "../../images/about/short_message.png",
      },
      {
        id: "email",
        name: '邮箱',
        icon: "../../images/about/email.png",
        route: "email/email"
      },
      {
        id: "photo",
        name: '照片',
        icon: "../../images/about/photo.png",
        route: "fileinput/fileinput"
      }
      ,{
        id: "manual",
        name: '手工',
        icon: "../../images/about/manual.png",
        route: "manual/manual"
      },
      {
        id: "ctrip",
        name: '携程',
        icon: "../../images/about/xiecheng.png",
      },
      {
        id: "more",
        name: "更多",
        icon: "../../images/about/more.png",
        route: "more/more"
      }
    ],
    ticketTitleInputShow: false,
    ticketTitleDetailShow: false,
    showActionsheet: false,
    sheetGroups: [
      { text: '修改', value: 1 },
      { text: '删除', value: 2 },
    ]
  },
  /** 添加发票抬头 */
  addTicketTitle(){
    this.setData({
      ticketTitleInputShow: true
    })
  },
  operationTicketTitle(){
    this.setData({
      showActionsheet: true
    })
  },
  actionsheetClick(e){
    console.log(e);
    this.setData({
      showActionsheet: false,
    })
    let value = e.detail.value;
    if(value == '1'){ /** 修改 */
      this.setData({
        ticketTitleDetailShow: false,
        ticketTitleInputShow: true,
      })
    }else{ /** 删除 */

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(utils.formatTime(new Date()));
    test.getImage().then(res=>{
      console.log(res);
    }).catch(error=>{
      console.log(error);
    })
    app.globalData.routeObj[this.__route__] = this;

    wx.setStorageSync("token", "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    console.log(wx.getStorageSync("token"));
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo
        })
      }
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
    if(item.route){
      wx.navigateTo({
        url: item.route,
      })
    }else if(item.id == "wechat"){

    }else if(item.id == "message"){

    }else if(item.id == "email"){

    }
  }
})