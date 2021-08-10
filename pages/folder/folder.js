// pages/folder/folder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    folderArr: [
      {
        id: "1111111111111",
        name: '发票夹（默认）',
        icon: "../../images/folder/folder.png",
        amount: 2021,
        num: 5,
        checked: false,
      },
      {
        id: "2222222222222",
        name: '加班打滴',
        icon: "../../images/folder/folder.png",
        amount: 6666,
        num: 555,
        checked: false,
      }
    ],
    selectedFolderArr: [],

    dialogTitle: null,
    addDialogShow: false,
    buttons: [{ text: '取消' }, { text: '确定' }],
    folderName: "",

    error: "",

    operationRadioItems: [
      { name: '重命名', value: '1', checked: true },
      { name: '删除', value: '2' }
    ],
    operationRadio: '1',
    renameDialogShow: false,
    renameFolderName: null,
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
  addFolder() {
    this.setData({
      addDialogShow: true,
      dialogTitle: "新增发票夹",
    })
  },
  /** 新增模态框的发票夹名字改变 */
  folderNameChange(e) {
    this.setData({
      folderName: e.detail.value
    })
  },
  /** 新增模态框确认或者取消 */
  addFolderTap(e) {
    if (e.detail.index == 0) {
      this.setData({
        addDialogShow: false,
        renameDialogShow: false,
      })
    } else {
      if (this.data.folderName == "") {
        this.setData({
          error: "发票夹名字不能为空"
        })
      } else {
        let that = this;
        /** 新增 */
        if (that.data.addDialogShow) {
          that.setData({
            ['folderArr[' + that.data.folderArr.length + ']']: {
              name: that.data.folderName,
              icon: "../../images/folder/folder.png",
              amount: 0,
              num: 0,
              checked: false,
            },
            addDialogShow: false,
            renameDialogShow: false,
            folderName: ""
          })
        }else{ /** 重命名 */
          
        }
      }
    }

  },
  /** 编辑按钮 */
  operationFolder() {
    this.setData({
      operationDialogShow: true
    })
  },
  operationRadioChange(e) {
    this.setData({
      operationRadio: e.detail.value,
    })
  },
  /** 编辑模态框确定 */
  operationFolderTap(e) {
    if (e.detail.index == 0) {
      this.setData({
        operationDialogShow: false
      })
    } else {
      this.setData({
        operationDialogShow: false
      })
      /** 重命名 */
      if (this.data.operationRadio == '1') {
        this.setData({
          renameDialogShow: true,
          dialogTitle: "重命名"
        })
      } else { /** 删除 */

      }
    }
  },

  jumpInvoiceList(e){
    console.log(e)
    let params = e.currentTarget.dataset.params;
    wx.navigateTo({
      url: 'invoicelist/invoicelist?id=' + params.id,
    })
  },
})