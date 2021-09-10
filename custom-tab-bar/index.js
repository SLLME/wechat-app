Component({
  data: {
    selected: null,
    color: "black",
    selectedColor: "#338ae8",
    list: [
      {
        "iconPath": "/images/index/shouye-gray.png",
        "selectedIconPath": "/images/index/shouye-gray.png",
        "pagePath": "/pages/home/home",
        "text": "首页"
      },
      {
        "iconPath": "/images/index/xiangji-gray.png",
        "selectedIconPath": "/images/index/xiangji-blue.png",
        "pagePath": "/pages/camera/camera",
        "text": "相机"
      },
      {
        "iconPath": "/images/index/fapiaojia-gray.png",
        "selectedIconPath": "/images/index/fapiaojia-gray.png",
        "pagePath": "/pages/folder/folder",
        "text": "发票夹"
      },
      {
        "iconPath": "/images/index/wode-gray.png",
        "selectedIconPath": "/images/index/wode-gray.png",
        "pagePath": "/pages/about/about",
        "text": "我的"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      if(data.index == "1"){ //拍照
        wx.chooseImage({
          sizeType: ['original', 'compressed'],
          sourceType: ['camera'],
          success: function(res) {
            console.log(res);
          }
        })
      }else{
        wx.switchTab({url})
      }
     
      this.setData({
        selected: null
      })
    }
  }
})