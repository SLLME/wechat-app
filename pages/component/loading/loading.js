// pages/component/loading/loading.js
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
    show: true,
    loadingText: "加载中",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadingShow(text) {
      if (text != undefined && text != null) {
        this.setData({
          loadingText: text
        })
      }
      this.setData({
        show: true,
      })
    },
    loadingHide() {
      this.setData({
        show: false,
      })
    }
  }
})
