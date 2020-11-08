/*
 * @Author: zhaojingyu
 * @Date: 2020-07-28 10:41:56
 * @LastEditors: zhaojingyu
 * @LastEditTime: 2020-11-06 10:19:24
 */
export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

export function getJson (obj) {
  var object = obj
  for (var i in object) {
    var value = object[i]
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          delete object[i]
          continue
        }
      }
      getJson(value)
    } else {
      if (value === '' || value === null || value === undefined) {
        delete object[i]
      }
    }
  }
  return object
}

export function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export function regMobile (mobile) {
  let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  return myreg.test(mobile)
}

export function regStr (str) {
  // eslint-disable-next-line no-useless-escape
  var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im
  var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
  if (regEn.test(str) || regCn.test(str)) {
    return false
  } else {
    return true
  }
}

export function regEmail (email) {
  // eslint-disable-next-line no-useless-escape
  let myreg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  return myreg.test(email)
}
