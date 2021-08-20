// pages/folder/userlist/userlist.js
const request = require("../../../utils/request")
const utils = require("../../../utils/util")
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    error: "",
    userListShow: false,
    userSearchValue: "",
    /** 防抖函数 */
    debounceSearch: null,
    /** 用户列表 */
    userList: [
    ],
    selectUserIds: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @param {*} ids 发票id
     * @param {*} type 转移("1")或分享("2")
     * @param {*} fileId 发票所属发票夹id
     */
    openUserPopup(ids, type, fileId){
      console.log("aaa");
      this.setData({
        userListShow: true
      })
      this.getUserList();
    },
    /** 查询条件改变 */
    userSearchValueChange(e){
      this.setData({
        userSearchValue: e.detail.value,
      })
      this.data.debounceSearch();
    },
    /** 查询用户 */
    getUserList(){
      let that = this;
      let params = {
        nickName: that.data.userSearchValue,
      }
      //TODO 执行查询
      wx.showLoading({
        mask: true,
        title: '正在加载',
      })
      setTimeout(()=>{
        that.setData({
          userList: [{id: 1, nickName: "一号"},
          {id: 2, nickName: "二号"},
          {id: 3, nickName: "三号"}]
        })
        wx.hideLoading()
      }, 1000)
    },
    /** 选择状态改变 */
    userCheckboxChange(e){
      this.setData({
        selectUserIds: e.detail.value,
      })
    },
    /** 确定按钮 */
    handleSubmit(){
      if(this.data.selectUserIds.length == 0){
        this.setData({
          error: "请先选择数据再操作"
        })
        return;
      }
      let userList = this.data.userList;
      for(let i=0,l=userList.length; i<l; i++){
        userList[i].checked = false;
      }
      //TODO 调用转移或分享接口
      this.setData({
        userListShow: false,
        userList: userList
      })
    },
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.setData({
        debounceSearch: utils.myDebounce(this.getUserList.bind(this), 2000, false)
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
