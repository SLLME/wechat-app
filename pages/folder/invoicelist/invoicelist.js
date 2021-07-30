// pages/folder/invoicelist/invoicelist.js
const request = require("../../../utils/request")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    folderListPopupShow: false,
    currFolder: 0,
    folderArr: [
      { name: '默认发票夹一', value: 'default1' },
      { name: '默认发票夹二', value: 'default2' },
    ],
    invoiceList: {
      "default" :[
        {
          invTypeLabel: "测试发票",
          buyName: "盘古生物",
          sellName: "今天在下雨",
          invDate: "2021-06-01",
          totalAmount: "99.99",
          selected: false,
        },
      ]
    },
    zzsTypeArr: [],

    touchStartTime: null,
    touchEndTime: null,
    touchTimer: null,

    bottomOperationShow: false,
    /** 选中发票数组下标 */
    selectedInvoiceArr: [],
  },
  /** 展示侧边导航栏 */
  showFolderList() {
    this.setData({
      folderListPopupShow: true,
    })
  },
  onClose() {
    this.setData({
      folderListPopupShow: false,
    })
  },
  /** 侧边导航栏改变 */
  folderChange(e){
    this.setData({
      folderListPopupShow: false,
      selectedInvoiceArr: []
    })
  },

  handleTouchStart(){
    let that = this;
    this.setData({
      touchStartTime: new Date().getTime(),
      touchTimer: setTimeout(()=>{
        /** 震动反馈 */
        wx.vibrateShort({
          type: 'type',
          success: (res) => {
            that.setData({
              bottomOperationShow: true
            })
          }
        })
      }, 750)
    })
  },
  handleTouchEnd(){
    this.setData({
      touchEndTime: new Date().getTime(),
    })
    if(this.data.touchEndTime - this.data.touchStartTime < 1000){
      clearTimeout(this.data.touchTimer);
    }
  },
  /** 选中/取消 */
  selectInvoice(e){
    let index = e.currentTarget.dataset.index;
    if(!this.data.bottomOperationShow){
      //TODO 跳到详情
    }else{
      let bool = this.data.invoiceList.default[index].selected;
      this.setData({
        [`invoiceList.default[${index}].selected`]: !bool,
      })
      let arr = this.data.selectedInvoiceArr;
      if(!bool){
        arr.push(index);
      }else{
        arr = arr.filter((curr, _i, _arr)=>{
          if(curr == index){
            return false;
          }
          return true;
        })
      }
      this.setData({
        selectedInvoiceArr: arr
      })
    }
  },
  closeBottomOperation(){
    this.setData({
      bottomOperationShow: false,
    })
    this.clearSelected();
  },
  /** 清空选中 */
  clearSelected(){
    let arr = this.data.invoiceList.default.map((curr, _index, _arr)=>{
      curr.selected = false;
      return curr;
    })
    this.setData({
      [`invoiceList.default`]: arr,
      selectedInvoiceArr: [],
    })
  },
  /** 移动到按钮 */
  transferInvoice(){

  },
  /** 删除按钮 */
  deleteInvoice(){

  },
  /** 查验 */
  handleCheckInvoice(){

  },
  /** 全选 */
  allCheckedChange(){

  },

  /** 是否属于增值税 */
  isCheckEnableTicket(type){
    if(type){
      return this.data.zzsTypeArr.includes(type);
    }
    return false;
  },
  /** 增值税发票缩写 */
  abbrInvType(type){
    switch (type) {
      case "01":
        return {
          name: '专'}
      case "04":
        return {
          name: '普'}
      case "10":
        return {
          name: "电"}
      case "08":
        return {
          name: "电专"}
      case "03":
        return {
          name: "机"}
      case "11":
        return {
          name: "卷"}
      case "14":
        return {
          name: '通'}
      case "15":
        return {
          name: "二手"}
    }
  },
})