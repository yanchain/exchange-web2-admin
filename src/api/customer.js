import request from '@/utils/request'

// 添加联盟用户
export function addadminApi(data) {
    return request({
      url: '/customeradmin/',
      method: 'post',
      data: data
    })
  }

// 联盟用户列表
export function listAdminApi(query) {
    return request({
      url: '/customeradmin/pagelist',
      method: 'post',
      params: query
    })
  }

// 角色状态修改
export function isOpenApi(id, status) {
  console.log(id)
  return request({
    url: `/customeradmin?customerId=${id}&status=${status}`,
    method: 'post',
  })
}

//重置密码
export function resetPasswordApi(roleId) {
  return request({
    url: `/customeradmin/reset?customerId=${roleId}`,
    method: 'post',
  })
}