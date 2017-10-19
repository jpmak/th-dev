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
        fetchAllOrderGoods(1, '')(dispatch);
      }
    }



    export const fetchAllOrderGoods = (page, state) => {
      return (dispatch) => {
        $.ajax({
          url: '/wap/?g=WapSite&c=Exchange&a=orderList',
          dataType: 'json',
          type: 'post',
          'data': {
            'page': page,
            'state': state
          },
          success: (data) => {
              if(data.status)
       {
        dispatch({
                 type: consts.ALLORDER_GOODS_SUCCESS,
                 allOrderLoadingStatus: 2,
                     allOrderGoodsStatus: data.status,
                     allOrderList: data.list ? data.list : '',
                     allOrderGoodsPage: page
                   })
      }

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
    export const pullUpStatus = (e) => {
      return (dispatch) => {
        dispatch({
          type: consts.ALLORDER_UPDATE_PULLUP_STATUS,
          pullUpStatus: e
        });
      }
    }


    export const UpDataCateType = (type, TypeMove) => {


      return (dispatch) => {
        dispatch({
          type: consts.ALLORDER_UPDATE_CATETYPE_STATUS,
          allOrderType: type,
          TypeMove: TypeMove
        });
      };
    }

    export const backupIScrollY = (y) => {
      return {
        type: consts.ALLORDER_BACKUP_Y,
        y: y
      };
    }

    //////iscrool///////