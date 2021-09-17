import request from "./../../utils/request"

/** ocr识别 */
export function ocrDiscernFile(params) {
  return request({
    url: "/miniapp/ticket/zzsinvoice/discernFile",
    method: "post",
    data: params,
  })
}

/** 上传 */
export function uploadImgFile(params) {
  return request({
    url: "/miniapp/ticket/zzsinvoice/uploadImgFile",
    method: "post",
    data: params
  })
}

/** 保存ocr识别数据 */
export function saveTicket(params) {
  return request({
    url: "/miniapp/ticket/zzsinvoice/saveTicket",
    method: "post",
    data: params
  })
}

/** 从短信连接里获取发票 */
export function getInvoiceFromText(params) {
  return request({
    url: '/miniapp/ticket/zzsinvoice/getInvoiceFromText',
    method: 'get',
    data: params
  })
}
