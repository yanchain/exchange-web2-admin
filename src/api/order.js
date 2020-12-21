import request from '@/utils/request'

// 订单户列表
export function orderAdminApi(data,page) {
  console.log(data)
    return request({
      url: `/orderadmin/pagelist?pageNo=${page}`,
      method: 'post',
      data: data
    })
  }
//订单详情
  export function getOrderDetail(query) {
    return request({
      url: `/orderadmin/${query}`,
      method: 'get'
    })
  }