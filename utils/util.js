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

module.exports = {
  formatTime,
  getInvoiceTypeFromCode
}
