// pages/home/fileanalysis/fileanalysis.js
const utils = require("../../../utils/util")
import { listTicketFilesAll } from "../../../api/folder/folder"
import { getDicts } from "../../../api/util"
import { saveTicket } from "../../../api/discern/discern"
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    error: null,

    uploadResult: [],
    swiperIndex: 0,
    navTabs: [
    ],
    imageInvoiceForm: [
    ],
    folderIndexArr: [],
    folderArr: [],
    folderOptions: [
    ],

    invTypeOptions: [],
    otherInvTypeOptions: [],
    zzsTypeArr: [],
    invJointArr: [],
    invJointOptions: [],
    formNameIndexArr: [],

    activeNames: [],
    operationIndex: 0,
    successSave: 0,
    failSave: 0,
  },
  /** 改变swiper-item */
  swiperChange(e) {
    this.setData({
      swiperIndex: e.detail.current,
    })
  },
  /** 删除滑块视图 */
  swipeDelete(e) {
    if (this.data.navTabs.length <= 1) {
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
  analysisFormSubmit() {
    wx.showLoading({
      mask: true,
      title: '正在保存',
    })
    this.oneByOneSaveTicket();
  },
  oneByOneSaveTicket(){
    let that = this;
    if(that.data.operationIndex < that.data.imageInvoiceForm.length){
      let currSaveParam = that.data.imageInvoiceForm[that.data.operationIndex];
      if(currSaveParam.pwdCode){
        currSaveParam.pwdCode = encodeURI(currSaveParam.pwdCode);
      }
      currSaveParam.totalAmount = currSaveParam["totalMoney"];
      delete currSaveParam.data;
      currSaveParam.data = JSON.stringify(currSaveParam);
      let type = currSaveParam.invType;
      if (type == "08" || type == "03" || type == "01" || type == "02") {  //专票
        currSaveParam.other = currSaveParam.totalWithoutTaxMoney;
      }else if (type == "15"){
        currSaveParam.other = currSaveParam.totalAmount;
      }else if(type == "04" || type == "10" || type == "11"){ //普票
        currSaveParam.other = currSaveParam.checkCode;
      }
      currSaveParam.dataSource = "11";
      currSaveParam.fileUrl = currSaveParam.fileUrl;
      /** 发票联次 */
      
      currSaveParam.formName = that.data.invJointOptions[that.data.formNameIndexArr[that.data.operationIndex]].value;
      currSaveParam.fileId = that.data.folderOptions[that.data.folderIndexArr[that.data.operationIndex]].value;
      that.setData({
        operationIndex: that.data.operationIndex + 1,
      })
      saveTicket(currSaveParam).then(res=>{
        if(res.code == 200){
          that.setData({
            successSave: that.data.successSave + 1
          })
        }else{
          that.setData({
            failSave: that.data.failSave + 1,
            error: res.msg
          })
        }
        that.oneByOneSaveTicket();
      }).catch(()=>{
        that.oneByOneSaveTicket();
      })
    }else{
      wx.hideLoading();
      let tipMsg = "本次保存成功" + that.data.successSave + "张";
      if(that.data.failSave != 0){
        tipMsg += ",保存失败" + that.data.failSave + "张";
      }
      app.myShowToast(tipMsg);
      this.setData({
        operationIndex: 0,
        successSave: 0,
        failSave: 0,
      })
      wx.navigateBack({
        delta: 1
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    getDicts("income_check_inv_type").then(response => {
      let data = response.data,
        zzsTypeArr = [];
      for (let i = 0, l = data.length; i < l; i++) {
        zzsTypeArr.push(data[i].dictValue);
      }
      this.setData({
        invTypeOptions: data,
        zzsTypeArr: zzsTypeArr
      })
    });
    getDicts("other_ticket").then(response => {
      this.setData({
        otherInvTypeOptions: response.data
      })
    });
    getDicts("inv_joint").then(response => {
      let data = response.data,
        invJointArr = [],
        invJointOptions = [];
      for (let i = 0, l = data.length; i < l; i++) {
        invJointOptions.push({
          name: data[i].dictLabel,
          value: data[i].dictValue
        })
        invJointArr.push(data[i].dictLabel);
      }
      this.setData({
        invJointArr: invJointArr,
        invJointOptions: invJointOptions
      })
    })
    /** 获取当前用户下所属票夹 */
    listTicketFilesAll().then(response => {
      if (response.code == 200) {
        let data = response.rows,
          folderArr = [], folderOptions = [];
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

      let res = app.globalData.discernResult;
      let resDataArr = [];
      let i, l;
      for (i = 0, l = res.length; i < l; i++) {
        resDataArr = resDataArr.concat(res[i].data);
      }
      let navTabs = [];
      let imageInvoiceForm = [];
      for (i = 0, l = resDataArr.length; i < l; i++) {
        navTabs.push({
          type: resDataArr[i].invType,
          el: utils.getElementFromType(resDataArr[i].invType),
          title: this.invTypeFormat(resDataArr[i].invType),
          name: "" + i
        })
        let currResDataItem = utils.deepClone(resDataArr[i]);
        currResDataItem = Object.assign(currResDataItem, JSON.parse(currResDataItem['data']));
        if(currResDataItem.checkCode){
          currResDataItem.checkCode = currResDataItem.checkCode.slice(-6);
        }
        // currResDataItem.folder = this.data.folderOptions[0].name;
        // currResDataItem.fileId = this.data.folderOptions[0].value;
        // currResDataItem.formName = this.data.invJointOptions[0].value;
        currResDataItem.isVAT = this.data.zzsTypeArr.includes(resDataArr[i].invType);
        imageInvoiceForm.push(currResDataItem);
      }

      this.setData({
        uploadResult: resDataArr,
        navTabs: navTabs,
        imageInvoiceForm: imageInvoiceForm,
        folderIndexArr: (new Array(res.length)).fill(0),
        formNameIndexArr: (new Array(res.length)).fill(0),
      })
    })
  },

  // 发票类型字典翻译
  invTypeFormat(type) {
    let mergeInvType = this.data.otherInvTypeOptions.concat(this.data.invTypeOptions);
    return utils.selectDictLabel(mergeInvType, type);
  },

  /** 折叠面板 */
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  /** 输入框改变 */
  formFieldChange(e){
    let index = e.currentTarget.dataset.index,
    value = e.detail.value,
    field = e.currentTarget.dataset.field;
    this.setData({
      [`imageInvoiceForm[${index}].${field}`]: value
    })
  },
  /** 开票日期改变 */
  invDateChange(e){
    let index = e.currentTarget.dataset.index,
    value = e.detail.value;
    this.setData({
      [`imageInvoiceForm[${index}].invDate`]: value
    })
  },
  /** 发票联次改变 */
  formNameChange(e){
    let index = e.currentTarget.dataset.index,
        value = e.detail.value; //下标值
    this.setData({
      [`formNameIndexArr[${index}]`]: value
    })
  },
  /** 所属票夹改变 */
  folderChange(e){
    let index = e.currentTarget.dataset.index,
        value = e.detail.value; //下标值
    this.setData({
      [`folderIndexArr[${index}]`]: value
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