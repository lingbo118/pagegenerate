const colorToRGB = (color, opacity = 1) => {
  if (!color) {
    return ''
  }

  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  color = color.toLowerCase()
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      var colorNew = '#'
      for (var i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
      }
      color = colorNew;
    }
    // 处理六位的颜色值，转为RGB
    var colorChange = []
    for (var i = 1; i < 7; i += 2) {
      colorChange.push(parseInt('0x' + color.slice(i, i + 2)))
    }
    return 'rgba(' + colorChange.join(',') + ',' + opacity + ')'
  } else {
    return color
  }
}

const isRangeIn = (target, num1, num2) => {
  let min = Math.min(num1, num2)
  let max = Math.max(num1, num2)

  return target >= min && target <= max
}

const copy = (obj) => {
  let result = null
  if (obj && Object.keys(obj).length > 0) {
    result = JSON.parse(JSON.stringify(obj))
  }

  return result
}

export default {
  colorToRGB,
  isRangeIn,
  copy
}