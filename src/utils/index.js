/* eslint-disable */
// 防抖处理开始
var undefined,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined,
    NAN = 0 / 0,
    reTrim = /^\s+|\s+$/g,
    reIsBinary = /^0b[01]+$/i,
    reIsOctal = /^0o[0-7]+$/i,
    reIsBadHex = /^[-+]0x[0-9a-f]+$/i

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')()

var now = function () {
  return root.Date.now()
}

// 通过Object.prototype.toString.call()来判断类型
const objectToString = function (value) {
  return Object.prototype.toString.call(value)
}
// 判断value对象上是否存在symToStringTag这个属性
const getRawTag = function (value) {
  var isOwn = Object.prototype.hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag]

  try {
    value[symToStringTag] = undefined
    var unmasked = true
  } catch (e) {}

  var retult = objectToString(value)

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag
    } else {
      delete value[symToStringTag]
    }
  }
  return result
}
// 判断value是否为object且不为null和function
const isObjectLike = function (value) {
  return value !== null && typeof value === 'object'
}

// 判断value是否为object且不为null
const isObject = function (value) {
  return value !== null && (value === 'object' || value === 'function')
}

const baseGetTag = function (value) {
  if (value === null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  return (symToStringTag && symToStringTag in Object(value)) ? getRawTag(value) : objectToString(value)
}

const isSymbol = function (value) {
  return typeof value === 'symbol' || (isObjectLike(value) && baseGetTag(value) === '[object Symbol]')
}

const toNumber = function (value) {
  if (typeof value === 'number') {
    return value
  }

  if (isSymbol(value)) {
    return NAN
  }

  if (isObject(value)) {
    var other = typeof value.valueOf === 'function' ? value.valueOf() : value
    value = isObject(other) ? (other + '') : other
  }

  if (typeof value !== 'string') {
    return value === 0 ? value : +value
  }

  value =  value.replace(reTrim, '')
  // 是否为二进制
  let isBinary = reIsBinary.test(value)
  // 是否是八进制
  let isOctal = reIsOctal.test(value)
  // 是否是十六进制
  let isBadHex = reIsBadHex.test(value)

  return (isBinary || isOctal) 
    ? parseInt(value.slice(2), isBinary ? 2 : 8)
    : (isBadHex ? NAN : +value)
}

export const debounce = function (func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }

  wait = toNumber(wait) || 0

  if (isObject(options)) {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing ? Math.max(toNumber(options.maxWait) || 0, wait) : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }
  const invokeFunc = function (time) {
    var args = lastArgs,
        thisArg = lastArgs

    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }
  const leadingEdge = function (time) {
    lastInvokeTime = time
    timerId = setTimeout(timerExpired, wait)
    return leading ? invokeFunc(time) : result
  }
  const remainingWait = function (time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall

    return maxing ? Math.max(result, maxWait - timeSinceLastInvoke) : result
  }
  const shouldInvoke = function (time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime

    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
          (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait))
  }
  const timerExpired = function () {
    var time = now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    timerId = setTimeout(timerExpired, remainingWait(time))
  }
  const trailingEdge = function (time) {
    timerId = undefined
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }
  const cancel = function () {
    if (timerId !== undefined) {
      clearTimeout(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }
  const flush = function () {
    return timerId === undefined ? result : trailingEdge(now())
  }
  const debounced = function () {
    var time  = now(),
        isInvoking = shouldInvoke(time)

    lastArgs = arguments
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        timerId = setTimeout(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait)
    }
    return result
  }
  debounced.cancel = cancel
  debounced.flush = flush
  return debounced
}
// 防抖处理 结束

var u = !process.server ? navigator.userAgent : ''
/**
 * 安卓手机 - isAndroid
 * @param  {Boolean}   variable                 键
 */
export const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1

/**
 * ios手机 - isiOS
 * @param  {Boolean}   variable                 键
 */
export const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

/**
 * 判断微信环境 - isWeiXin
 * @param  {Boolean}   variable                 键
 */
export const isWeiXin = u.toLowerCase().match(/MicroMessenger/i) === 'micromessenger'

/**
 * 获取url传参 - getQueryVariable(variable)
 * @param  {Object}   variable                 键
 */
export const getQueryVariable = function (variable) {
  var query = window.location.href
  if (query) {
    var hashVars = query.split('?')
    var vars = hashVars[1] && hashVars[1].split('&')
    if (vars) {
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        /* eslint-disable */
        if (pair[0] == variable) {
          return pair[1]
        }
        /* eslint-enable */
      }
    }
  }
  return (false)
}
/* eslint-enable */
