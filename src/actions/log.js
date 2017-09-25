    import $ from 'jquery';

    import * as consts from "../consts/ActionTypes";
    export function logTryRestoreComponent() {
      return {
        type: consts.LOG_RESTORE_COMPONENT
      };
    }

    // 发起刷新
    export function beginRefresh() {
      return (dispatch) => {
        fetchLogGoods(0)(dispatch);
      }
    }



    export const fetchLogGoods = (page) => {
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
              type: consts.LOG_GOODS_SUCCESS,
              logLoadingStatus: 2,
              LogGoodsStatus: data.status,
              logList: data.log_list ? data.log_list : '',
              logGoodsPage: page
            });

          },
          error: () => {
            dispatch({
              type: consts.LOG_GOODS_FAIL

            })
          }
        });
      }
    }
    export const updateLogLoadingStatus = (nextStatus) => {
      return {
        type: consts.LOG_UPDATE_LOADING_STATUS,
        nextStatus: nextStatus
      };
    }

    export const backupIScrollY = (y) => {
      return {
        type: consts.LOG_BACKUP_Y,
        y: y
      };
    }

    //////iscrool///////