//url:string 请求的地址
//query:object 请求携带的参数
//callback:function 成功之后的回调
//isJson:boolean 是否需要解析Json
var util = {
    //GET
    get: function (url, query, callback, isJson) {
        if (query) {
            url += '?'
            for (var key in query) {
                url += `${key}=${query[key]}&`
            }
            //取出多余的&
            url = url.slice(0, -1)
        }
        var xhr = new XMLHttpRequest()
        xhr.open('get', url)
        xhr.send()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var res = isJson ? Json.parse(xhr.responseText) : xhr.responseText
                callback(res)
            }
        }
    },
    //POST
    post: function (url, query, callback, isJson) {
        //如果有参数把参数拼接起来
        var str = ''
        if (query) {
            for (var key in query) {
                str += `${key}=${query[key]}&`
            }
            //取出多余的&
            str = str.slice(0, -1)
        }
        var xhr = new XMLHttpRequest()
        xhr.open('post', url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(str)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var res = isJson ? Json.parse(xhr.responseText) : xhr.responseText
                callback(res)
            }
        }
    },
    //总
    ajax: function (params) {
        var xhr = new XMLHttpRequest()
        if (params.method.toLowerCase() === 'get') {
            if (params.query) {
                params.url += '?'
                for (var key in params.query) {
                    params.url += `${key}=${params.query[key]}&`
                }
                params.url = params.url.slice(0, -1)
            }
            xhr.open(params.method, params)
            xhr.send()
        } else {
            //post
            var str = ''
            if (params.query) {
                for (var key in params.query) {
                    str += `${key}=${params.query[key]}&`
                }
                str = str.slice(0, -1)
            }
            xhr.open('post', params.url)
            xhr.send(str)
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var resp = params.isJson ? Json.parse(xhr.responseText) : xhr.responseText
                params.callback(resp)
            }
        }
    }
}