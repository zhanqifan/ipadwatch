import type { HeartMap } from '@/types/home'
export const customOrder = [
  'LOW',
  'MIDDLE',
  'HIGH',
  'HIGHER',
  'HIGHEST',
  'HIGHEST_HIGHER',
  'HIGHEST_HIGHEST',
  'HIGHEST_HIGHEST_HIGHER',
  'HIGHEST_HIGHEST_HIGHEST',
] //排序规则

// 转换字典
export const exchangeHeart = {
  LOW: { num: '<86次/分', name: '放松身体' },
  MIDDLE: { num: '87-113次/分', name: '暖身激活' },
  HIGH: { num: '114-142次/分', name: '高效燃脂' },
  HIGHER: { num: '143-159次/分', name: '心肺提升' },
  HIGHEST: { num: '160-170次/分', name: '强度冲击' },
  HIGHEST_HIGHER: { num: '171-180次/分', name: '极限突破' },
  HIGHEST_HIGHEST: { num: '181-190次/分', name: '超越极限' },
  HIGHEST_HIGHEST_HIGHER: { num: '191-200次/分', name: '出神入化' },
  HIGHEST_HIGHEST_HIGHEST: { num: '>200次/分', name: '绝对巅峰' },
}
type key = 'grade' | 'time'
type CustomOrderType = (typeof customOrder)[number]
// 排序方法                   排序的数组      排序关键字   自定义顺序
export const categorySort = (arr: HeartMap[], key: key, customOrder: CustomOrderType[] = []) => {
  return arr.sort((a, b) => {
    // 如果有自定义排序规则
    if (customOrder.length > 0) {
      const aIndex = customOrder.indexOf(a[key] as CustomOrderType)
      const bIndex = customOrder.indexOf(b[key] as CustomOrderType)

      // 如果 a 和 b 都在自定义排序规则中
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex
      }

      // 如果只有 a 在自定义排序规则中
      if (aIndex !== -1) {
        return -1
      }

      // 如果只有 b 在自定义排序规则中
      if (bIndex !== -1) {
        return 1
      }

      // 如果 a 和 b 都不在自定义排序规则中，按默认规则排序
    }

    // 按默认规则排序
    if (a[key]! > b[key]!) return 1
    if (a[key]! < b[key]!) return -1
    return 0
  })
}
