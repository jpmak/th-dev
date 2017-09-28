    import $ from 'jquery';

    import * as consts from "../consts/ActionTypes";
    export function OrderDetailTryRestoreComponent() {
      return {
        type: consts.ORDERDETAIL_RESTORE_COMPONENT
      };
    }

    // 发起刷新
    export function beginRefresh() {
      return (dispatch) => {
        fetchOrderDetailGoods(1)(dispatch);
      }
    }



    export const fetchOrderDetailGoods = (page) => {
      return (dispatch) => {
        $.ajax({
          url: '/wap/?g=WapSite&c=Exchange&a=getOrderPrompt',
          dataType: 'json',
          type: 'post',
          'data': {
            'orderId': 48
          },
          success: (data) => {

            dispatch({
              type: consts.ORDERDETAIL_GOODS_SUCCESS,
              homeLoadingStatus: 2,
              InfoGoodsStatus: data.status,
              InfoGoodsItems: data.lists ? data.lists : '',
              InfoGoodsPage: page
            });

          },
          error: () => {
            dispatch({
              type: consts.ORDERDETAIL_GOODS_FAIL

            })
          }
        });
      }
    }
    export const updateOrderDetailLoadingStatus = (nextStatus) => {
      return {
        type: consts.ORDERDETAIL_UPDATE_LOADING_STATUS,
        nextStatus: nextStatus
      };
    }

    export const backupIScrollY = (y) => {
      return {
        type: consts.ORDERDETAIL_BACKUP_Y,
        y: y
      };
    }

    //////iscrool///////