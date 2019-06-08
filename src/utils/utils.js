import moment from 'moment'
import React from 'react'
import nzh from 'nzh/cn'
import { parse, stringify } from 'qs'

export function fixedZero(val) {
    return val * 1 < 10 ? `0${val}` : val
}

export function getUserInfo() {
    const userInfoStr = localStorage.getItem('user_info')
    let userInfo = {}
    if (userInfoStr) {
        userInfo = JSON.parse(userInfoStr)
    }

    return userInfo
}

// 生成GUID
export function uuid() {
    const s = []
    const hexDigits = '0123456789abcdef'
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    // eslint-disable-next-line no-bitwise
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    // eslint-disable-next-line no-multi-assign
    s[8] = s[13] = s[18] = s[23] = '-'

    const uuidStr = s.join('')
    return uuidStr
}

export function createSign(arr) {
    arr = arr.sort()
    let singStr = ''
    // eslint-disable-next-line array-callback-return
    arr.some(item => {
        singStr = `${singStr}${item}@`
    })
    singStr += 'fresh'
    singStr = singStr.replace(/^@/, '')
    return singStr
}

/**
 * 过滤antdform中value
 * @param {*} values
 * @param {*} ignore 需要忽略的键值
 */
export function filterFormItemValue(values, ignoreKeys) {
    const newObj = {}
    // eslint-disable-next-line array-callback-return
    Object.keys(values).some(key => {
        if (ignoreKeys.indexOf(key) === -1) {
            newObj[key] = String.prototype.replace.call(values[key], /\s/g, '')
        } else {
            newObj[key] = values[key]
        }
    })
    return newObj
}

export function getTimeDistance(type) {
    const now = new Date()
    const oneDay = 1000 * 60 * 60 * 24

    if (type === 'today') {
        now.setHours(0)
        now.setMinutes(0)
        now.setSeconds(0)
        return [moment(now), moment(now.getTime() + (oneDay - 1000))]
    }

    if (type === 'week') {
        let day = now.getDay()
        now.setHours(0)
        now.setMinutes(0)
        now.setSeconds(0)

        if (day === 0) {
            day = 6
        } else {
            day -= 1
        }

        const beginTime = now.getTime() - day * oneDay

        return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))]
    }

    if (type === 'month') {
        const year = now.getFullYear()
        const month = now.getMonth()
        const nextDate = moment(now).add(1, 'months')
        const nextYear = nextDate.year()
        const nextMonth = nextDate.month()

        return [
            moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
            moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
        ]
    }

    const year = now.getFullYear()
    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)]
}

export function getPlainNode(nodeList, parentPath = '') {
    const arr = []
    nodeList.forEach(node => {
        const item = node
        item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/')
        item.exact = true
        if (item.children && !item.component) {
            arr.push(...getPlainNode(item.children, item.path))
        } else {
            if (item.children && item.component) {
                item.exact = false
            }
            arr.push(item)
        }
    })
    return arr
}

export function digitUppercase(n) {
    return nzh.toMoney(n)
}

function getRelation(str1, str2) {
    if (str1 === str2) {
        console.warn('Two path are equal!') // eslint-disable-line
    }
    const arr1 = str1.split('/')
    const arr2 = str2.split('/')
    if (arr2.every((item, index) => item === arr1[index])) {
        return 1
    }
    if (arr1.every((item, index) => item === arr2[index])) {
        return 2
    }
    return 3
}

function getRenderArr(routes) {
    let renderArr = []
    renderArr.push(routes[0])
    for (let i = 1; i < routes.length; i += 1) {
        // 去重
        renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1)
        // 是否包含
        const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3)
        if (isAdd) {
            renderArr.push(routes[i])
        }
    }
    return renderArr
}

/**
 * 整数增加啊千分符
 * @param {Number} intPart
 */
const intToThousands = intPart => {
    let num = (intPart || 0).toString()
    let result = ''

    while (num.length > 3) {
        result = `,${num.slice(-3)}${result}`
        num = num.slice(0, num.length - 3)
    }
    if (num) {
        result = num + result
    }
    return result
}

/**
 * 数值转千分符（将忽略小数点位数)
 * 将默认对数值保留两位小数
 * TODO: `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
 * @param {Number} number
 */
export const NumberToThousands = number => {
    // eslint-disable-next-line no-restricted-globals
    if (!number || isNaN(Number(number))) {
        return '0.00'
    }

    let isNegative = false
    // let num = number.toString()
    let num = Number(number).toFixed(2)
    num = num.split(',').join('')

    if (Number(num) < 0) {
        isNegative = true
        num = num.replace(/-/, '')
    }

    let intPart = ''
    let backPart = ''
    const pointIndex = num.indexOf('.')

    if (pointIndex >= 0) {
        intPart = num.slice(0, pointIndex)
        backPart = num.slice(pointIndex)
    } else {
        intPart = num
    }
    intPart = intPart ? intToThousands(intPart) : ''

    return `${isNegative ? '-' : ''}${intPart}${backPart}`
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
    let routes = Object.keys(routerData).filter(
        routePath => routePath.indexOf(path) === 0 && routePath !== path
    )
    // Replace path to '' eg. path='user' /user/name => name
    routes = routes.map(item => item.replace(path, ''))
    // Get the route to be rendered to remove the deep rendering
    const renderArr = getRenderArr(routes)
    // Conversion and stitching parameters
    const renderRoutes = renderArr.map(item => {
        const exact = !routes.some(route => route !== item && getRelation(route, item) === 1)
        return {
            exact,
            ...routerData[`${path}${item}`],
            key: `${path}${item}`,
            path: `${path}${item}`,
        }
    })
    return renderRoutes
}

