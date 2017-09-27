    import $ from 'jquery';

    import * as consts from "../consts/ActionTypes";
    export function allOrderTryRestoreComponent() {
      return {
        type: consts.ALLORDER_RESTORE_COMPONENT
      };
    }

    // 发起刷新
    export function beginRefresh() {
      return (dispatch) => {
        fetchAllOrderGoods(0)(dispatch);
      }
    }



    export const fetchAllOrderGoods = (page) => {
      return (dispatch) => {
        $.ajax({
          url: '/wap/?g=WapSite&c=Exchange&a=get_exchange_log',
          dataType: 'json',
          type: 'post',
          'data': {
            'page': page
          },
          success: (data) => {
         
            dispatch({
              type: consts.ALLORDER_GOODS_SUCCESS,
              allOrderLoadingStatus: 2,
              allOrderGoodsStatus: data.status,
              allOrderList: data.ALLORDER_list ? data.ALLORDER_list : '',
              allOrderGoodsPage: page
            });

          },
          error: () => {
            dispatch({
              type: consts.ALLORDER_GOODS_FAIL

            })
          }
        });
      }
    }
    export const updateAllOrderLoadingStatus = (nextStatus) => {
      return {
        type: consts.ALLORDER_UPDATE_LOADING_STATUS,
        nextStatus: nextStatus
      };
    }

    export const backupIScrollY = (y) => {
      return {
        type: consts.ALLORDER_BACKUP_Y,
        y: y
      };
    }

    //////iscrool///////