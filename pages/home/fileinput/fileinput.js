// pages/home/fileinput/fileinput.js
const request = require("./../../../utils/request")
const util = require("./../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    error: "",
    files: [],

    operationIndex: 0,
    discernNote: [],
    discernResult: [

    ],
  },

  /** 选中文件 */
  selectFile() {
    let that = this;
    if(that.data.files.length >= 9){
      this.setData({
        error: "只能选取九个文件"
      })
      return;
    }
    wx.yx.chooseImage({
      count: (9 - that.data.files.length),
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let filePath = [];
        let fsm = wx.getFileSystemManager()
        for(let i=0,l=res.imgArray.length; i<l; i++){
          filePath.push(res.imgArray[i].path);
          if(res.imgArray[i].path.split(".").pop().toLowerCase() == "pdf"){
            console.log(fsm.readFileSync(res.imgArray[i].path, 'base64'))
          }else {
            console.log(fsm.readFileSync(res.imgArray[i].url, 'base64'))
          }
        }
        that.setData({
          files: that.data.files.concat(filePath)
        });
      }
    })
  },
  
  /** 预览图片 */
  previewImage(e) {
    let index = e.currentTarget.dataset.index;
    let currFile = [];
    currFile.push(this.data.files[index]);
    wx.previewImage({
      urls: currFile,
    })
  },
  /** 删除文件 */
  deleteFile(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      files: this.data.files.filter((_curr, i, _arr) => {
        if (i == index) {
          return false;
        }
        return true;
      })
    })
  },
  /** 上传识别 */
  uploadDiscern() {
    if (this.data.files.length == 0) {
      this.setData({
        error: "请先选择文件再进行操作"
      })
      return false
    }
    this.setData({
      operationIndex: 0,
      discernNote: [],
      discernResult: [],
    })
    this.uploadDiscernLogic();
    wx.navigateTo({
      url: '../fileanalysis/fileanalysis',
    })
  },
  uploadDiscernLogic() {
    if (this.data.operationIndex < this.data.files.length) {
      util.base64Compress().then(res => {

      })
    } else {
      this.setData({
        operationIndex: 0,
        discernNote: [],
        discernResult: [],
      })
      wx.navigateTo({
        url: '../fileanalysis/fileanalysis',
      })
    }
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

  }
})