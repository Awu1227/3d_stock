import { request } from './service'
/**@description 请求详情信息 */
export const getInfo = (id: string[]) => {
  const url = `https://push2.eastmoney.com/api/qt/ulist.np/get?fltt=2&fields=f12,f13,f19,f14,f139,f148,f2,f4,f1,f125,f18,f3,f152,f5,f30,f31,f32,f6,f8,f7,f10,f22,f9,f112,f100,f88,f153&secids=${[...id]}`
  return request({
  url
  })
}