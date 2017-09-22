    import $ from 'jquery';
    import './search.js'
    import * as consts from "../consts/ActionTypes";
    export function tryRestoreComponent() {
      return {
        type: consts.APP_RESTORE_COMPONENT
      };
    }
    // 发起刷新
    export const beginRefresh = () => {
      return (dispatch) => {

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


    const fetchUser = (dispatch) => {
      $.ajax({
        url: '/wap/?g=WapSite&c=Exchange&a=user_info',
        // type: 'POST',
        dataType: 'json',
        success: (data) => {

          dispatch({
            type: consts.FETCHUSERINFO_SUCCESS,
            userStatus: data.status,
            userMoney: data.info ? data.info.user_money : '',
            userBuy: data.info ? data.info.banana : '',
            UserTourism: (data.info) ? data.info.user_tourism : '',
          });
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
            bannerItems: data.bann_top.advList,
            bannerItems_2: data.bann_foo1.advList
          });
        },
        error: () => {
          console.log('加载失败');
        }
      });
    }

    const fetchSalse = (dispatch) => {
      fetch('/wap/?g=WapSite&c=Exchange&a=sales_volume', {
          method: 'POST',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: consts.FETCHSALSE_SUCCESS,
            salesItems: data.goods_list
          });

        })
        .catch(function(e) {
          console.log("加载失败");
        });
    }


    const fetchCateList = (dispatch, getState) => {
      fetch('/wap/?g=WapSite&c=Exchange&a=get_cate_list', {
          method: 'POST',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: consts.FETCHCATELIST_SUCCESS,
            cateList: data.cate_list,
          });
          fetchCateGoods(data.cate_list[0].cate_id, 0)(dispatch);
        })
        .catch(function(e) {
          console.log("加载失败");
        });
    }

    export const fetchCateGoods = (id, page) => {
      return (dispatch) => {
        fetch('/wap/?g=WapSite&c=Exchange&a=get_cate_goods', {
            method: 'POST',
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: 'cate_id=' + id + '&page=' + page
          })
          .then((res) => res.json())
          .then((data) => {
            dispatch({
              type: consts.FETCHCATEGOODS_SUCCESS,

              cateGoods: data.goods_list,
              pageStatus: data.status,

              CateGoodsPage: page
            });
          })
          .catch(function(e) {
            console.log("加载失败");
          });
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