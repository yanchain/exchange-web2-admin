import request from '@/utils/request'

// 共享数据列表
export function shareAdminApi(data,page) {
  console.log(data)
    return request({
      url: `/skuadmin/pagelist?pageNo=${page}`,
      method: 'post',
      data: data
    })
  }