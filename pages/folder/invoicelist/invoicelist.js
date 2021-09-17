// pages/folder/invoicelist/invoicelist.js
const request = require("../../../utils/request")
const utils = require("../../../utils/util")

import { getDicts } from "../../../api/util"
import { listTicketFilesAll } from "../../../api/folder/folder"
import { selectInvInfoBySearch, deleteInfoByIds, changeInvInfo, checkInvoice } from "../../../api/folder/invoice"
import { deptList, currentInfo } from "../../../api/dept/dept"

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    error: "",
    /** 每个发票夹都有对应的页码 */
    pageNum: [],
    pageSize: 10,
    refreshing: false,
    finished: true,
    searchValue: "",
    // inputCursor: "",
    /** 防抖函数 */
    debounceSearch: null,

    folderListPopupShow: false,
    currFolder: 0,
    folderRadio: null,
    folderArr: [
      { name: '默认发票夹一', value: 'default' },
      { name: '默认发票夹二', value: 'default2' },
    ],
    invoiceList: {
      "default": [
        {
          invTypeLabel: "测试发票",
          buyName: "盘古生物",
          sellName: "今天在下雨",
          invDate: "2021-06-01",
          totalAmount: "99.99",
          selected: false,
        }, {
          invTypeLabel: "测试发票",
          buyName: "盘古生物",
          sellName: "今天在下雨",
          invDate: "2021-06-01",
          totalAmount: "99.99",
          selected: false,
        }, {
          invTypeLabel: "测试发票",
          buyName: "盘古生物",
          sellName: "今天在下雨",
          invDate: "2021-06-01",
          totalAmount: "99.99",
          selected: false,
        }, {
          invTypeLabel: "测试发票",
          buyName: "盘古生物",
          sellName: "今天在下雨",
          invDate: "2021-06-01",
          totalAmount: "99.99",
          selected: false,
        }, {
          invTypeLabel: "测试发票",
          buyName: "盘古生物",
          sellName: "今天在下雨",
          invDate: "2021-06-01",
          totalAmount: "99.99",
          selected: false,
        }, {
          invTypeLabel: "测试发票",
          buyName: "盘古生物",
          sellName: "今天在下雨",
          invDate: "2021-06-01",
          totalAmount: "99.99",
          selected: false,
        }, {
          invTypeLabel: "测试发票",
          buyName: "盘古生物",
          sellName: "今天在下雨",
          invDate: "2021-06-01",
          totalAmount: "99.99",
          selected: false,
        }, {
          invTypeLabel: "测试发票",
          buyName: "盘古生物",
          sellName: "今天在下雨",
          invDate: "2021-06-01",
          totalAmount: "99.99",
          selected: false,
        }, {
          invTypeLabel: "测试发票",
          buyName: "盘古生物",
          sellName: "今天在下雨",
          invDate: "2021-06-01",
          totalAmount: "99.99",
          selected: false,
        }, {
          invTypeLabel: "测试发票",
          buyName: "盘古生物",
          sellName: "今天在下雨",
          invDate: "2021-06-01",
          totalAmount: "99.99",
          selected: false,
        }, {
          invTypeLabel: "测试发票",
          buyName: "盘古生物",
          sellName: "今天在下雨",
          invDate: "2021-06-01",
          totalAmount: "99.99",
          selected: false,
        }, {
          invTypeLabel: "测试发票",
          buyName: "盘古生物",
          sellName: "今天在下雨",
          invDate: "2021-06-01",
          totalAmount: "99.99",
          selected: false,
        }, {
          invTypeLabel: "测试发票",
          buyName: "盘古生物",
          sellName: "今天在下雨",
          invDate: "2021-06-01",
          totalAmount: "99.99",
          selected: false,
        }, {
          invTypeLabel: "测试发票",
          buyName: "盘古生物",
          sellName: "今天在下雨",
          invDate: "2021-06-01",
          totalAmount: "99.99",
          selected: false,
        }, {
          invTypeLabel: "测试发票",
          buyName: "盘古生物",
          sellName: "今天在下雨",
          invDate: "2021-06-01",
          totalAmount: "99.99",
          selected: false,
        }, {
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
    invTypeOptions: [],

    touchStartTime: null,
    touchEndTime: null,
    touchTimer: null,

    bottomOperationShow: false,
    /** 选中发票数组下标 */
    selectedInvoiceArr: [],
    allChecked: false,

    buttons: [{ text: '取消' }, { text: '确定' }],
    /** 转移发票相关 */
    transferDialogShow: false,
    transferDialogSelectFolder: null,
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
  folderChange(e) {
    let index = e.detail;
    this.setData({
      folderListPopupShow: false,
      selectedInvoiceArr: [],
      currFolder: index,
      folderRadio: this.data.folderArr[index].value
    })
  },

  handleTouchStart() {
    let that = this;
    this.setData({
      touchStartTime: new Date().getTime(),
      touchTimer: setTimeout(() => {
        /** 震动反馈 */
        wx.vibrateShort({
          type: 'heavy',
          complete: (res) => {
            that.setData({
              bottomOperationShow: true
            })
          }
        })
      }, 750)
    })
  },
  handleTouchEnd() {
    this.setData({
      touchEndTime: new Date().getTime(),
    })
    if (this.data.touchEndTime - this.data.touchStartTime < 1000) {
      clearTimeout(this.data.touchTimer);
    }
  },
  /** 选中/取消 */
  selectInvoice(e) {
    if (!this.data.refreshing) {
      let index = e.currentTarget.dataset.index;
      if (!this.data.bottomOperationShow) {
        //TODO 跳到详情
        /**
         * 当前发票id， 当前发票所在发票列表下标，发票id数组
         */
        let id = this.data.invoiceList[this.data.folderArr[this.data.currFolder].value][index].id,
          invoiceIndex = index + 1,
          invoiceIdArr = this.data.invoiceList[this.data.folderArr[this.data.currFolder].value].reduce((total, curr, i, arr) => {
            total.push(curr.id);
            return total
          }, [])
        let params = {
          id,
          invoiceIndex,
          invoiceIdArr
        }
        wx.navigateTo({
          url: './../../home/detail/detail?params=' + JSON.stringify(params),
        })
      } else {
        let folderRadio = this.data.folderRadio;
        let bool = this.data.invoiceList[folderRadio][index].selected;
        let arr = this.data.selectedInvoiceArr;
        if (!bool) {
          arr.push(index);
        } else {
          arr = arr.filter((curr, _i, _arr) => {
            if (curr == index) {
              return false;
            }
            return true;
          })
        }
        this.setData({
          [`invoiceList.${folderRadio}[${index}].selected`]: !bool,
          selectedInvoiceArr: arr
        })
        if (arr.length == this.data.invoiceList[folderRadio].length) {
          this.setData({
            allChecked: true,
          })
        } else {
          this.setData({
            allChecked: false,
          })
        }
      }
    }
  },
  /** 关闭底部操作栏 */
  closeBottomOperation() {
    this.setData({
      bottomOperationShow: false,
    })
    this.clearSelected();
  },
  /** 清空选中 */
  clearSelected() {
    let arr = this.data.invoiceList.default.map((curr, _index, _arr) => {
      curr.selected = false;
      return curr;
    })
    this.setData({
      [`invoiceList.default`]: arr,
      selectedInvoiceArr: [],
      allChecked: false,
    })
  },
  /** 移动到按钮 */
  transferInvoice() {
    if (this.data.selectedInvoiceArr.length == 0) {
      this.setData({
        error: "请先选择数据"
      })
      return;
    }
    this.setData({
      transferDialogShow: true,
    })
  },
  transferRadioChange(e) {
    let selectFolder = e.detail.value;
    this.setData({
      transferDialogSelectFolder: selectFolder
    })
  },
  transferInvoiceSubmit(e) {
    let that = this;
    if (e.detail.index == 0) {
      that.setData({
        transferDialogShow: false
      })
    } else {
      that.setData({
        transferDialogShow: false
      })
      // TODO 调用转移接口
      let params = {
        fileId: that.data.transferDialogSelectFolder,
        invInfoId: that.data.selectedInvoiceArr.reduce((total, curr)=>{
          total.push(that.data.invoiceList[that.data.folderRadio][curr].id);
          return total;
        }, []),
        sourceFileId: that.data.folderRadio,
      }
      wx.showLoading({
        title: '正在移动',mask: true
      })
      changeInvInfo(params).then(res=>{
        wx.hideLoading();
        if(res.code == 200){
          app.myShowToast("票据移动成功");
          that.closeBottomOperation();
          that.setData({
            [`pageNum[${that.data.currFolder}]`]: 1
          })
          /** 移动完之后当前票夹需要刷新，被移动票夹也需要刷新 */
          that.getList();
          let folderArr = that.data.folderArr,
              toFolderIndex = 0;
          for(let i=0,l=folderArr.length; i<l; i++){
            if(folderArr[i].value == that.data.transferDialogSelectFolder){
              /** 设置被移动票夹的页码为1 */
              toFolderIndex = i;
              break;
            }
          }
          that.setData({
            [`pageNum[$(toFolderIndex)]`]: 1
          })
          let params = {
            fileId: that.data.folderRadio,
            search: that.data.searchValue,
            pageNum: 1,
            pageSize: that.data.pageSize
          }
          selectInvInfoBySearch(params).then(res=> {
            if (res.code == 200) {
              this.$set(this.invoiceList, this.folderRadio, res.rows);
              /** 接口返回的数据需要进行处理 */
              for(let i=0,l=res.rows.length; i<l; i++){
                res.rows[i].isVAT = that.data.zzsTypeArr.includes(rows[j].invType);
                res.rows[i].invTypeLabel = utils.invTypeFormat(res.rows[i].invType, that.data.invTypeOptions);
              }
              that.setData({
                [`invoiceList.${that.data.transferDialogSelectFolder}`]: res.rows
              })
            }
          })
        }else {
          app.myShowToast(res.msg);
        }
      }).catch(()=>{
        wx.hideLoading();
      })
    }
  },
  /** 删除按钮 */
  deleteInvoice() {
    if (this.data.selectedInvoiceArr.length == 0) {
      this.setData({
        error: "请先选择数据"
      })
      return;
    }
    // TODO 调用删除接口
  },
  /** 查验 */
  handleCheckInvoice() {
    if (this.data.selectedInvoiceArr.length == 0) {
      this.setData({
        error: "请先选择数据"
      })
      return;
    }
    // TODO 调用查验接口
  },
  /** 全选 */
  allCheckedChange() {
    if (this.data.allChecked) {
      this.clearSelected();
    } else {
      this.setData({
        [`invoiceList.${this.data.folderArr[this.data.currFolder].value}`]: this.data.invoiceList[this.data.folderArr[this.data.currFolder].value].map((curr, _index, _arr) => {
          curr.selected = true;
          return curr;
        }),
        selectedInvoiceArr: Array.from(new Array(this.data.invoiceList[this.data.folderArr[this.data.currFolder].value].length)).map((curr, index, arr) => {
          return index;
        }),
        allChecked: true,
      })
    }
  },

  /** 转移 */
  handleShift(e) {
    let that = this;
    if (that.data.selectedInvoiceArr.length == 0) {
      that.setData({
        error: "请先选择数据"
      })
      return;
    }
    that.selectComponent("#userList").openUserPopup(
      that.data.selectedInvoiceArr.reduce((total, curr) => {
        total.push(that.data.invoiceList[that.data.folderArr[that.data.currFolder].value][curr].id);
        return total;
      }, []),
      "1",
      that.data.folderArr[that.data.currFolder].value
    );
    that.closeBottomOperation();
  },

  /** 分享 */
  handleShare(e) {
    let that = this;
    if (that.data.selectedInvoiceArr.length == 0) {
      that.setData({
        error: "请先选择数据"
      })
      return;
    }
    that.selectComponent("#userList").openUserPopup(
      that.data.selectedInvoiceArr.reduce((total, curr) => {
        total.push(that.data.invoiceList[that.data.folderArr[that.data.currFolder].value][curr].id);
        return total;
      }, []),
      "2",
      that.data.folderArr[that.data.currFolder].value
    );
    that.closeBottomOperation();
  },

  /** 是否属于增值税 */
  isCheckEnableTicket(type) {
    if (type) {
      return this.data.zzsTypeArr.includes(type);
    }
    return false;
  },
  /** 增值税发票缩写 */
  abbrInvType(type) {
    switch (type) {
      case "01":
        return {
          name: '专'
        }
      case "04":
        return {
          name: '普'
        }
      case "10":
        return {
          name: "电"
        }
      case "08":
        return {
          name: "电专"
        }
      case "03":
        return {
          name: "机"
        }
      case "11":
        return {
          name: "卷"
        }
      case "14":
        return {
          name: '通'
        }
      case "15":
        return {
          name: "二手"
        }
    }
  },

  onLoad: function (e) {
    /** 获取从上一个页面传过来的发票夹ID */
    let that = this;
    let fileId = e.id;
    that.setData({
      folderRadio: fileId,
      debounceSearch: utils.myDebounce(that.getList, 2000, false)
    })
    let incomePromise = getDicts("income_check_inv_type");
    let otherPromise = getDicts("other_ticket");
    Promise.all([incomePromise, otherPromise]).then(res => {
      let data = res[0].data;
      let zzsTypeArr = [];
      let invTypeOptions = [];
      for (let i = 0, l = data.length; i < l; i++) {
        zzsTypeArr.push(data[i].dictValue);
      }
      let arr = [];
      invTypeOptions = arr.concat(res[0]['data'], res[1]['data']);
      that.setData({
        zzsTypeArr: zzsTypeArr,
        invTypeOptions: invTypeOptions
      })
    })
    wx.showLoading({
      title: '加载中', mask: true
    })
    listTicketFilesAll().then(res => {
      if (res.code == 200) {
        let folderArr = [];
        let invoiceList = {};
        let promiseArr = [];
        let pageNum = Array.apply(null, Array(res.rows.length)).map(() => 1);
        let currFolder = 0;
        for (let i = 0, l = res.rows.length; i < l; i++) {
          if (res.rows[i].id == fileId) {
            currFolder = i;
          }
          let currItem = {
            name: res.rows[i].fileName,
            value: res.rows[i].id
          }
          folderArr.push(currItem);

          let params = {
            fileId: res.rows[i].id,
            pageNum: pageNum[i],
            pageSize: that.data.pageSize
          }
          promiseArr.push(selectInvInfoBySearch(params))
        }
        that.setData({
          folderArr: folderArr,
          currFolder: currFolder,
          pageNum: pageNum
        })
        Promise.all(promiseArr).then(response => {
          wx.hideLoading();
          let invoiceList = {};
          for (let i = 0, l = response.length; i < l; i++) {
            let rows = response[i].rows;
            for (let j = 0, jl = rows.length; j < jl; j++) {
              rows[j].isVAT = that.data.zzsTypeArr.includes(rows[j].invType);
              rows[j].invTypeLabel = utils.invTypeFormat(rows[j].invType, that.data.invTypeOptions);
            }
            invoiceList[res.rows[i].id] = response[i].rows;
          }
          that.setData({
            invoiceList: invoiceList
          })
          if (response[currFolder].total == invoiceList[fileId].length) {
            that.setData({
              finished: true
            })
          }
        })
      } else {
        wx.hideLoading();
        app.myShowToast(res.msg);
      }
    })

  },

  /** 刷新或者请求发票列表数据 */
  getList() {
    let that = this;
    let params = {
      fileId: that.data.folderArr[that.data.currFolder].value,
      search: that.data.searchValue,
      pageNum: that.data.pageNum[that.data.currFolder],
      pageSize: that.data.pageSize
    }
    wx.showLoading({
      title: '加载中',mask: true
    })
    selectInvInfoBySearch(params).then(res=>{
      wx.hideLoading();
      if(res.code == 200){
        /** 接口返回的数据需要进行处理 */
        for(let i=0,l=res.rows.length; i<l; i++){
          res.rows[i].isVAT = that.data.zzsTypeArr.includes(rows[j].invType);
          res.rows[i].invTypeLabel = utils.invTypeFormat(res.rows[i].invType, that.data.invTypeOptions);
        }
        let folderRadio = that.data.folderRadio;
        let invoiceList = that.data.invoiceList[folderRadio];
        let finished = false;
        if(that.data.pageNum[that.data.currFolder] == 1){
          invoiceList = res.rows;
        }else{
          invoiceList.splice(invoiceList.length, 0, ...res.rows);
        }
        /** 数据已全部加载 */
        if(invoiceList.length >= res.total || res.rows.length < that.data.pageSize){
          finished = true;
        }else {
          finished = false;
        }
        that.setData({
          [`invoiceList.${folderRadio}`]: invoiceList,
          finished: finished
        })
        
      }else{
        that.setData({
          finished: false
        })
        app.myShowToast(res.msg);
      }
    }).catch(()=>{
      wx.hideLoading();
    })
  },
  /** 搜索 */
  searchValueChange(e) {
    this.setData({
      searchValue: e.detail.value
    })
    this.data.debounceSearch();
  },
  /** 下拉刷新 */
  onPullDownRefresh: function () {
    this.setData({
      refreshing: true,
      ['pageNum[' + this.data.currFolder + ']']: 1,
    })
    clearTimeout(this.data.touchTimer);
    wx.showLoading({
      mask: true,
      title: '正在加载',
    })
    this.getList();
  },
  /** 上拉加载更多 */
  onReachBottom: function () {
    if (!this.data.finished) {
      wx.showLoading({
        mask: true,
        title: '正在加载',
      })
      this.setData({
        ['pageNum[' + this.data.currFolder + ']']: this.data.pageNum[this.data.currFolder] + 1,
      })
      this.getList();
    }
  },
})