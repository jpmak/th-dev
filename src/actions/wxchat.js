    import $ from 'jquery';

    // import * as consts from "../consts/ActionTypes";


    export const beginShare = (viewType, ids) => {

      return () => {
        fetchShare(viewType, ids);
      }
    }

    const fetchShare = (viewType, ids) => {
      $.ajax({
        url: '/wap/?g=WapSite&c=Exchange&a=getExchangeShare',
        type: 'POST',
        dataType: 'json',
        'data': {
          'viewType': viewType ? viewType : '',
          'ids': ids ? ids : '',

        },
        success: (data) => {
          let configData = JSON.parse(data.configData);
          let shareMessageJson = JSON.parse(data.shareMessage);
          let opt = {
            'title': shareMessageJson.title,
            'digest': shareMessageJson.digest,
            'Link': shareMessageJson.link,
            'imgUrl': shareMessageJson.img,
            'success': function() {},
            'cancel': function() {}
          };
          // console.log(opt)
          wxConfig(configData);
          // 
          setWxShare(opt, 1);
        },
        error: () => {
          console.log('加载失败');
        }
      });
    }
    const wxConfig = (data, jsApiList) => {
      if (!jsApiList)
        jsApiList = ['onMenuShareQQ', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuAddContact', 'chooseWXPay'];

      var configData = {
        'debug': false,
        'appId': data.appId, // 必填，公众号的唯一标识
        'timestamp': data.timestamp + '', // 必填，生成签名的时间戳
        'nonceStr': data.nonceStr + '', // 必填，生成签名的随机串'
        'signature': data.signature, // 必填，签名，见附录1
        'jsApiList': jsApiList
      };
      window.wx.config(configData);
    }
    const setWxShare = (opt, index) => {
        var i = 0;

        if (!index)
          index = 3;

        if (!opt.Link)
          return;

        if (setTimexxx)
          clearInterval(setTimexxx);



        var Link = opt.Link,
          shareImg = opt.imgUrl;

        var setTimexxx = setInterval(function() {


          if (i >= index)
            clearInterval(setTimexxx);

          i += 1;

          //设置QQ
          window.wx.onMenuShareQQ({
            title: opt.title, // 分享标题
            desc: opt.digest, // 分享描述
            link: Link, // 分享链接
            imgUrl: shareImg, // 分享图标
            // success: function() {
            //   if (typeof(shareSuccess) == 'function') {
            //     shareSuccess()
            //   }
            // },
            cancel: opt.cancel ? opt.cancel : function() {
              // 用户取消分享后执行的回调函数
            }
          });

          //设置微信好友
          window.wx.onMenuShareAppMessage({
            title: opt.title, // 分享标题
            desc: opt.digest, // 分享描述
            link: Link, // 分享链接
            imgUrl: shareImg, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            // success: function() {
            //   if (typeof(shareSuccess) == 'function') {
            //     shareSuccess()
            //   }
            // },
            cancel: opt.cancel ? opt.cancel : function() {
              // 用户取消分享后执行的回调函数
            }
          });

          //设置微信朋友圈
          window.wx.onMenuShareTimeline({
            title: opt.title, // 分享标题
            link: Link, // 分享链接
            imgUrl: shareImg, // 分享图标
            // success: function() {
            //   if (typeof(shareSuccess) == 'function') {
            //     shareSuccess()
            //   }
            // },
            cancel: opt.cancel ? opt.cancel : function() {
              // 用户取消分享后执行的回调函数
            }
          });
        }, 1500);
      }
      //////iscrool///////