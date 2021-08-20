// pages/home/email/email.js
const moment = require("../../../utils/moment")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    emailList: [
      {
        emailType: "QQ邮箱",
        emailAccount: "2193452423@qq.com",
      },
      {
        emailType: "QQ邮箱",
        emailAccount: "2193452423@qq.com",
      },
      {
        emailType: "QQ邮箱",
        emailAccount: "2193452423@qq.com",
      }
    ],
    buttons: [{ text: '取消' }, { text: '确定' }],
    addShow: false,
    addPopTitle: "",
    addForm: {
      id: "",
      emailAccount: "",
      emailPwd: ""
    },

    importShow: false,
    importForm: {
      importDateBegin: "",
      importDateEnd: "",
      fileId: "",
      folder: "",
    },
    folderIndex: 0,
    folderArr: ["默认票夹", "娃哈哈", "旺旺"],
    folderOptions: [
      { name: '默认票夹', value: 'default' },
      { name: '娃哈哈', value: 'wahh' },
      { name: '旺旺', value: 'ww' }
    ],
  },
  /** 修改邮箱信息 */
  handleEditEmail(e){
    console.log(e);
    let index = e.currentTarget.dataset.index;
    //TODO 通过index拿到对应id，请求邮箱详情接口

    this.setData({
      addShow: true,
      addPopTitle: "编辑邮箱",
    })
  },

  /** 导入发票按钮 */
  importInvoice(e){
    this.setData({
      importShow: true,
    })
  },
  /** 导入发票弹出框中日期改变 */
  importDateChange(e){
    console.log(e);
    let value = e.detail.value;
    let field = e.currentTarget.dataset.field;
    this.setData({
      [`importForm.${field}`]: value,
    })
  },
  /** 导入发票提交 */
  importSubmit(e){
    if (e.detail.index == 0) {
      this.setData({
        importShow: false
      })
    }else {
      this.setData({
        importShow: false
      })
    }
  },
  /** 添加邮箱按钮 */
  submitManualForm(){
    this.setData({
      addPopTitle: "新增邮箱",
      addShow: true,
    })
  },
  /** 新增或修改 */
  addSubmit(e){
    let that = this;
    if (e.detail.index == 0) {
      that.setData({
        addShow: false
      })
    }else {
      that.setData({
        addShow: false
      })
      if(that.data.addForm.id){

      }else{

      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let currMonthVal = (new Date().getFullYear()) + "-" + ((new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1));
    this.setData({
      [`importForm.importDateBegin`]: moment(currMonthVal).startOf('month').format("YYYY-MM-DD"),
      [`importForm.importDateEnd`]: moment(currMonthVal).endOf('month').format("YYYY-MM-DD"),
    })
    // console.log(moment(moment(currMonthVal).endOf('month').format("YYYY-MM-DD")).add(1, "days").format("YYYY-MM-DD"));
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