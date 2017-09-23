    import $ from 'jquery';

    import * as consts from "../consts/ActionTypes";
    export function InfoTryRestoreComponent() {
      return {
        type: consts.INFO_RESTORE_COMPONENT
      };
    }

    // 发起刷新
    export function beginRefresh() {
      return (dispatch) => {
        fetchInfoGoods(0)(dispatch);
      }
    }



    export const fetchInfoGoods = (page) => {
      return (dispatch) => {
        $.ajax({
          url: '/wap/?g=WapSite&c=Exchange&a=get_canBuy_goods',
          dataType: 'json',
          type: 'post',
          'data': {
            'page': page
          },
          success: (data) => {
            dispatch({
              type: consts.INFO_GOODS_SUCCESS,
              InfoGoodsStatus: data.status,
              InfoGoodsItems: data.lists,
              InfoGoodsPage: page
            });
          },
          error: () => {
            dispatch({
              type: consts.INFO_GOODS_FAIL

            })
          }
        });
      }
    }


    //////iscrool///////