const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/**
 * 获取发票种类（专|普）
 * @param a
 * @return {string}
 */
const getInvoiceTypeFromCode = (a) => {
  let code=["144031539110", "131001570151", "133011501118", "111001571071"];
  let b;
  let c = "99";
  if(a.length == 12) {
    b = a.substring(7, 8);
    for(let i = 0; i < code.length; i++) {
      if(a == code[i]) {
        c = "10";
        break
      }
    }
    if(c == "99") { //增加判断，判断是否为新版电子票
      if(a.charAt(0) == '0' && a.substring(10, 12) == '11') {
        c = "10";
      }
      if(a.charAt(0) == '0' && (a.substring(10, 12) == '04' || a.substring(10, 12) == '05')) {//判断是否最新12位增值税普通发票,第1位为0且第11-12位为04或05
        c = "04";
      }
      if(a.charAt(0) == '0' && (a.substring(10, 12) == '06' || a.substring(10, 12) == '07')) {//判断是否为卷式发票  第1位为0且第11-12位为06或07
        c = "11";
      }
      if(a.charAt(0) == '0' && a.substring(10, 12) == '12') { //如果还是99，且第11-12位是12，则是通行费发票
        c = "14";
      }
      if(a.charAt(0) == '0' && a.substring(10, 12) == '13') { //增值税电子专用发票
        c = "08";
      }
    }
    if(c == "99") {
      if(a.substring(10, 12) == '17' && a.charAt(0) == '0') {
          c = "15";
      }
      if(c == "99" && b == 2 && a.charAt(0) != '0') { //如果还是99，且第8位是2，则是机动车发票
        c = "03";
      }
    }
  } else if(a.length == 10) {
    b = a.substring(7, 8);
    if(b == 1 || b == 5) {
      c = "01"; //专票
    } else if(b == 6 || b == 3) {
      c = "04"; //普票
    } else if(b == 7 || b == 2) {
      c = "02";
    }
  }
  return c
}

