import axios from 'axios'
import { Modal } from 'antd'
import { getSession } from '@/utils/session'
import { uuid, createSign, mainSite } from '@/utils/utils'
import md5 from 'md5'

const loading = {
    show() {
        // eslint-disable-next-line no-underscore-dangle
        if (window.g_app && window.g_app._store) {
            // eslint-disable-next-line no-underscore-dangle
            window.g_app._store.dispatch({
                type: 'global/fetchingStart',
            })
        }
    },
    hide() {
        // eslint-disable-next-line no-underscore-dangle
        if (window.g_app && window.g_app._store) {
            // eslint-disable-next-line no-underscore-dangle
            window.g_app._store.dispatch({
                type: 'global/fetchingEnd',
            })
        }
    },
}

export default (devUrl, prodTag) => {
    const codeMessage = {
        200: '服务器成功返回请求的数据。',
        201: '新建或修改数据成功。',
        202: '一个请求已经进入后台排队（异步任务）。',
        204: '删除数据成功。',
        400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
        401: '用户没有权限（令牌、用户名、密码错误）。',
        403: '用户得到授权，但是访问是被禁止的。',
        404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
        406: '请求的格式不可得。',
        410: '请求的资源被永久删除，且不会再得到的。',
        422: '当创建一个对象时，发生一个验证错误。',
        500: '服务器发生错误，请检查服务器。',
        502: '网关错误。',
        503: '服务不可用，服务器暂时过载或维护。',
        504: '网关超时。',
    }

    const checkStatus = response => {
        if (response.status >= 200 && response.status < 300) {
            return response
        }
        const errortext = codeMessage[response.status] || response.statusText
        Modal.error({
            title: `请求错误 ${response.status}: ${response.url}`,
            content: errortext,
        })
        const error = new Error(errortext)
        error.name = response.status
        error.response = response
        throw error
    }

    const isDevelopment = process.env.NODE_ENV === 'development'

    const devBaseUrl = devUrl

    // const devBaseUrl = '//192.168.1.230:8099/'

    const prodBaseUrl = prodTag || '/admin'

    const baseUrl = isDevelopment ? devBaseUrl : prodBaseUrl

    // 实例化axios
    const instance = axios.create({
        baseURL: baseUrl,
        withCredentials: true,
        // timeout: 20000,
    })

    // const updateInstance = () => {
    //     const isRisk = window.location.pathname.indexOf('risk') > -1
    //     devBaseUrl = isRisk? 'risk.znckj.com' : '//api3.znckj.com/'
    //     prodBaseUrl =  isRisk? '/risk': '/admin'
    //     instance = axios.create({
    //         baseURL: baseUrl,
    //         withCredentials: true,
    //     })
    // }

    // 请求拦截器
    instance.interceptors.request.use(
        config => {
            loading.show()
            Object.assign(config.headers, {
                Authorization: getSession(),
            })
            return config
        },
        error => {
            loading.hide()
            if (isDevelopment) {
                Modal.error({
                    title: '提示',
                    content: '请求拦截器中出错',
                })
            }
            Promise.reject(error)
        }
    )

    // 响应拦截器
    instance.interceptors.response.use(
        res => {
            const { data } = res
            loading.hide()

            // code 500 处理菜单没有权限
            if (!data.success && data.code === 500) {
                Modal.error({
                    title: data.msg || data.message,
                    okText: '返回主页',
                    onOk: () => {
                        window.location = mainSite()
                    },
                })
                return data
            }
            // code '1' 时处理未登陆或登陆过期
            if (!data.success && data.code === '1') {
                Modal.error({
                    title: data.msg || data.message,
                    okText: '前往登陆',
                    onOk: () => {
                        window.location = mainSite()
                    },
                })
                return data
            }
            if (data.success === false) {
                Modal.error({
                    title: data.msg || data.message,
                })
            }
            return data
        },
        error => {
            // 如果跨域，则拿不到response
            const res = error.response
            loading.hide()

            if (res) {
                checkStatus(res)
            } else {
                Modal.error({
                    title: '请求错误',
                    content: error.toString(),
                })
            }
            Promise.reject(error)
        }
    )

    const createAPI = (url, method, config) => {
        const { params } = config
        params.sk = uuid()
        params.uk = 'y2Qmlq6dtn4HXsw6OT4auXP-6RuOJ50mhMFiM1bLtnO4x4HXkflvQxKAlivNHSrC'
        params.ver = '0.0.1'
        params.ts = Date.parse(new Date().toUTCString()) / 1000
        const paramsArr = Object.keys(params).map(key => {
            return params[key]
        })
        params.sign = md5(createSign(paramsArr))
        config.params = params

        return instance({
            url,
            method,
            ...config,
        })
    }

    return {
        createAPI,
        baseUrl,
    }
}
