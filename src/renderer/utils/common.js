import request from './request'
import commonUtils from './index'
// import apiUrl from '../api'

const install = (Vue) => {
  // eventBus
  Vue.prototype.$bus = new Vue()
  // Vue.prototype.$apiUrl = apiUrl
  Vue.prototype.$http = request
  Vue.prototype.$util = commonUtils
  // 上传图片显示本地图片
  Vue.prototype.$deleteWaring = (that, title, successCallback) => {
    that.$confirm(title, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      closeOnClickModal: false,
      lockScroll: false
    }).then(() => {
      successCallback()
    }).catch(() => {
      that.$message({
        type: 'info',
        message: '已取消'
      })
    })
  }
}

export default install
