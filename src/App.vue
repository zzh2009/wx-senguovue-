<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  }
}
</script>

<style>
/**app.wxss**/

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  box-sizing: border-box;
}

page {
  background-color: #f0f4f0;
  font-family: "Helvetica Neue", "Microsoft YaHei", Arial;
  color: #333;
  font-size: 15px;
}

.text-center {
  text-align: center;
  align-items: center;
}

.clip {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.inline {
  display: inline-block;
}

.mr2 {
  margin-right: 2px;
}

.mr20 {
  margin-right: 20px;
}

.mt10 {
  margin-top: 10px;
}
.mt40{
    margin-top: 80rpx;
}
.mtr20 {
  margin-top: 20rpx;
}

.mt30 {
  margin-top: 30px;
}

.mb10 {
  margin-bottom: 10px;
}

.mb20 {
  margin-bottom: 20px;
}

.pb10 {
  padding-bottom: 10px;
}

.pb6 {
  padding-bottom: 6px;
}

.fr {
  float: right;
}

.f12 {
  font-size: 12px;
}

.f16 {
  font-size: 16px;
}

.c999 {
  color: #999;
}

.cfff {
  color: #fff;
}

.text-red {
  color: #f66;
}

.text-yellow {
  color: #fec306;
}

.bgfff {
  background: #fff;
}

.plr10 {
  padding: 0 10px;
}

.ptb10 {
  padding-top: 10px;
  padding-bottom: 10px;
}

.wrap-nav-copyring {
  display: inline-block;
  height: 40px;
  width: 90px;
  margin: 20px 0;
}

.copy-img {
  display: inline-block;
  height: 40px;
  width: 90px;
}

.borderbottom {
  border-bottom: 1px solid #ddd;
}

.height40 {
  height: 40px;
  line-height: 40px;
}

.height30 {
  height: 30px;
  line-height: 30px;
}

view[hidden] {
  display: none !important;
}

.item {
  padding-left: 80px;
  position: relative;
}

.item-title {
  position: absolute;
  left: 0;
}
.input-placeholder {
  line-height: 40px;
}
input {
  height: 100%;
}
/*更多信息*/
.right-more-info {
    position: relative;
    padding-right: 28rpx;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAcBAMAAACaHyIpAAAAD1BMVEUAAACZmZmZmZmZmZmZmZnwkG6qAAAABHRSTlMAn88QFAlCsgAAACRJREFUCNdjMBJggAAVRyhDxAUqxOhCayE4Ay5FMwGEB+FeBgAkiQx3pOnKfQAAAABJRU5ErkJggg==") no-repeat center right/16rpx 28rpx;
}
/*弹出框*/
.notice {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 9999;
  width: 60%;
  height: auto;
  text-align: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border-radius: 4px;
  margin: 0 auto;
}

</style>
