export const sportDict = {
  sportDensity: {
    label: '运动密度',
    color: '#6c64fc', // 红色
    unit: '%',
  },
  averageHeartRate: {
    label: '平均心率',
    color: '#6c64fc', // 绿色
    unit: '次/分',
  },
  averageIntensity: {
    label: '平均强度',
    color: '#3357FF', // 蓝色
    unit: '%',
  },
  heartRateGreaterThan120Time: {
    label: '心率≥120时间',
    color: '#b462fc', // 粉色
    unit: '',
  },
  maxHeartRateTime: {
    label: '最大心率时间',
    color: '#b462fc', // 黄色
    unit: '',
  },
}
export const secondsToMinutes = (value: number, key: string) => {
  if (key === 'heartRateGreaterThan120Time' || key === 'maxHeartRateTime') {
    const minutes = Math.floor(value / 60)
    const remainingSeconds = value % 60
    return `${minutes}分${remainingSeconds}秒`
  } else if (key === 'sportDensity' || key === 'averageIntensity') {
    return value * 100
  }

  return value ?? 0
}
