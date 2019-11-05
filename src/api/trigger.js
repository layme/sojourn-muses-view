import { request } from '../utils/request'

export const listTrigger = params => {
  return request('post', '/trigger/listPage', params)
}
