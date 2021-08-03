// pages/home/manual/manual.js
const utils = require("../../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /** 表单提交失败提示 */
    error: "",
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
              if(!(/^(\d{10}|\d{12})$/.test(value))){
                return rule.message;
              }
            }, 
            message: "请输入正确的发票代码"
          }
          // { pattern: /^(\d{10}|\d{12})$/, message: "请输入正确的发票代码", trigger: "onBlur" }
        ]
      },
      {
        name: "invNo",
        rules: [
          {required: true, message: "请填写发票代码"},
          {
            validator: function (rule, value, param, models) {
              if(!(/^\d{8}$/.test(value))){
                return rule.message;
              }
            },
            message: '请输入正确的发票号码'
          }
          // { pattern: /^\d{8}$/, message: "请输入正确的发票号码", trigger: "onBlur" },
        ]
      },
      {
        name: "invDate", 
        rules: [
          { required: true, message: "开票日期不能为空"},
        ]
      },
      {
        name: "totalAmountWithoutTax",
        rules: [
          { required: true, message: "不含税金额不能为空"},
        ]
      },
      {
        name: "checkCode",
        rules: [
          { required: true, message: "校验码不能为空"},
          {
            validator: function (rule, value, param, models) {
              if(!(/^\d{0,6}$/.test(value))){
                return rule.message;
              }
            }
          }
          // { pattern: /^\d{0,10}$/, message: "请输入正确的校验码", trigger: "onBlur" },
        ]
      },
      {
        name: "totalAmount",
        rules: [
          { required: true, message: "价税合计不能为空"},
        ]
      },
      {
        name: "files",
        rules: [
          { required: true, message: "请选择要上传的文件" }
        ]
      }
    ],
    folderIndex: 0,
    folderArr: ["默认票夹", "娃哈哈", "旺旺"],
    folderOption: [
      { name: '默认票夹', value: 'default' },
      { name: '娃哈哈', value: 'wahh' },
      { name: '旺旺', value: 'ww' }
    ],
    files: []
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
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          [`formData.files`]: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  /** 预览图片 */
  previewImage(e){
    let index = e.currentTarget.dataset.index;
    let currFile = [];
    currFile.push(this.data.formData.files[index]);
    wx.previewImage({
      urls: currFile,
    })
  },
  /** 表单提交 */
  submitManualForm() {
    this.selectComponent('#manualForm').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if(valid){
        
      }else{
        let firstError = errors[0].message;
        this.setData({
          error: firstError
        })
      }
    })
  }
})