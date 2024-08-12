export const getStyleByType = (
  type: 'heartRateColor' | 'heartRateBackground' | 'batteryColor' | 'statusColor',
  value: number,
) => {
  switch (type) {
    // 获取心率颜色
    case 'heartRateColor':
      if (value == 0) return 'black'
      if (value >= 40 && value <= 150) return '#58cca5' // 绿色
      if (value > 150 && value <= 180) return '#FF9933' // 橘色
      if (value > 180 && value < 200) return 'red' // 红色
      if (value <= 40 || value >= 200) return '#854DC4' // 紫色
      break
    // 获取心率渐变背景
    case 'heartRateBackground':
      if (value == 0) return 'linear-gradient(.25turn,rgba(211, 211, 211, 0.2)0%)'
      if (value >= 40 && value <= 150)
        return 'linear-gradient(.25turn,rgba(130, 212, 185, 0.3)0%,rgba(211, 211, 211, 0.2)30%)' // 浅灰色到浅绿色
      if (value > 150 && value <= 180)
        return 'linear-gradient(.25turn, rgba(255, 165, 0, 0.3)0%,rgba(211, 211, 211, 0.2)30%)' // 浅灰色到橘色
      if (value > 180 && value < 200)
        return 'linear-gradient(.25turn, rgba(255, 69, 140, 0.3)0%, rgba(211, 211, 211, 0.2)30%)' // 浅灰色到浅红色
      if (value <= 40 || value >= 200)
        return 'linear-gradient(.25turn, rgba(186, 85, 211, 0.3)0%, rgba(211, 211, 211, 0.2)30%)' // 浅灰色到浅紫色
      break
    // 获取电量颜色
    case 'batteryColor':
      if (value >= 80 && value <= 100) return '#3bc968' // 绿色
      if (value >= 25 && value < 80) return '#FFC95C' // 黄色
      return '#ff2f4f' // 红色
    case 'statusColor':
      if (value == 0) return ''
      if (value >= 40 && value <= 150) return '正常' // 绿色
      if (value > 150 && value <= 180) return '加速' // 橘色
      if (value > 180 && value < 200) return '快速' // 红色
      if (value <= 40 || value >= 200) return '极速' // 紫色
  }
  return '' // 默认样式
}