/** 根据发票类型判断表单里面要显示哪些要素 */
const getElementFromType = (type) => {
  /** 专票（01） 电子专票（08） 机动车发票（03）*/
  const specialZzsInvoice = {
    name: ["票据代码", "票据号码", "票据日期", "不含税金额"],
    field: ["invCode", "invNo", "invDate", "totalWithoutTaxMoney"],
    OrRequired: [1, 1, 1, 1],
  }
  /** 普票（04）电子发票（10） 卷式普票（11） */
  const zzsInvoice = {
    name: ["票据代码", "票据号码", "票据日期", "校验码"],
    field: ["invCode", "invNo", "invDate", "checkCode"],
    OrRequired: [1, 1, 1, 0],
  }
  /** 二手车（15） */
  const secondHandInvoice = {
    name: ["票据代码", "票据号码", "票据日期", "价税合计"],
    field: ["invCode", "invNo", "invDate", "totalAmount"],
    OrRequired: [1, 1, 1, 1],
  }

  /** 出租车发票（0100） */
  const taxiInvoice = {
    name: ["发票代码", "发票号码", "金额", "日期", "发票所在地"],
    field: ["invCode", "invNo", "totalAmount", "invDate", "location"],
    OrRequired: [0, 1, 1, 1, 0]
  }
  /** 火车票（0101） */
  const trainInvoice = {
    name: ["火车票红色编码", "出发地", "目的地", "金额", "乘车时间", "乘客身份证", "乘客名称", "火车票ID"],
    field: ["invNo", "departureStation", "arrivalStation", "totalAmount", "invDate", "buyTaxNo", "buyName", "ticketId"],
    OrRequired: [1, 0, 0, 1, 1, 1, 1, 0]
  }
  /** 客运汽车票（0102） */
  const passengerCarInvoice = {
    name: ["发票代码", "发票号码", "日期", "金额", "时间"],
    field: ["invCode", "invNo", "invDate", "totalAmount", "invTime"],
    OrRequired: [0, 1, 1, 1, 0]
  }
  /** 航空运输电子客票行程单（0103） */
  const airTransportInvoice = {
    name: ["旅客姓名", "身份证号码", "票价", "民航发展基金", "燃油附加费", "其他税费", "合计金额", "电子客票号码", "填开日期", "可抵扣金额", "印刷序号", "出发地", "目的地", "乘车时间"],
    field: ["buyName", "buyTaxNo", "fare", "civilAviationFund", "fuelSurcharge", "otherTaxes", "totalAmount", "invNo", "invDate", "kdkje", "serialNo", "departureStation", "arrivalStation", "boardingTime"],
    OrRequired: [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1]
  }
  /** 船运客票（0104） */
  const shippingInvoice = {
    name: ["发票代码", "发票号码", "日期", "金额", "时间"],
    field: ["invCode", "invNo", "invDate", "totalAmount", "invTime"],
    OrRequired: [0, 1, 1, 1, 0]
  }
  /** 滴滴出行行程单（0105）*/
  const didiTravel = {
    name: [],
    field: [],
    OrRequired: [],
  }
  /** 过路费发票（0106） */
  const vehicleTollInvoice = {
    name: ["发票代码", "发票号码", "日期", "金额", "时间"],
    field: ["invCode", "invNo", "invDate", "totalAmount", "invTime"],
    OrRequired: [0, 1, 1, 1, 0]
  }
  /** 定额发票（0001） */
  const quotaInvoice = {
    name: ["发票代码", "发票号码", "金额（小写）", "金额（大写）", /*"日期",*/"发票所在地"],
    field: ["invCode", "invNo", "totalAmount", "totalMoneyUp", /*"invDate",*/"location"],
    OrRequired: [0, 1, 1, 0, /*1,*/0]
  }
  /** 通用机打发票（0002） */
  const generalMachineInvoice = {
    name: ["发票代码", "发票号码", "金额", "日期", "发票所在地", "购方名称", "购方税号", "销方名称", "销方税号"],
    field: ["invCode", "invNo", "totalAmount", "invDate", "location", "buyName", "buyTaxNo", "sellName", "sellTaxNo"],
    OrRequired: [0, 1, 1, 1, 0]
  }
  /** 完税证明（0003） */
  const taxPayCertificate = {
    name: [],
    field: [],
    OrRequired: [],
  }
  /** 可报销其他发票（0004） */
  const reimbursableOtherInvoice = {
    name: [],
    field: [],
    OrRequired: [],
  }
  /** 国际小票（0005） */
  const internationalInvoice = {
    name: ["票据号码", "票据日期", "金额", "购方名称", "销方名称", "未税金额"],
    field: ["invNo", "invDate", "totalAmount", "buyName", "sellName", "totalWithoutTaxMoney"],
    OrRequired: [1, 1, 1, 0, 0, 1]
  }
  /** 其他票据（99） */
  const otherInvoice = {
    name: ["票据号码", "票据日期", "金额", "购方名称", "销方名称"],
    field: ["invNo", "invDate", "totalAmount", "buyName", "sellName"],
    OrRequired: [0, 1, 1, 0, 0],
  }
  const getInvoiceForType = {
    "01": specialZzsInvoice,
    "08": specialZzsInvoice,
    "03": specialZzsInvoice,
    "04": zzsInvoice,
    "10": zzsInvoice,
    "11": zzsInvoice,
    "15": secondHandInvoice,
    "0100": taxiInvoice,
    "0101": trainInvoice,
    "0102": passengerCarInvoice,
    "0103": airTransportInvoice,
    "0104": shippingInvoice,
    "0105": didiTravel,
    "0106": vehicleTollInvoice,
    "0001": quotaInvoice,
    "0002": generalMachineInvoice,
    "0003": taxPayCertificate,
    "0004": reimbursableOtherInvoice,
    "0005": internationalInvoice,
    "99": otherInvoice,
  }
  return getInvoiceForType[type];
}

/** 二进制压缩 */
const fileCompress = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    let self = this;
    reader.readAsDataURL(file);
    //开始转
    reader.onload = function() {
      let result = this.result;
      let img = new Image();
      img.src = result;
      //判断图片是否大于500K
      if (this.result.length <= 500 * 1024) {
        resolve(result);
      } else {
        let data = "";
        img.onload = function() {
          data = self.compressImg(img);
          resolve(data);
        };
      }
    };
    reader.onerror = function(error) {
      reject(error);
    };
    // reader.onloadend = function() {
    //
    // };
  });
}

