export function weekFormat(date) {
  switch (new Date(date).getDay()) {
    case 0:
      return '周日'
    case 1:
      return '周一'
    case 2:
      return '周二'
    case 3:
      return '周三'
    case 4:
      return '周四'
    case 5:
      return '周五'
    case 6:
      return '周六'
  }
}

export function dateWithoutYear(date) {
  const time = new Date(date)
  let month = time.getMonth() + 1
  let day = time.getDate()

  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day

  return `${month}月${day}日`
}

export function dateFormat(date) {
  const time = new Date(date)
  const year = time.getFullYear()
  let month = time.getMonth() + 1
  let day = time.getDate()

  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day
  return `${year}-${month}-${day}`
}