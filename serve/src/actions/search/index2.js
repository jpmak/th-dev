    import $ from 'jquery';

    export const MSG_APP_RESTORE_COMPONENT = 'MSG_APP_RESTORE_COMPONENT'
    export const APPBANNERGET = 'APPBANNERGET'
    export const FETCHBANNER_SUCCESS = 'FETCHBANNER_SUCCESS'



    // 发起刷新
    export function beginRefresh() {
      return (dispatch) => {
        // 同步更新下拉状态
        dispatch({
          type: MSG_APP_RESTORE_COMPONENT
        });
        // 异步网络请求
        fetchBanner(0);
      }
    }


    function fetchBanner(page, dispatch) {
      setTimeout(() => { // 模拟延迟0.5秒
        $.ajax({
          url: '/wap/?g=WapSite&c=Exchange&a=search_goods',
          type: 'POST',
          data: {
            page: page,
            keyword: 1,
            volume: '',
            by: ''
          },
          dataType: 'json',
          success: (data) => {
            dispatch({
              type: FETCHBANNER_SUCCESS,
              bannerItems: data.goods_list,
            });

          },
          error: () => {
            console.log('加载失败');
          }
        });
      }, 500);
    }