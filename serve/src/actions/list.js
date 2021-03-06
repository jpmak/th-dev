    import * as consts from "../consts/ActionTypes";
    import $ from 'jquery';

    export function ListTryRestoreComponent() {
      return {
        type: consts.LIST_RESTORE_COMPONENT
      };
    }

    // 发起刷新
    export function beginRefresh() {
      return (dispatch) => {
        fetchListNav(dispatch);
      }
    }

    const fetchListNav = (dispatch, getState) => {

      $.ajax({
        url: '/wap/?g=WapSite&c=Exchange&a=get_cate_list',
        type: 'POST',
        dataType: 'json',
        success: (data) => {
          dispatch({
            type: consts.LIST_NAV_SUCCESS,
            navStatus: data.status,
            navItems: data.cate_list,

          });
          fetchListGoods(0, data.cate_list[0].cate_id)(dispatch);

        },
        error: () => {
          dispatch({
            type: consts.LIST_NAV_FAIL,
          });
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
      //       type: consts.LIST_NAV_SUCCESS,
      //       navStatus: data.status,
      //       navItems: data.cate_list,

      //     });

      //     fetchListGoods(0, data.cate_list[0].cate_id)(dispatch);
      //   })

      // .catch(() => {
      //   dispatch({
      //     type: consts.LIST_NAV_FAIL,

      //   });
      // })
    }



    export const fetchListGoods = (e, id) => {
        return (dispatch) => {

          $.ajax({
            url: '/wap/?g=WapSite&c=Exchange&a=get_cate_child',
            type: 'POST',
            dataType: 'json',
            'data': {
              'cate_id': id
            },
            success: (data) => {
              dispatch({
                pushIndex: e,
                type: consts.LIST_GOODS_SUCCESS,
                goodItems: data.cate_list,
              });
              changeLoading(0);

            },
            error: () => {
              dispatch({
                type: consts.LIST_GOODS_FAIL,
              });
            }
          });



          // fetch('/wap/?g=WapSite&c=Exchange&a=get_cate_child', {
          //     method: 'POST',
          //     headers: {
          //       "Content-Type": "application/x-www-form-urlencoded"
          //     },
          //     body: 'cate_id=' + id
          //   })
          //   .then((res) => res.json())
          //   .then((data) => {

          //     dispatch({
          //       pushIndex: e,
          //       type: consts.LIST_GOODS_SUCCESS,
          //       goodItems: data.cate_list,
          //     });

          //     changeLoading(0);

          //   })
          //   .catch(() => {
          //     dispatch({
          //       type: consts.LIST_GOODS_FAIL

          //     })
          //   })
        }
      }
      // 更新loading状态
    export function updateListLoadingStatus(nextStatus) {
      return {
        type: consts.LIST_UPDATE_LOADING_STATUS,
        nextStatus: nextStatus
      };
    }
    export function changeLoading(nextStatus) {

      return {
        type: consts.LIST_GOODS_UPDATE_CHANGE_STATUS,
        changeLoading: nextStatus
      };
    }

    export const backupY = (y) => {
      return {
        type: consts.LIST_BACKUP_Y,
        y: y
      };
    }