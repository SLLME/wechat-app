// pages/folder/folder.js
import { listTicketFilesAll, insertTicketFile, updateTicketFile, deleteTicketFile, selectInvInfo, checkInvStatus } from "../../api/folder/folder.js"

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    folderIcon: "../../images/folder/folder.png",
    folderArr: [

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
    wx.showLoading({
      title: '加载中',
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
    this.getList();
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
  getList() {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    listTicketFilesAll().then(res => {
      wx.hideLoading();
      if (res.code == 200) {
        let folderArr = res.rows;
        for (let i = 0, l = folderArr.length; i < l; i++) {
          folderArr[i].checked = false;
        }
        that.setData({
          selectedFolderArr: [], /** 重新加载的时候清空选择数组 */
          folderArr: folderArr
        })
      }
    }).catch(() => { })
  },

  folderSelect(e) {
    let index = e.currentTarget.dataset.index;
    if (index != 0) {
      let selectedFolderArr = this.data.selectedFolderArr;
      let checked = !this.data.folderArr[index].checked;
      if (checked) {
        selectedFolderArr.push(index);
        selectedFolderArr = [...new Set(selectedFolderArr)];
      } else {
        selectedFolderArr = selectedFolderArr.filter((curr, currIndex, arr) => {
          if (index == curr) {
            return false;
          }
          return true;
        })
      }
      /** 选择多个文件夹之后只能删除，不能重命名 */
      if(selectedFolderArr.length > 1){
        this.setData({
          [`operationRadioItems[0].disabled`]: true
        })
      }else{
        this.setData({
          [`operationRadioItems[0].disabled`]: false
        })
      }
      this.setData({
        [`folderArr[${index}].checked`]: !this.data.folderArr[index].checked,
        selectedFolderArr: selectedFolderArr
      })
    }
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
      let folderName = this.data.folderName;
      if (folderName == "") {
        this.setData({
          error: "发票夹名字不能为空"
        })
      } else {
        let that = this;
        let duplicate = false;
        let folderArr = that.data.folderArr;
        for (let i = 0, l = folderArr.length; i < l; i++) {
          if (folderArr[i].fileName == folderName) {
            duplicate = true;
            break;
          }
        }
        if (duplicate) {
          app.myShowToast("不允许存在相同的发票夹名字");
          return;
        }
        /** 新增 */
        if (that.data.addDialogShow) {
          let params = {
            fileName: folderName
          }
          wx.showLoading({
            title: '正在新增', mask: true
          })
          insertTicketFile(params).then(res => {
            wx.hideLoading();
            if (res.code == 200) {
              that.getList();
              app.myShowToast("发票夹新增成功");
            } else {
              app.myShowToast(res.msg);
            }
          })
        } else { /** 重命名 */
          let params = {
            id: that.data.folderArr[that.data.selectedFolderArr[0]].id,
            fileName: that.data.folderName
          }
          wx.showLoading({
            title: '正在修改', mask: true
          })
          updateTicketFile(params).then(res => {
            wx.hideLoading();
            if (res.code == 200) {
              app.myShowToast("发票夹名字修改成功");
              that.getList();
            } else {
              app.myShowToast(res.msg);
            }
          })
        }
        that.setData({
          addDialogShow: false,
          renameDialogShow: false,
          folderName: ""
        })
      }
    }

  },
  /** 编辑按钮 */
  operationFolder() {
    if (this.data.selectedFolderArr.length == 0) {
      app.myShowToast("请先选择发票夹再操作");
      return;
    }
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
    let that = this;
    if (e.detail.index == 0) {
      that.setData({
        operationDialogShow: false
      })
    } else {
      that.setData({
        operationDialogShow: false
      })
      /** 重命名 */
      if (that.data.operationRadio == '1') {
        that.setData({
          renameDialogShow: true,
          dialogTitle: "重命名",
          folderName: that.data.folderArr[that.data.selectedFolderArr[0]].fileName
        })
      } else { /** 删除 */
        /** 删除前校验 */
        let ids = [];
        for (let i = 0, l = that.data.selectedFolderArr.length; i < l; i++) {
          ids.push(that.data.folderArr[that.data.selectedFolderArr[i]].id);
        }
        checkInvStatus(ids).then(response => {
          wx.showModal({
            content: response.msg,
          }).then(() => {
            wx.showLoading({
              title: '正在删除', mask: true
            })
            deleteTicketFile(ids).then(res => {
              wx.hideLoading();
              if (res.code == 200) {
                app.myShowToast("删除成功");
                that.getList();
              } else {
                app.myShowToast(res.msg);
              }
            })
          })
        })
      }
    }
  },

  jumpInvoiceList(e) {
    console.log(e)
    let params = e.currentTarget.dataset.params;
    wx.navigateTo({
      url: 'invoicelist/invoicelist?id=' + params.id,
    })
  },
})