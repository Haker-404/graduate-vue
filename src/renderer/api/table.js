import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
export function getUserList(date, isSigned) {
  return request({
    url: '/user/list',
    method: 'post',
    data: {
      date,
      isSigned
    }
  })
}
