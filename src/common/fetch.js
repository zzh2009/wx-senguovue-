import global_store from '@/pages/login/store'

class request {
    constructor() {
        this._header = {}
    }

    /**
     * 设置统一的异常处理
     */
    setErrorHandler(handler) {
        this._errorHandler = handler;
    }

    /**
     * GET类型的网络请求
     */
    get(url, data, header = this._header) {
        return this.requestAll(url, data, header, 'GET')
    }

    /**
     * DELETE类型的网络请求
     */
    delete(url, data, header = this._header) {
        return this.requestAll(url, data, header, 'DELETE')
    }

    /**
     * PUT类型的网络请求
     */
    put(url, data, header = this._header) {
        return this.requestAll(url, data, header, 'PUT')
    }

    /**
     * POST类型的网络请求
     */
    post(url, data, header = this._header) {
        return this.requestAll(url, data, header, 'POST')
    }

    /**
     * 网络请求
     */
    requestAll(url, data = {}, header, method = 'GET') {
        let cookie = wx.getStorageSync('cookie');
        if (cookie) {
            header['Cookie'] = cookie;
        }
        header['Content-Type'] = 'application/json'
        return new Promise((resolve, reject) => {
            wx.request({
                url: global_store.state.globalData.API_URL + url,
                data: data,
                method: method,
                header: header,
                success: (res => {
                    if (res.statusCode == 200) {
                        if (url == "/customer/applet/login") { //登录时才设置cookie
                            let cookies = {};
                            let multi_ck = res.header['Set-Cookie'].split('Path=/,')
                            for (let multi_key in multi_ck) {
                                let kv = multi_ck[multi_key].split(';');
                                for (let key in kv) {
                                    let ck = kv[key];
                                    let first_index = ck.indexOf('=');
                                    let ck_len = ck.length;
                                    let key = ck.substring(0, first_index);
                                    let value = ck.substring(first_index, ck_len);
                                    if (key) {
                                        cookies[key] = value;
                                    }
                                }
                            }
                            let str = '';
                            for (let k in cookies) {
                                str += k + cookies[k] + ';';
                            }
                            wx.setStorageSync('cookie', str);
                        }
                        resolve(res.data)
                    } else {
                        wx.showModal({
                            title: '系统提示',
                            content: '内部发生错误，有人要扣奖金了！',
                            confirmText: '重新载入',
                            showCancel: false,
                            success: res => {
                                if (res.confirm) {
                                    wx.removeStorageSync('cookie');
                                    wx.reLaunch({
                                        url: '/pages/start/start',
                                    });
                                }
                            }
                        });
                        this._errorHandler(res)
                    }
                }),
                fail: (res => {
                    if (this._errorHandler != null) {
                        this._errorHandler(res)
                    }
                    reject(res)
                })
            })
        })
    }
}




export default request
