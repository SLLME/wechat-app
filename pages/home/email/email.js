// pages/home/email/email.js
const moment = require("../../../utils/moment")
import { listTicketFilesAll } from "../../../api/folder/folder"
import { emailList, emailAdd, dealLoadEmail, emailRemove, emailEdit, emailGetInfo } from "../../../api/email/email";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    error: null,

    emailList: [],
    buttons: [{ text: '取消' }, { text: '确定' }],
    addShow: false,
    addPopTitle: "",
    addForm: {
      id: "",
      emailAccount: "",
      emailPwd: ""
    },

    importShow: false,
    importForm: {
      importDateBegin: "",
      importDateEnd: "",
      fileId: "",
      account: null,
      pwd: null
    },
    folderIndex: 0,
    folderArr: ["默认票夹", "娃哈哈", "旺旺"],
    folderOptions: [
      { name: '默认票夹', value: 'default' },
      { name: '娃哈哈', value: 'wahh' },
      { name: '旺旺', value: 'ww' }
    ],
  },
  /** 获取邮箱列表 */
  getList() {
    wx.showLoading({
      title: '正在加载', mask: true
    })
    emailList().then(res => {
      wx.hideLoading();
      if (res.code == 200) {
        this.setData({
          emailList: res.rows
        })
      } else {
        app.myShowToast(res.msg);
      }
    })
  },
  /** 修改邮箱信息 */
  handleEditEmail(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    //TODO 通过index拿到对应id，请求邮箱详情接口
    let currItem = this.data.emailList[index];

    this.setData({
      addShow: true,
      addPopTitle: "编辑邮箱",
      addForm: {
        id: currItem.id,
        emailAccount: currItem.emailAccount,
        emailPwd: currItem.emailPwd
      }
    })
  },

  /** 导入发票按钮 */
  importInvoice(e) {
    let index = e.currentTarget.dataset.index;;
    let currItem = this.data.emailList[index];
    this.setData({
      importShow: true,
      ['importForm.account']: currItem.emailAccount,
      ['importForm.pwd']: currItem.emailPwd
    })
  },
  /** 导入发票弹出框中日期改变 */
  importDateChange(e) {
    console.log(e);
    let value = e.detail.value;
    let field = e.currentTarget.dataset.field;
    this.setData({
      [`importForm.${field}`]: value,
    })
  },
  /** 导入发票弹出框中票夹改变 */
  folderChange(e){
    console.log(e);
    let value = e.detail.value; //下标值
    this.setData({
      [`importForm.fileId`]: this.data.folderOptions[value].id,
    })
  },
  /** 导入发票提交 */
  importSubmit(e) {
    let that = this;
    if (e.detail.index == 0) {
      that.setData({
        importShow: false
      })
    } else {
      that.setData({
        importShow: false
      })
      let params = that.data.importForm;
      if(!params.fileId){
        params.fileId = that.data.folderOptions[that.data.folderIndex];
      }
      /** 结束日期加1 */
      params.importDateEnd = moment(params.importDateEnd).add(1, "days").format("YYYY-MM-DD");
      
      wx.showLoading({
        title: '正在导入',mask: true
      })
      dealLoadEmail(params).then(res => {
        wx.hideLoading();
        app.myShowToast(res.msg);
      }).catch(() => {
        wx.hideLoading();
      })
    }
  },
  /** 添加邮箱按钮 */
  submitManualForm() {
    this.setData({
      addPopTitle: "新增邮箱",
      addShow: true,
    })
    if (this.selectComponent(".my-swipe-cell")) {
      this.selectComponent(".my-swipe-cell").close();
    }
  },
  formFieldChange(e) {
    let field = e.target.dataset.field,
      val = e.detail.value;
    this.setData({
      [`addForm.${field}`]: val
    })
  },
  /** 新增或修改 */
  addSubmit(e) {
    let that = this;
    if (e.detail.index == 0) {
      that.setData({
        addShow: false
      })
    } else {
      let params = that.data.addForm;
      if (params.emailAccount == "") {
        app.myShowToast("邮箱账号不能为空");
        return;
      }
      if (params.emailPwd == "") {
        app.myShowToast("授权密码不能为空");
        return;
      }
      that.setData({
        addShow: false
      })
      if (params.id) {
        wx.showLoading({
          title: '正在修改', mask: true
        })
        emailEdit(params).then(res => {
          wx.hideLoading()
          if (res.code == 200) {
            app.myShowToast(res.msg);
            that.getList();
          } else {
            that.setData({
              error: res.msg
            })
          }
        }).catch(() => {
          wx.hideLoading()
        })
      } else {
        wx.showLoading({
          title: '正在添加', mask: true
        })
        emailAdd(params).then(res => {
          wx.hideLoading()
          if (res.code == 200) {
            app.myShowToast(res.msg);
            this.getList();
          } else {
            app.myShowToast(res.msg);
          }
        }).catch(() => {
          wx.hideLoading()
        })
      }
    }
  },

  /** 删除邮箱 */
  handleDeleteEmail(e) {
    console.log(e);
    let that = this;
    let currItem = that.data.emailList[e.currentTarget.dataset.index];
    wx.showModal({
      content: '确定删除吗？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在删除',mask: true
          })
          let ids = [];
          ids.push(currItem.id);
          emailRemove(ids).then(res => {
            wx.hideLoading();
            if (res.code == 200) {
              app.myShowToast("删除成功");
              that.getList();
            } else {
              that.setData({
                error: res.msg
              })
            }
          })
        }
      }
    })
  },
  onCloseCell(event) {
    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        instance.close();
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let currMonthVal = (new Date().getFullYear()) + "-" + ((new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1));
    this.setData({
      [`importForm.importDateBegin`]: moment(currMonthVal).startOf('month').format("YYYY-MM-DD"),
      [`importForm.importDateEnd`]: moment(currMonthVal).endOf('month').format("YYYY-MM-DD"),
    })
    // console.log(moment(moment(currMonthVal).endOf('month').format("YYYY-MM-DD")).add(1, "days").format("YYYY-MM-DD"));

    /** 获取当前用户下所属票夹 */
    listTicketFilesAll().then(res => {
      if (res.code == 200) {
        let data = res.rows,
          folderArr = [],folderOptions = [];
        for (let i = 0, l = data.length; i < l; i++) {
          folderOptions.push({
            name: data[i].fileName,
            value: data[i].id,
          })
          folderArr.push(data[i].fileName);
        }
        this.setData({
          folderArr: folderArr,
          folderOptions: folderOptions
        })
      }
    })
    this.getList();
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