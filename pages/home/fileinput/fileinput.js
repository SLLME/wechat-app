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
    baseArrs: [],
    suffixArrs: [],
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
  
  /** 预览图片 */
  previewImage(e) {
    let index = e.currentTarget.dataset.index;
    let currFile = [];
    currFile.push(this.data.files[index]);
    if(this.data.files[index].split(".").pop().toLocaleLowerCase() == "pdf" || this.data.files[index].split(".").pop().toLocaleLowerCase() == "ofd"){
      this.setData({
        error: "当前文件不允许预览"
      })
    }else {
      wx.previewImage({
        urls: currFile,
      })
    }
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
      }),
      baseArrs: this.data.baseArrs.filter((_curr, i, _arr) => {
        if (i == index) {
          return false;
        }
        return true;
      }),
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
    wx.showLoading({
      mask: true,
      title: '正在识别',
    })
    this.uploadDiscernLogic();
  },
  uploadDiscernLogic() {
    if (this.data.operationIndex < this.data.files.length) {
      // TODO 文件识别接口
      setTimeout(()=>{
        
      }, 2000)
      let formData = {},
      baseArray = [];
      baseArray.push(this.data.baseArrs[this.data.operationIndex]);
      formData.baseArray = baseArray;
      request.publicRequest({
        url: '/income/zzsinvoice/discernFile2',
        method: 'post',
        data: formData,
        success: res=>{
          let discernResult = this.data.discernResult;
          discernResult.push(res);
          this.setData({
            operationIndex: this.data.operationIndex + 1,
            discernResult: discernResult
          })
          this.uploadDiscernLogic();
        },
        error: res=>{
          this.setData({
            operationIndex: this.data.operationIndex + 1,
          })
          this.uploadDiscernLogic();
        }
      })
      /** 返回数据中文乱码，未找到解决办法 */
      // wx.uploadFile({
      //   url: 'http://localhost:8089/income/zzsinvoice/discernFile', //仅为示例，非真实的接口地址
      //   header: {
      //     'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
      //   },
      //   filePath: this.data.files[this.data.operationIndex],
      //   name: 'fileData',
      //   formData: {
      //     'baseArray': ''
      //   },
      //   success (res){
      //     wx.showToast({
      //       icon: "none",
      //       title: res.msg,
      //     })
      //   }
      // })
    } else {
      wx.hideLoading({
        success: (res) => {},
      })
      wx.navigateTo({
        url: '../fileanalysis/fileanalysis?result=' + JSON.stringify(this.data.discernResult),
      })
      this.setData({
        operationIndex: 0,
        discernNote: [],
        discernResult: [],
        files: [],
        baseArrs: [],
      })
    }
  },
  fileSuffix(item){
    return item.split(".").pop().toLowerCase();
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