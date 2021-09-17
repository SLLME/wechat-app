import request from "./../utils/request"

export function ocrDiscernFile(params) {
  return request({
    url: "/cp/ticket/zzsinvoice/discernFile",
    method: "post",
    data: params,
  })
}
