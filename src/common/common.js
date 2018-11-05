/******************************公用函数*******************************/
export const getMathFloat = (num) => {
    return Math.round(num * 100) / 100;
}
export const getGoodsImg = (url, size) => {
    //本地商品图片添加完整路径
    let reg = /http/;
    if (!reg.test(url)) {
        url = 'http://static.senguo.cc' + url;
    }
    if (size) {
        url += '?imageView2/1/w/' + size + '/h/' + size;
    }
    return url;
}
export const noticeBox = (text, o, count) => {
    let _this = o;
    count = parseInt(count) ? parseInt(count) : 2000;
    _this.setData({
        notice_str: text,
        notice_hidden: false,
    });
    setTimeout(function () {
        _this.setData({
            notice_hidden: true
        });
    }, count);
}