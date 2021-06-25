// pages/about/personalSetting/personalSetting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personalInfoForm: {
      wx: "aaaaa",
      nickName: 'aaaaa',
      account: 'aaaaaa',
      phone: 'aaaaa',
      email: 'aaaaa',
      addr: 'aaaaa',
    },
    personalInfoRuels: [

    ],
    isEdit: false

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
  /** 编辑按钮 */
  editInfo(){
    this.setData({
      isEdit: true
    })
  },
  /** 修改按钮 */
  editSubmit(){
    let that = this;
    wx.showModal({
      content: "确认修改？",
      success (res) {
        that.setData({
          isEdit: false
        })
        if (res.confirm) {
          // TODO 执行后台修改接口

        }else if(res.cancel){

        }
      }
    })
  },
})