    import $ from 'jquery';

    import * as consts from "../consts/ActionTypes";
    export function OrderDetailTryRestoreComponent() {
      return {
        type: consts.ORDERDETAIL_RESTORE_COMPONENT
      };
    }

    // 发起刷新
    export function beginRefresh(numId) {
      return (dispatch) => {
        fetchOrderDetailGoods(numId)(dispatch);
      }
    }



    export const fetchOrderDetailGoods = (numId) => {
      return (dispatch) => {
        $.ajax({
          url: '/wap/?g=WapSite&c=Exchange&a=getOrderPrompt',
          dataType: 'json',
          type: 'post',
          'data': {
            'orderId': numId
          },
          success: (data) => {
            dispatch({
              type: consts.ORDERDETAIL_GOODS_SUCCESS,
              orderDetailLoadingStatus: 2,
              orderInfoItems: data.orderInfo ? data.orderInfo : '',
              orderConsigneeItems: data.consignee ? data.consignee : '',
              orderDelivery: data.delivery ? data.delivery : '',
              trackInfoContext: data.delivery ? data.delivery.track.info : '',
              trackInfoTime: data.delivery ? data.delivery.track.info : '',


              // trackInfoContext: data.delivery ? data.delivery.track.info[0].context : '',
              // trackInfoTime: data.delivery ? data.delivery.track.info[0].tmie : '',



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