var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');



var app = getApp();

Page({
  data: {
    mobile: '',
    content: '',
    array: ['请选择反馈类型', '商品相关', '物流状况', '客户服务', '优惠活动', '功能异常', '产品建议', '其他'],
    index: 0,
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  updateMobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  updateContent(e){
    this.setData({
      content:e.detail.value
    })
  },
  addFeedBack(event){
   
   var that = this;
    util.request(api.AddFeedback,{
      content:that.data.content,
      mobile: that.data.mobile,
      msg_type: that.data.index,
    },function(resp){

    }).then(function(resp){
      if (res.errno === 0) {
        wx.showToast({
          title: '已反馈，工作人员正在处理中',
        })
      }

    })
  },
  onLoad: function (options) {
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  }
})