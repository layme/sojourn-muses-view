import { request } from '../utils/request'

export const listSysConfig = params => {
  return request('post', '/sysConfig/search', params)
}
