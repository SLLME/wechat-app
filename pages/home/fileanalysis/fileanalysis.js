// pages/home/fileanalysis/fileanalysis.js
const utils = require("../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadResult: [],
    swiperIndex: 0,
    navTabs: [
    ],
    imageInvoiceForm: [
    ],
    folderIndex: 0,
    folderArr: ["默认票夹", "娃哈哈", "旺旺"],
    folderOptions: [
      { name: '默认票夹', value: 'default' },
      { name: '娃哈哈', value: 'wahh' },
      { name: '旺旺', value: 'ww' }
    ],
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
    console.log(options);
    let res = JSON.parse(options.result);
    let resDataArr = [];
    let i,l;
    for(i=0,l=res.length; i<l; i++){
      resDataArr = resDataArr.concat(res[i].data);
    }
    let navTabs = [];
    let imageInvoiceForm = [];
    for(i=0,l=resDataArr.length; i<l; i++){
      navTabs.push({
        type: resDataArr[i].invType,
        el: utils.getElementFromType(resDataArr[i].invType),
        // TODO 需要用发票类型的数据字典去格式化
        title: resDataArr[i].invType,
        name: "" + i
      })
      let currResDataItem = utils.deepClone(resDataArr[i]);
      currResDataItem = Object.assign(currResDataItem, JSON.parse(currResDataItem['data']));
      currResDataItem.folder = this.data.folderOptions[0].name;
      currResDataItem.fileId = this.data.folderOptions[0].value;
      imageInvoiceForm.push(currResDataItem);
    }
    
    this.setData({
      uploadResult: resDataArr,
      navTabs: navTabs,
      imageInvoiceForm: imageInvoiceForm
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