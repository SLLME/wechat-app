// pages/about/companySetting/companySetting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // dialogShow: true,
    companyArr: [
      {
        name: '公司一号',
        checked: false
      },
      {
        name: '公司二号',
        checked: false
      },
      {
        name: '公司三号',
        checked: false
      }
    ],
    isDelete: false,
    checkedCompanyArr: [],
    activeKey: 0,
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
  itemClick(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      activeKey: index
    })
  },
  /** 选择或取消事件 */
  companyCheckboxChange(e){
    let checkedIndexArr = e.detail.value;
    let that = this;
    that.setData({
      checkedCompanyArr: checkedIndexArr
    })
    for(let i=0,l=that.data.companyArr.length; i<l; i++){
      if(checkedIndexArr.includes(String(i))){
        that.setData({
          ['companyArr[' + i +'].checked']: true
        })
      }else{
        that.setData({
          ['companyArr[' + i +'].checked']: false
        })
      }
    }
  },
  /** 删除按钮 */
  deleteCompany() {
    this.setData({
      isDelete: !this.data.isDelete
    })
  },
  /** 确定删除 */
  deleteSubmit() {
    let that = this;
    wx.showModal({
      content: "确定删除吗？",
      success (res) {
        that.setData({
          isDelete: false
        })
        if (res.confirm) {
          if(that.data.checkedCompanyArr.length > 0){
            //TODO 执行后台删除接口
            that.setData({
              companyArr: that.data.companyArr.filter((curr, index, arr) => {
                if(!that.data.checkedCompanyArr.includes(String(index))){
                  return true;
                }
                return false;
              })
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /** 全选 */
  allChecked() {
    let isAllChecked = true;
    for (let i = 0, l = this.data.companyArr.length; i < l; i++) {
      if (!this.data.companyArr[i].checked) {
        isAllChecked = false;
        break;
      }
    }
    for (let i = 0, l = this.data.companyArr.length; i < l; i++) {
      if (isAllChecked) {
        this.setData({
          ['companyArr[' + i + '].checked'] : false
        })
      } else {
        this.setData({
          ['companyArr[' + i + '].checked'] : true
        })
      }

    }
  },
  /** 添加公司按钮 */
  addCompany() {
    wx.navigateTo({
      url: "companyDetail/companyDetail",
    })
  },
})