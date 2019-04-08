var app = getApp();
var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
    data: {
        orderId: '6f2eb93eff4f49f4a246da68d9d490a9',
        actualPrice: 0.10
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.setData({
            orderId: options.orderId,
            actualPrice: options.actualPrice
        })
    },
    onReady: function () {

    },
    onShow: function () {
        // 页面显示

    },
    onHide: function () {
        // 页面隐藏

    },
    onUnload: function () {
        // 页面关闭

    },
    //向服务请求支付参数
    requestPayParam() {
        let that = this;
        util.request(api.PayPrepayId, {
            orderId: that.data.orderId,
            payType: 1
        }).then(function (res) {
            if (res.errno === 0) {
                let payParam = res.data;
                wx.requestPayment({
                    'timeStamp': payParam.timeStamp,
                    'nonceStr': payParam.timeStamp,
                    'package': payParam.nonceStr,
                    'signType': payParam.signType,
                    'paySign': payParam.paySign,
                    'success': function (res) {
                        if (res.errno === 0) {
                            util.request(api.OrderUpdate, {
                                orderId: that.data.orderId,
                                payType: 1
                            }).then(function (res) {
                                if (res.errno === 0) {
                                    wx.redirectTo({
                                        url: '/pages/payResult/payResult?status=true',
                                    })
                                }
                            });
                        }
                    },
                    'fail': function (res) {
                        wx.redirectTo({
                            url: '/pages/payResult/payResult?status=false',
                        })
                    }
                })
            } else {
                util.showErrorToast(res.errmsg)
            }
        });
    },
    startPay() {
        this.requestPayParam();
    }
});