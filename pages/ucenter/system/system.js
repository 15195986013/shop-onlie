var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

var app = getApp();

Page({
  data: {
    array: [],
    shopName: "",
    index: 0,
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function(options) {},
  onReady: function() {

  },
  onShow: function() {

  },
  onHide: function() {

  },
  onUnload: function() {
     
  }
})