/** base64压缩 */
const  base64Compress = (baseStr) => {
  return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = baseStr;
      //判断图片是否大于500K
      if (baseStr.length <= 500 * 1024) {
        resolve(baseStr);
      } else {
        let data = "";
        img.onload = function() {
          data = compressImg(img);
          resolve(data);
        };
      }
  });
}

const compressImg = (img) => {
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  //瓦片canvas
  let tCanvas = document.createElement('canvas');
  let tctx = tCanvas.getContext('2d');
  let initSize = img.src.length;
  let width = img.width;
  let height = img.height;
  //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
  let ratio;
  if ((ratio = (width * height) / 4000000) > 1) {
    console.log('大于400万像素');
    ratio = Math.sqrt(ratio);
    width /= ratio;
    height /= ratio;
  } else {
    ratio = 1;
  }
  canvas.width = width;
  canvas.height = height;
  //        铺底色
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //如果图片像素大于100万则使用瓦片绘制
  let count;
  if ((count = (width * height) / 1000000) > 1) {
    console.log('超过100W像素');
    count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
    //            计算每块瓦片的宽和高
    let nw = ~~(width / count);
    let nh = ~~(height / count);
    tCanvas.width = nw;
    tCanvas.height = nh;
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        tctx.drawImage(
          img,
          i * nw * ratio,
          j * nh * ratio,
          nw * ratio,
          nh * ratio,
          0,
          0,
          nw,
          nh
        );
        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
      }
    }
  } else {
    ctx.drawImage(img, 0, 0, width, height);
  }
  //进行最小压缩
  let ndata = canvas.toDataURL('image/jpeg', 0.5);
  tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
  return ndata;
}

/**
 * 判断是图片还是pdf
 * @param picSrc
 * @return {string}
 */
const subStringFileTypeFromSrc = (picSrc)=>{
  var temp = picSrc.substring(picSrc.indexOf("/") + 1);
  var targetStr = temp.substring(0, temp.indexOf(";"));
  return targetStr;
}

const compressImgTest = (img) => {
  const canvas = wx.createOffscreenCanvas({type: '2d', width: img.width, height: img.height})
  // 获取 context。注意这里必须要与创建时的 type 一致
  const ctx = canvas.getContext('2d')
  //瓦片canvas
  let tCanvas = wx.createOffscreenCanvas({type: '2d', width: img.width, height: img.height})
  let tctx = tCanvas.getContext('2d');
  let width = img.width;
  let height = img.height;
  //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
  let ratio;
  if ((ratio = (width * height) / 4000000) > 1) {
    console.log('大于400万像素');
    ratio = Math.sqrt(ratio);
    width /= ratio;
    height /= ratio;
  } else {
    ratio = 1;
  }
  // canvas.width = width;
  // canvas.height = height;
  // //        铺底色
  // ctx.fillStyle = '#fff';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  // //如果图片像素大于100万则使用瓦片绘制
  let count;
  return new Promise((resolve, reject) => {
    let myImage = canvas.createImage();
    myImage.src = img.path;
    myImage.onload = function() {
      if ((count = (width * height) / 1000000) > 1) {
        console.log('超过100W像素');
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
        //            计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(
              myImage,
              i * nw * ratio,
              j * nh * ratio,
              nw * ratio,
              nh * ratio,
              0,
              0,
              nw,
              nh
            );
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(myImage, 0, 0, width, height);
      }
      //进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.5);
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      resolve(ndata);
    };
  });
  
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
const deepClone = (source)=>{
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/** 防抖 */
const myDebounce = (func, delay, immediate) => {
  let timer = null;
  return ()=>{
    if(immediate){
      let callNow = !timer;
      timer = setTimeout(()=>{
        timer = null
      }, delay)
      if(callNow){
        func();
      }
    }else{
      if(timer){
        clearTimeout(timer);
      }
      timer = setTimeout(()=>{
        func();
      }, delay)
    }
  }
}

module.exports = {
  formatTime,
  getInvoiceTypeFromCode,
  getElementFromType,
  base64Compress,
  subStringFileTypeFromSrc,
  compressImgTest,
  deepClone,
  myDebounce
}
