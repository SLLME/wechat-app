// pages/home/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: ['1'],
    circularNum: 0,
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
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