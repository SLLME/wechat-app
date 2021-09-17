// pages/home/home.js
import { currentInfo } from "./../../api/dept/dept"
import { getInvoiceFromText } from "../../api/discern/discern"
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
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
    ],

    files: [],
    baseArrs: [],
    suffixArrs: [],

    buttons: [{ text: '取消' }, { text: '确定' }], 
    shortMessageShow: false,
    shortMessageVal: "",
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

  shortMessageChange(e){
    let val = e.detail.value;
    this.setData({
      shortMessageVal: val
    })
  },
  /** 短信识别 */
  shortMessageSubmit(e){
    let that = this;
    if (e.detail.index == 0) {
      that.setData({
        shortMessageShow: false
      })
    } else {
      if(that.data.shortMessageVal == ""){
        wx.showToast({
          title: '短信内容不能为空',
          icon: "none"
        })
        return;
      }
      let params = {
        text: that.data.shortMessageVal,
      }
      wx.showLoading({
        mask: true,
        title: '录入中',
      })
      getInvoiceFromText(params).then(res=>{
        wx.hideLoading();
        if(res.code == 200){
          that.setData({
            shortMessageShow: false,
            shortMessageVal: false
          })
          wx.showToast({
            title: '短信录入成功',icon: "none"
          })
        }else {
          wx.showToast({
            title: res.msg,icon: "none"
          })
        }
      }).catch(()=>{
        wx.hideLoading();
      })
    }
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(utils.formatTime(new Date()));

    app.globalData.routeObj[this.__route__] = this;

    // wx.setStorageSync("token", "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    // console.log(wx.getStorageSync("token"));
    
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
    if(wx.getStorageSync('token')){
      currentInfo().then(res=>{
        if(res.code == 200){
          this.setData({
            userInfo: res.data
          })
        }
      }).catch(error=>{
        wx.showToast({
          title: error.errMsg,icon:'none'
        })
      })
    }else{
      wx.switchTab({
        url: '../about/about'
      })
    }
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("页面隐藏了");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("页面卸载了");
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
    }else if(item.id == "camera"){
      this.handleCamera();
    }else if(item.id == "wechat"){

    }else if(item.id == "message"){
      this.setData({
        shortMessageShow: true
      })
    }else if(item.id == "email"){
      
    }
  },
  /** 顶部拍照按钮 */
  handleCamera(){
    wx.yx.chooseImage({
      count: 9,
      sourceType: ['camera'],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let filePath = [];
        let fsm = wx.getFileSystemManager()
        let oldBaseArrs = that.data.baseArrs,
            suffixArrs = that.data.suffixArrs;
        for(let i=0,l=res.imgArray.length; i<l; i++){
          filePath.push(res.imgArray[i].path);
          let fileSuffix = res.imgArray[i].path.split(".").pop().toLowerCase();
          if(fileSuffix == "pdf"){
            oldBaseArrs.push(fileSuffix + "_" + fsm.readFileSync(res.imgArray[i].path, 'base64'));
          }else {
            oldBaseArrs.push(fileSuffix + "_" + fsm.readFileSync(res.imgArray[i].url, 'base64'));
          }
          suffixArrs.push(fileSuffix);
        }
        that.setData({
          files: that.data.files.concat(filePath),
          baseArrs: oldBaseArrs,
          suffixArrs: suffixArrs
        });
      }
    })
  },
  onTabItemTap (item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
})