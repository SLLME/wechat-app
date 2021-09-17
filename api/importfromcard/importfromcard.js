import request from "./../../utils/request"

/** 从微信卡包里获取电子发票 */
export function importFromCard(params) {
  return request({
    url: '/cp/ticket/zzsinvoice/importInoivceFromCard',
    method: 'post',
    data: params,
  })
}
