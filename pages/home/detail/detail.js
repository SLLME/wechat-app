// pages/home/detail/detail.js
const utils = require("../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /** 跳转过来的发票id */
    invoiceId: null,
    /** 发票所在列表下标 */
    invoiceIndex: null,
    /** 发票id数组 */
    invoiceIdArr: null,

    activeNames: ['1'],
    circularNum: 0,
    /** 编辑页面显示状态 */
    editPopupShow: false,
    formData: {
      invType: '01',
      invCode: '222'
    },
    rules: [
      {
        name: "invCode",
        rules: [
          { required: true, message: "请填写发票代码" },
          {
            validator: function (rule, value, param, models) {
              if(!(/^(\d{10}|\d{12})$/.test(value))){
                return rule.message;
              }
            }, 
            message: "请输入正确的发票代码"
          }
          // { pattern: /^(\d{10}|\d{12})$/, message: "请输入正确的发票代码", trigger: "onBlur" }
        ]
      },
    ],
  },
  /** swiper改变 */
  swiperChange(e){
    console.log(e);
    this.setData({
      invoiceIndex: e.detail.current + 1,
    })
    //TODO 调用获取详情接口
  },
  /** 折叠面板 */
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  /** 编辑 */
  editInvoice(){
    wx.setNavigationBarTitle({title: '编辑发票'})
    this.setData({
      editPopupShow: true,
    })
  },
  
  formFieldChange(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  submitManualForm(e){
    console.log(e);
    console.log(this.data.formData)
  },
  /** 预览 */
  previewUrl(){
    wx.downloadFile({
      url: 'https://test.zzhcn.net/einvoices/zzh-wechat/electronic/202107/15/bd285bd7f8de4b7c8d0370b321fc4d2f.pdf',
      success: function (res) {
        console.log(res)
        var Path = res.tempFilePath              //返回的文件临时地址，用于后面打开本地预览所用
        wx.openDocument({
          filePath: Path,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      },
      fail:function (res){
        // console.log(res)
        alert(res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /** 计算圆形个数 */
    let width = wx.getSystemInfoSync().windowWidth;
    this.setData({
      circularNum: parseInt((width - 80) / 30)
    })
    let params = JSON.parse(options.params);
    this.setData({
      invoiceId: params.id,
      invoiceIndex: params.invoiceIndex,
      invoiceIdArr: params.invoiceIdArr
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