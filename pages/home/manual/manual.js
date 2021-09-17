// pages/home/manual/manual.js
const utils = require("../../../utils/util")
import { listTicketFilesAll } from "../../../api/folder/folder.js"
import { getDicts } from "../../../api/util"
import { ocrDiscernFile, saveTicket } from "../../../api/discern/discern"

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /** 表单提交失败提示 */
    error: "",
    currDate: null,
    formData: {

    },
    // invDate: "2021-06-21",
    rules: [
      {
        name: "invCode",
        rules: [
          { required: true, message: "请填写发票代码" },
          {
            validator: function (rule, value, param, models) {
              if (!(/^(\d{10}|\d{12})$/.test(value))) {
                return rule.message;
              }
            },
            message: "请输入正确的发票代码"
          }
          // { pattern: /^(\d{10}|\d{12})$/, message: "请输入正确的发票代码", trigger: "onBlur" }
        ]
      },
      // {
      //   name: "invNo",
      //   rules: [
      //     { required: true, message: "请填写发票代码" },
      //     {
      //       validator: function (rule, value, param, models) {
      //         if (!(/^\d{8}$/.test(value))) {
      //           return rule.message;
      //         }
      //       },
      //       message: '请输入正确的发票号码'
      //     }
      //     // { pattern: /^\d{8}$/, message: "请输入正确的发票号码", trigger: "onBlur" },
      //   ]
      // },
      // {
      //   name: "invDate",
      //   rules: [
      //     { required: true, message: "开票日期不能为空" },
      //   ]
      // },
      // {
      //   name: "totalAmountWithoutTax",
      //   rules: [
      //     { required: true, message: "不含税金额不能为空" },
      //   ]
      // },
      // {
      //   name: "checkCode",
      //   rules: [
      //     { required: true, message: "校验码不能为空" },
      //     {
      //       validator: function (rule, value, param, models) {
      //         if (!(/^\d{0,6}$/.test(value))) {
      //           return rule.message;
      //         }
      //       }
      //     }
      //     // { pattern: /^\d{0,10}$/, message: "请输入正确的校验码", trigger: "onBlur" },
      //   ]
      // },
      // {
      //   name: "totalAmount",
      //   rules: [
      //     { required: true, message: "价税合计不能为空" },
      //   ]
      // },
      // {
      //   name: "files",
      //   rules: [
      //     { required: true, message: "请选择要上传的文件" }
      //   ]
      // }
    ],
    folderIndex: 0,
    folderArr: ["默认票夹", "娃哈哈", "旺旺"],
    folderOptions: [
      { name: '默认票夹', value: 'default' },
      { name: '娃哈哈', value: 'wahh' },
      { name: '旺旺', value: 'ww' }
    ],
    
    files: [],
    baseArrs: [],
    suffixArrs: [],
    ocrDiscernData: {},

    invTypeIndex: 0,
    invTypeArr: ["专票", "普票", "出租车发票"],
    invTypeOptions: [],
    zzsTypeArr: [],
    inputField: {
      OrRequired: [0, 1, 1, 1, 0],
      field: ["invCode", "invNo", "totalAmount", "invDate", "location"],
      name: ["发票代码", "发票号码", "金额", "日期", "发票所在地"]
    },

    invJointOptions: [],
    invJointArr: [],
    formNameIndex: 0,

    activeNames: [],
  },
  /** 折叠面板 */
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  /** 票据类型改变 */
  invTypeChange(e) {
    let index = parseInt(e.detail.value);
    let invType = this.data.invTypeOptions[index].dictValue;
    this.setData({
      invTypeIndex: index
    })
    this.assembleForm(invType);
  },
  /** 组装表单 */
  assembleForm(invType){
    let elData = utils.getElementFromType(invType);
    let newForm = {};
    for(let i=0,l=elData.field.length; i<l; i++){
      newForm[elData.field[i]] = null;
    }
    if(this.data.zzsTypeArr.includes(invType)){
      newForm.sellName = null;
      newForm.sellTaxNo = null;
      newForm.sellAddrTel = null;
      newForm.sellBankAccount = null;
      newForm.buyName = null;
      newForm.buyTaxNo = null;
      newForm.buyAddrTel = null;
      newForm.buyBankAccount = null;
      newForm.isVAT = true
    }
    newForm.invDate = this.data.currDate;
    this.setData({
      inputField: elData,
      formData: newForm
    })
    this.selectComponent('#manualForm').clearValidate();
  },
  formFieldChange(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  /** 开票日期改变 */
  invDateChange(e) {
    // this.setData({
    //   invDate: e.detail.value,
    // })
    this.setData({
      [`formData.invDate`]: e.detail.value
    })
    console.log(e);
  },
  /** 发票联次改变 */
  formNameChange(e){
    this.setData({
      formNameIndex: e.detail.value
    })
  },
  /** 发票夹改变 */
  folderChange(e) {
    console.log(e);
    this.setData({
      folderIndex: e.detail.value,
    })
  },
  /** 选择文件 */
  selectFile() {
    var that = this;
    wx.yx.chooseImage({
      count: 1,
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let filePath = [];
        let fsm = wx.getFileSystemManager()
        let oldBaseArrs = [],
            suffixArrs = [];
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
          files: [].concat(filePath),
          baseArrs: oldBaseArrs,
          suffixArrs: suffixArrs
        });
        wx.showLoading({
          title: '正在上传',mask: true
        })
        let formData = {};
        formData.baseArray = oldBaseArrs;
        ocrDiscernFile(formData).then(res=>{
          wx.hideLoading();
          if(res.code == 200){
            let data = res.data;
            /** 判断识别返回的是结果还是url */
            if(Object.prototype.toString.call(data) == "[object Array]") {
              let ocrResult = data[0];
              let ocrDataData = JSON.parse(ocrResult.data);
              Object.assign(ocrResult, ocrDataData);
              delete ocrResult.data
              if(ocrResult.checkCode){
                ocrResult.checkCode = ocrResult.checkCode.substr(ocrResult.checkCode.length - 6);
              }
              if(ocrResult.type == that.data.invTypeOptions[that.data.invTypeIndex].dictValue){
                ocrResult.isVAT = that.data.formData.isVAT;
                that.setData({
                  formData: ocrResult
                })
              }
            }else{
              that.setData({
                [`formData.fileUrl`]: data
              })
            }
          }else{
            that.setData({
              error: res.msg
            })
          }
        }).catch(()=>{
          wx.hideLoading();
        })

      }
    })
  },
  /** 预览图片 */
  previewImage(e) {
    let index = e.currentTarget.dataset.index;
    let currFile = [];
    currFile.push(this.data.formData.files[index]);
    wx.previewImage({
      urls: currFile,
    })
  },
  /** 表单提交 */
  submitManualForm() {
    let that = this;
    that.selectComponent('#manualForm').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (valid) {
        let newForm = that.data.formData;
        newForm.data = JSON.stringify(newForm);
        newForm.dataSource = "10";
        let type = newForm.invType;
        if (type == "08" || type == "03" || type == "01" || type == "02") {  //专票
          newForm.other = newForm.totalWithoutTaxMoney;
        }else if (type == "15"){
          newForm.other = newForm.totalAmount;
        }else if(type == "04" || type == "10" || type == "11"){ //普票
          newForm.other = newForm.checkCode;
        }
        newForm.fileId = that.data.folderOptions[that.data.folderIndex].id;
        newForm.formName = that.data.invJointOptions[that.data.formNameIndex].dictValue;
        wx.showLoading({
          title: '正在保存',mask: true
        })
        saveTicket(newForm).then(res=>{
          wx.hideLoading();
          if(res.code == 200){
            app.myShowToast("保存成功");
            let fileId = newForm.fileId;
            //TODO 保存成功 携带当前发票夹ID 跳转到发票列表
          }else{
            that.setData({
              error: res.msg
            })
          }
        }).catch(()=>{
          wx.hideLoading();
        })
      } else {
        let firstError = errors[0].message;
        that.setData({
          error: firstError
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = new Date();
    this.setData({
      currDate: date.getFullYear() + "-" + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : ("0" + (date.getMonth() + 1))) + "-"
        + (date.getDate() > 9 ? date.getDate() : "0" + date.getDate())
    })

    Promise.all([getDicts("income_check_inv_type"), getDicts("other_ticket")]).then(res => {
      let data = res[0].data;
      let zzsTypeArr = [];
      let invTypeArr = [];
      for (let i = 0, l = data.length; i < l; i++) {
        zzsTypeArr.push(data[i].dictValue);
      }
      let invTypeOptions = [];
      invTypeOptions = invTypeOptions.concat(res[0]['data'], res[1]['data']);
      for (let i = 0, l = invTypeOptions.length; i < l; i++) {
        invTypeArr.push(invTypeOptions[i].dictLabel);
      }
      this.setData({
        invTypeOptions: invTypeOptions,
        invTypeArr: invTypeArr,
        zzsTypeArr: zzsTypeArr,
      })
      this.assembleForm(zzsTypeArr[0]);
    }).catch(() => { })

    getDicts("inv_joint").then(response => {
      let data = response.data,
        invJointArr = [];
      for (let i = 0, l = data.length; i < l; i++) {
        invJointArr.push(data[i].dictLabel);
      }
      this.setData({
        invJointArr: invJointArr,
        invJointOptions: response.data
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
    })

  },

})