export function getPageQuery() {
    return parse(window.location.href.split('?')[1])
}

export function getQueryPath(path = '', query = {}) {
    const search = stringify(query)
    if (search.length) {
        return `${path}?${search}`
    }
    return path
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

export function isUrl(path) {
    return reg.test(path)
}

export function formatWan(val) {
    const v = val * 1
    if (!v || Number.isNaN(v)) return ''

    let result = val
    if (val > 10000) {
        result = Math.floor(val / 10000)
        result = (
            <span>
                {result}
                <span
                    style={{
                        position: 'relative',
                        top: -2,
                        fontSize: 14,
                        fontStyle: 'normal',
                        marginLeft: 2,
                    }}
                >
                    万
                </span>
            </span>
        )
    }
    return result
}

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export function isAntdPro() {
    return window.location.hostname === 'preview.pro.ant.design'
}

export const importCDN = (url, name) =>
    new Promise(resolve => {
        const dom = document.createElement('script')
        dom.src = url
        dom.type = 'text/javascript'
        dom.onload = () => {
            resolve(window[name])
        }
        document.head.appendChild(dom)
    })

/**
 * 检测 字段 里面是不是包含图片类型的尾缀
 * @param {*} word
 */
export const isImageType = word => {
    return (
        word.includes('jpg') ||
        word.includes('png') ||
        word.includes('jpeg') ||
        word.includes('gif') ||
        word.includes('svg') ||
        word.includes('bmp')
    )
}

/**
 * 根据dom id，选择该区域，进行打印
 * 通过 iframe 的方式，并输入了样式
 * @param {*} id
 */
export const printRangeById = id => {
    const iframeDom = document.createElement('iframe')
    const stylesDom = document.querySelectorAll('link[rel=stylesheet]')
    const printDom = window.document.querySelector(`#${id}`).innerHTML
    iframeDom.setAttribute('style', 'position:absolute;left:-1000px;top:-1000px')
    document.body.appendChild(iframeDom)
    const doc = iframeDom.contentWindow.document
    // 写入样式dom
    stylesDom.forEach(dom => {
        const linkDom = document.createElement('link')
        linkDom.setAttribute('rel', 'stylesheet')
        linkDom.setAttribute('href', dom.href)
        doc.write(`<div style="visibility:hidden;">${linkDom}</div>`)
        doc.head.appendChild(linkDom)
    })
    doc.write(printDom)
    doc.close()
    iframeDom.contentWindow.focus()
    iframeDom.contentWindow.print()
    // 监听打印的媒体查询
    if (iframeDom.contentWindow.matchMedia) {
        iframeDom.contentWindow.matchMedia('print').addListener(event => {
            if (!event.matches) {
                // 打印预览界面已经生成，这个时候移除dom
                document.body.removeChild(iframeDom)
            }
        })
    }
}

/**
 * 通过创建iframe，进行文件下载
 * @param {string} path
 * @author wangsijie
 */
export const fileDownloadByIframe = path => {
    const iframeDom = document.createElement('iframe')
    iframeDom.setAttribute('style', 'position:absolute;left:-1000px;top:-1000px')
    iframeDom.src = path
    document.body.appendChild(iframeDom)
}

/**
 * 文件路径转权限编码
 * @param {string} path
 * @author wangsijie
 */
export const pathToAuthCode = path => {
    const pathArr = path.split('/')
    if (pathArr[0] === '') {
        pathArr.shift()
    }
    return pathArr.join(':')
}

/**
 * 检查权限是否拥有
 * 将会到 store 的 authorities 进行查找
 * @param {string} endKey 权限的后缀如 list，aduit...
 * @param {string} code 权限的名称如 company:core 固定格式
 * @author wangsijie
 */
export const checkAuthority = (endKey, code) => {
    let authArr = []
    // eslint-disable-next-line no-underscore-dangle
    if (window.g_app && window.g_app._store) {
        // eslint-disable-next-line no-underscore-dangle
        authArr = window.g_app._store.getState().global.authorities
    }
    const authCode = code || pathToAuthCode(window.location.pathname)
    const thekey = `${authCode}:${endKey}`

    return authArr.includes(thekey)
}

// 根据当前的运行环境，返回主站的路径
// @author wangsijie
//      这个                    主站
// 线上：https:// https://admin.znbill.com/login
// 预发：https:// https://pre2.admin.znbill.com/
// 稳定：https:// https://pre.admin.znbill.com/
// 测试：http://192.168.1.7:8083 http://test.znbill.com:9091
// 开发：http://localhost:8000 http://192.168.1.7:8099
export const mainSite = (url = '') => {
    const isDevelopment = process.env.NODE_ENV === 'development'
    let baseUrl = ''
    if (isDevelopment) {
        // 开发环境时，手动修改这里的ip，连接java电脑上
        // TODO: 修改nginx配置，改成路由
        baseUrl = 'http://project.znckj.com'
    } else if (window.location.hostname.indexOf('test') > -1) {
        baseUrl = 'http://test.znbill.com:9091'
    } else if (window.location.hostname.indexOf('pre2') > -1) {
        baseUrl = 'https://pre2.admin.znbill.com'
    } else if (window.location.hostname.indexOf('pre') > -1) {
        baseUrl = 'https://pre.admin.znbill.com'
    } else {
        baseUrl = 'https://admin.znbill.com'
    }
    const theUrl = url.replace(/^\//, '')

    return `${baseUrl}/${theUrl}`
}
