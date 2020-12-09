/**
 * @author ♠K
 * @date 2020/8/27
 * @des 常用的js
 */

/**
 * base64图片压缩
 * @param  base64 base64字符串
 * @param  sizeW 图片的宽
 * @param  quality 图片缩放比例（0~1）越大越清晰
 *         返回promise
 */
export function img64Compress (base64, sizeW, quality) {
  // 获取图片格式
  const mineType = (str64) => {
    const arr = str64.split(',')
    return arr[0].match(/:(.*?)/)[1]
  }
  const newImg = new Image()
  let imgW = 0
  let imgH = 0
  // eslint-disable-next-line no-return-assign
  const promise = new Promise(resolve => newImg.onload = resolve)
  newImg.src = base64
  // 返回promise
  return promise.then(() => {
    imgW = newImg.width
    imgH = newImg.height
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (Math.max(imgW, imgH) > sizeW) {
      canvas.width = sizeW
      canvas.height = sizeW * imgH / imgW
    } else {
      canvas.width = imgW
      canvas.height = imgH
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(newImg, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL(mineType(base64), quality)
  })
}

/**
 * 判断传入的变量是否为空
 * @param param 变量
 *  为空 返回 true
 */
export function isEmpty (param) {
  if (param) {
    const PARAM_TYPE = typeof (param)
    if (PARAM_TYPE === 'object') {
      // 要判断的是【对象】或【数组】或【null】等
      if (typeof (param.length) === 'undefined') {
        if (JSON.stringify(param) === '{}') {
          return true // 空值，空对象
        }
      } else if (param.length === 0) {
        return true // 空值，空数组
      }
    } else if (PARAM_TYPE === 'string') {
      // 如果要过滤空格等字符
      const NEW_PARAM = param.trim()
      if (NEW_PARAM.length === 0) {
        // 空值，例如:带有空格的字符串" "。
        return true
      }
    } else if (PARAM_TYPE === 'boolean') {
      if (!param) {
        return true
      }
    } else if (PARAM_TYPE === 'number') {
      if (!param) {
        return true
      }
    }
    return false // 非空值
  } else {
    // 空值,例如：
    // (1)null
    // (2)可能使用了js的内置的名称，例如：var name=[],这个打印类型是字符串类型。
    // (3)空字符串''、""。
    // (4)数字0、00等，如果可以只输入0，则需要另外判断。
    return true
  }
}

/**
 * 将时间戳转换成指定格式的日期
 * 时间格式参考             YYYY-MM-DD YYYY年MM月DD日 YYYY/MMM/DD MM-DD MM月DD日 hh:mm:ss ...
 * @param format          时间格式(必传)
 * @param timestamps      时间戳(可选)
 */
export function timestampToDateFormat (format, timestamps) {
  let timeType
  let time
  const value = format
  if (timestamps) {
    timeType = new Date(timestamps)
  } else {
    timeType = new Date()
  }
  const Y = timeType.getFullYear()
  const M = timeType.getMonth() + 1 < 10 ? '0' + (timeType.getMonth() + 1) : (timeType.getMonth() + 1)
  const D = timeType.getDate() < 10 ? '0' + timeType.getDate() : timeType.getDate()
  const h = timeType.getHours() < 10 ? '0' + timeType.getHours() : timeType.getHours()
  const m = timeType.getMinutes() < 10 ? '0' + timeType.getMinutes() : timeType.getMinutes()
  const s = timeType.getSeconds() < 10 ? '0' + timeType.getSeconds() : timeType.getSeconds()
  const str = simplify(value)

  function simplify (str) {
    let newStr = ''
    for (let i = 0; i < str.length; i++) {
      if (str[i] !== str[i + 1]) {
        newStr += str[i]
      }
    }
    return newStr
  }
  function exchange (str) {
    const temp1 = ['Y', 'M', 'D', 'h', 'm', 's']
    const temp2 = [Y, M, D, h, m, s]
    let result
    for (let i = 0; i < str.length; i++) {
      for (let j = 0; j < temp1.length; j++) {
        if (str[i] === temp1[j]) {
          result = str.replace(str[i], temp2[j])
          time = result
          return exchange(result)
        }
      }
    }
  }
  exchange(str)
  return time
}
/**
 *
 * @param  dateStr 时间格式字符串
 * 返回时间戳
 */
export function dateToTimestamp (dateStr) {
  return Date.parse(new Date(dateStr))
}

/**
 * 验证是否是有效的身份证号
 * @param num    要验证的号码
 */
export function isIdNumber (num) {
  num = num.toUpperCase()
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
  if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
    // alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
    return false
  }
  // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
  // 下面分别分析出生日期和校验位
  const len = num.length
  let re
  const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  if (len === 15) {
    re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/)
    const arrSplit = num.match(re)
    // 检查生日日期是否正确
    const dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
    const bGoodDay = (dtmBirth.getYear() === Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) === Number(arrSplit[3])) && (dtmBirth.getDate() === Number(arrSplit[4]))
    if (!bGoodDay) {
      return false
    } else {
      // 将15位身份证转成18位
      // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6)
      num += arrCh[lastNum(num) % 11]
      return true
    }
  }
  if (len === 18) {
    re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/)
    const arrSplit1 = num.match(re)
    // 检查生日日期是否正确
    const dtmBirth1 = new Date(arrSplit1[2] + '/' + arrSplit1[3] + '/' + arrSplit1[4])
    const bGoodDay1 = (dtmBirth1.getFullYear() === Number(arrSplit1[2])) && ((dtmBirth1.getMonth() + 1) === Number(arrSplit1[3])) && (dtmBirth1.getDate() === Number(arrSplit1[4]))
    if (!bGoodDay1) {
      return false
    } else {
      // 检验18位身份证的校验码是否正确。
      // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      const finalNum = arrCh[lastNum(num) % 11]
      return finalNum === num.substr(17, 1)
    }
  }
  function lastNum (number) {
    const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    let nTemp = 0
    let i
    for (i = 0; i < 17; i++) {
      nTemp += number.substr(i, 1) * arrInt[i]
    }
    return nTemp
  }
  return false
}

/**
 * 是否是有效的电话号码
 * @param num
 * @returns {boolean}
 */
export function isPhoneNum (num) {
  const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  return phoneReg.test(num)
}
