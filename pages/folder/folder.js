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

    error: "",
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
  },
  /** 新增模态框的发票夹名字改变 */
  folderNameChange(e){
    this.setData({
      folderName: e.detail.value
    })
  },
  /** 新增模态框确认或者取消 */
  addFolderTap(e){
    if(e.detail.index == 0){
      this.setData({
        addDialogShow: false
      })
    }else{
      if(this.data.folderName == ""){
        this.setData({
          error: "发票夹名字不能为空"
        })
      }else{
        let that = this;
        that.setData({
          ['folderArr[' + that.data.folderArr.length + ']']: {
            name: that.data.folderName,
            icon: "../../images/folder/folder.png",
            amount: 0,
            num: 0,
            checked: false,
          },
          addDialogShow: false,
          folderName: ""
        })
      }
    }
    
  },
})