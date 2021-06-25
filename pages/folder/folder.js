// pages/folder/folder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    folderArr: [
      {
        name: '发票夹（默认）',
        icon: "../../images/folder/folder.png",
        amount: 2021,
        num: 5,
        checked: false,
      },
      {
        name: '加班打滴',
        icon: "../../images/folder/folder.png",
        amount: 6666,
        num: 555,
        checked: false,
      }
    ],
    addDialogShow: false,
    buttons: [{text: '取消'}, {text: '确定'}],
    folderName: "aaaa",
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

  },
  /** 新增按钮 */
  addFolder(){
    this.setData({
      addDialogShow: true
    })
  }
})