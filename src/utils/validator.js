/**
 * 为空判断 - validateEmpty(str)
 * @param  {String}  str            内容
 * @result {boolean} result         验证有效与否
 */
export const validateEmpty = function (str) {
  /* eslint-disable */
  let re = /^\s*$/g
  /* eslint-enable */
  if (re.test(str)) {
    return true
  } else {

  }
}
/**
 * 手机号码有效性 - validateTel(tel)
 * @param  {String}  tel            手机号码
 * @result {boolean} result         验证有效与否
 */
/* eslint-disable */
export const validateTel = function (tel) {
  let reCn = /^1[0-9]{10}$/
  let reTw = /^(\+?886\-?|0)?9\d{8}$/
  if (reCn.test(tel) || reTw.test(tel)) {
    return
  } else {
    return true
  }
  /* eslint-enable */
}

/**
 * 邮箱有效性 - validateEmail(email)
 * @param  {String}  email            邮箱号码
 * @result {boolean} result         验证有效与否
 */
export const validateEmail = function (email) {
  /* eslint-disable */
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /* eslint-enable */
  if (re.test(email.toLowerCase())) {

  } else {
    return true
  }
}
/**
 * 座机有效性 - validatePhone(tel)
 * @param  {String}  tel            座机号码
 * @result {boolean} result         验证有效与否
 */
export const validatePhone = function (tel) {
  if (/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel)) {

  } else {
    return true
  }
}
/**
 * 台湾通行证有效性 - validateTwCard(card)
 * @param  {String}  card            台湾通行证
 * @result {boolean} result         验证有效与否
 */
export const validateTwCard = function (card) {
  /* eslint-disable */
  let re1 = /^[T]{1}([0-9]{8})$/
  /* eslint-enable */
  if (re1.test(card)) {

  } else {
    return true
  }
}
/**
 * 获取字符串长度 getStringLength(str)
 * @param {String} string        字符串 | 一个中文两个字节，一个英文数字一个字节
 * @resuilt {boolean} result     字符串长度
 */
export const getStringLength = function (str) {
  if (str) {
    const b = 0
    /* eslint-disable */
    for (let c = 0; c < str.length; c++) {
      const d = str.charAt(c)
      b += /^[\u0000-\u00ff]$/.test(d) ? 1 : 2
    }
    /* eslint-enable */
    return b
  }
}
/**
 * QQ有效性 - validateQQ(qq)
 * @param  {String}  qq             QQ号码
 * @result {boolean} result         验证有效与否
 */
export const validateQQ = function (qq) {
  /* eslint-disable */
  let regQQ = /^[1-9][0-9]{4,}$/
  /* eslint-enable */
  if (regQQ.test(qq)) {

  } else {
    return true
  }
}
/**
 * 用户名由英文、数字组成（不支持中文），且不能少于四个字符。 - validateUserName(name)
 * @param  {String}  name           用户名
 * @result {boolean} result         验证有效与否
 */
export const validateUserName = function (name) {
  /* eslint-disable */
  // let regName = /^[A-Za-z0-9]{4,17}$/
  // let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let ree = /^\w+$/
  /* eslint-enable */
  if (ree.test(name)) {

  } else {
    return true
  }
}
