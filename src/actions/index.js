    import $ from 'jquery';
    import './search.js'
    // import wx from 'react-jweixin';
    import * as consts from "../consts/ActionTypes";
    export function tryRestoreComponent() {
      return {
        type: consts.APP_RESTORE_COMPONENT
      };
    }
    // 发起刷新
    export const beginRefresh = () => {
      return (dispatch, config) => {

        // 异步网络请求
        fetchBanner(dispatch);
        fetchSalse(dispatch);
        fetchCateList(dispatch);
        fetchUser(dispatch);

      }
    }

    export const beginUser = () => {

      return (dispatch) => {
        fetchUser(dispatch);
      }
    }

    // let config = wx.config();
    // console.log(config)
    // 
    // const fetchWx = (shareMessageJson) => {
    //   console.log(shareMessageJson)
    //   window.wxConfig(shareMessageJson, 1);
    // }

    const fetchUser = (dispatch) => {
      $.ajax({
        url: '/wap/?g=WapSite&c=Exchange&a=user_info',
        // type: 'POST',
        dataType: 'json',
        success: (data) => {
          dispatch({
            type: consts.FETCHUSERINFO_SUCCESS,
            userStatus: data.status,
            userName: data.user_info ? data.user_info.user_name : '',
            userMoney: data.buy_info ? data.buy_info.discharge_point : '',
            userBuy: data.buy_info ? data.buy_info.point : '',
            userTourism: data.buy_info ? data.buy_info.tourism : '',
            money: data.buy_info ? data.buy_info.user_money : '',
          });
          window.localStorage.user_info = data.status
        },
        error: () => {

          console.log('加载失败');
        }
      });
    }

    const fetchBanner = (dispatch) => {
      $.ajax({
        url: '/wap/?g=WapSite&c=Exchange&a=get_index_Banner',
        type: 'POST',
        dataType: 'json',
        success: (data) => {
          dispatch({
            type: consts.FETCHBANNER_SUCCESS,
            bannerItems: data.bann_top ? data.bann_top.advList : '',
            bannerItems_2: data.bann_foo1 ? data.bann_foo1.advList : ''
          });
        },
        error: () => {
          console.log('加载失败');
        }
      });
    }

    const fetchSalse = (dispatch) => {
      $.ajax({
        url: '/wap/?g=WapSite&c=Exchange&a=sales_volume',
        dataType: 'json',
        type: 'post',
        success: (data) => {
          dispatch({
            type: consts.FETCHSALSE_SUCCESS,
            salesItems: data.goods_list
          });
        },
        error: () => {
          console.log("加载失败");
        }
      });

      // fetch('/wap/?g=WapSite&c=Exchange&a=sales_volume', {
      //     method: 'POST',
      //     headers: {
      //       "Content-Type": "application/x-www-form-urlencoded"
      //     }
      //   })
      //   .then((res) => res.json())
      //   .then((data) => {

      //     dispatch({
      //       type: consts.FETCHSALSE_SUCCESS,
      //       salesItems: data.goods_list
      //     });

      //   })
      //   .catch(function(e) {
      //     console.log("加载失败");
      //   });
    }


    const fetchCateList = (dispatch, getState) => {
      $.ajax({
        url: '/wap/?g=WapSite&c=Exchange&a=get_cate_list',
        dataType: 'json',
        type: 'post',

        success: (data) => {
          dispatch({
            type: consts.FETCHCATELIST_SUCCESS,
            // cateId: data.cate_list[0].cate_id
            cateList: data.cate_list,
          });
          getCateId(data.cate_list[0].cate_id)(dispatch);
          fetchCateGoods(data.cate_list[0].cate_id, 0)(dispatch);

        },
        error: () => {
          console.log("加载失败");
        }
      });

      // fetch('/wap/?g=WapSite&c=Exchange&a=get_cate_list', {
      //     method: 'POST',
      //     headers: {
      //       "Content-Type": "application/x-www-form-urlencoded"
      //     }
      //   })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     dispatch({
      //       type: consts.FETCHCATELIST_SUCCESS,
      //       // cateId: data.cate_list[0].cate_id
      //       cateList: data.cate_list,
      //     });
      //     getCateId(data.cate_list[0].cate_id)(dispatch);
      //     fetchCateGoods(data.cate_list[0].cate_id, 0)(dispatch);
      //   })
      //   .catch(function(e) {
      //     console.log("加载失败");
      //   });
    }

    export const fetchCateGoods = (id, page) => {
      return (dispatch) => {
        $.ajax({
          url: '/wap/?g=WapSite&c=Exchange&a=get_cate_goods',
          dataType: 'json',
          type: 'post',
          'data': {
            'cate_id': id,
            'page': page,
            'size': 6
          },
          success: (data) => {
            dispatch({
              type: consts.FETCHCATEGOODS_SUCCESS,
              cateGoods: data.goods_list,
              pageStatus: data.status,
              CateGoodsPage: page
            });
          },
          error: () => {
            console.log("加载失败");
          }
        });

        // fetch('/wap/?g=WapSite&c=Exchange&a=get_cate_goods', {
        //     method: 'POST',
        //     headers: {
        //       "Content-Type": "application/x-www-form-urlencoded"
        //     },
        //     body: 'cate_id=' + id + '&page=' + page
        //   })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     dispatch({
        //       type: consts.FETCHCATEGOODS_SUCCESS,

        //       cateGoods: data.goods_list,
        //       pageStatus: data.status,

        //       CateGoodsPage: page
        //     });
        //   })
        //   .catch(function(e) {
        //     console.log("加载失败");
        //   });
      }
    }

    export const getCateId = (id) => {


      return (dispatch) => {
        dispatch({
          type: consts.UPDATE_CATEID_STATUS,
          cateId: id
        });
      };
    }
    export const pullUpStatus = (e) => {
      return (dispatch) => {
        dispatch({
          type: consts.UPDATE_PULLUP_STATUS,
          pullUpStatus: e
        });
      }
    }
    export const liMove = (index, widths, width) => {
      return (dispatch) => {
        dispatch({
          type: consts.UPDATE_LIEVENT_STATUS,
          pushIndex: index,
          moveWidths: widths,
          liWidth: width

        });
      }
    }
    export const backupIScrollY = (y) => {
      return {
        type: consts.APP_BACKUP_ISCROLL_Y,
        y: y
      };
    }

    export const scrollUp = {
      getScrollTop: () => {
        return (dispatch) => {
          var scrollTop = 0;
          if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
          } else if (document.body) {
            scrollTop = document.body.scrollTop;
          }
          return scrollTop;
        }
      },
      getClientHeight: () => {
        return (dispatch) => {
          var windowHeight = 0;
          if (document.compatMode === "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
          } else {
            windowHeight = document.body.clientHeight;
          }

          return windowHeight;
        }
      },
      getScrollHeight: () => {
        return (dispatch) => {
          var scrollHeight = 0,
            bodyScrollHeight = 0,
            documentScrollHeight = 0;
          if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
          }
          if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
          }
          scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
          return scrollHeight;
        }
      }

    }