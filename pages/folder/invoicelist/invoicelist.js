// pages/folder/invoicelist/invoicelist.js
const request = require("../../../utils/request")
const utils = require("../../../utils/util")
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
    this.setData({
      folderListPopupShow: false,
      selectedInvoiceArr: []
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
        let bool = this.data.invoiceList.default[index].selected;
        this.setData({
          [`invoiceList.default[${index}].selected`]: !bool,
        })
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
          selectedInvoiceArr: arr
        })
        if (arr.length == this.data.invoiceList[this.data.folderArr[this.data.currFolder].value].length) {
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
  transferRadioChange() {

  },
  transferInvoiceSubmit(e) {
    if (e.detail.index == 0) {
      this.setData({
        transferDialogShow: false
      })
    } else {
      this.setData({
        transferDialogShow: false
      })
      // TODO 调用转移接口
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
  handleShift(e){
    let that = this;
    if (that.data.selectedInvoiceArr.length == 0) {
      that.setData({
        error: "请先选择数据"
      })
      return;
    }
    that.selectComponent("#userList").openUserPopup(
      that.data.selectedInvoiceArr.reduce((total, curr)=>{
        total.push(that.data.invoiceList[that.data.folderArr[that.data.currFolder].value][curr].id);
        return total;
      }, []),
      "1",
      that.data.folderArr[that.data.currFolder].value
    );
    that.closeBottomOperation();
  },

  /** 分享 */
  handleShare(e){
    let that = this;
    if (that.data.selectedInvoiceArr.length == 0) {
      that.setData({
        error: "请先选择数据"
      })
      return;
    }
    that.selectComponent("#userList").openUserPopup(
      that.data.selectedInvoiceArr.reduce((total, curr)=>{
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
    this.setData({
      folderRadio: e.id,
      debounceSearch: utils.myDebounce(this.getList, 2000, false)
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
    //TODO 请求发票数据接口
    setTimeout(()=>{
      wx.hideLoading();
      if(that.data.refreshing){
        wx.showToast({
          icon: "none",
          title: '刷新完成',
        })
        that.setData({
          refreshing: false,
        })
        wx.stopPullDownRefresh();
      }else {
        wx.showToast({
          icon: "none",
          title: '已加载更多',
        })
      }
    }, 5000)
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
      this.getList();
    }
  },
})