import axios from 'axios'

export default function request(url, config) {
    if (url.indexOf('//') === -1) {
        if (process.env.NODE_ENV === 'production') {
            url = '//stblog.ltyun.cc/api' + url
        } else {
            //本地
            url = '//' + window.location.host + 'api' + url
        }
    }

    config = config || { method: 'get' }
    config.method = config.method || 'get'
    // 在请求参数中添加信息
    let mdParams = config.params || {}
    // 添加时间戳
    mdParams.ts = Date.parse(new Date().toUTCString()) / 1000
    mdParams.ver = '0.0.1'
    // mdParams.sk = uuid();

    if (config.method.toLowerCase() === 'get') {
        config.params = config.params || {}
        config.params.time = new Date().getTime()
        return new Promise(function(resolve, reject) {
            axios.ajax({
                url: url,
                data: config.params,
                type: 'GET',
                cache: false,
                xhrFields: {
                    withCredentials: true,
                },
                dataType: 'json',
                success: function(data) {
                    resolve(data)
                },
                error: function() {
                    reject('异常')
                },
            })
        })
    } else {
        return new Promise(function(resolve, reject) {
            axios.ajax({
                url: url,
                data: config.params,
                type: 'POST',
                cache: false,
                xhrFields: {
                    withCredentials: true,
                },
                dataType: 'json',
                success: function(data) {
                    resolve(data)
                },
                error: function() {
                    reject('异常')
                },
            })
        })
    }
}
