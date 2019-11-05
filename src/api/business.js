import { request } from '../utils/request'

export const listBusiness = params => {
  return request('post', '/business/listPage', params)
}
