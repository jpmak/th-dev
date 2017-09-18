    import $ from 'jquery';

    import * as consts from "../consts/ActionTypes";


    //////iscroll///////
    export function SearchTryRestoreComponent() {
      return {
        type: consts.MSG_LIST_PAGE_TRY_RESTORE_COMPONENT
      };
    }

    function _fetchItems(page, keyword, volume, price, cate_id, dispatch) {
      setTimeout(() => { // 模拟延迟0.5秒
        $.ajax({
          url: '/wap/?g=WapSite&c=Exchange&a=search_goods',
          data: {
            page: page,
            keyword: keyword,
            volume: volume,
            by: price,
            cate_id: cate_id,
          },
          type: 'POST',
          dataType: 'json',
          success: (data) => {

            dispatch({
              type: consts.MSG_LIST_PAGE_FETCH_ITEMS_SUCCESS,
              items: data.goods_list,
              page: page,
              pageStatus: data.status
            });

          },
          error: () => {
            dispatch({
              type: consts.MSG_LIST_PAGE_FETCH_ITEMS_FAIL,
              page: page
            });
          }
        });
      }, 500);
    }


    // 发起刷新
    export function SearchBeginRefresh() {
      return (dispatch, getState, volume, ) => {
        // 同步更新下拉状态
        dispatch({
          type: consts.MSG_LIST_PAGE_UPDATE_PULLDOWN_STATUS,
          nextPullDownStatus: 3
        });
        // 异步网络请求
        _fetchItems(0, getState().MsgListPageReducer.keyword, getState().MsgListPageReducer.volume, getState().MsgListPageReducer.price, getState().MsgListPageReducer.cate_id, dispatch);
      }
    }

    // 发起加载更多
    export function beginLoad() {
      return (dispatch, getState) => {
        // 同步更新下拉状态
        dispatch({
          type: consts.MSG_LIST_PAGE_UPDATE_PULLUP_STATUS,
          nextPullUpStatus: 2
        });
        // 异步网络请求
        _fetchItems(getState().MsgListPageReducer.page, getState().MsgListPageReducer.keyword, getState().MsgListPageReducer.volume, getState().MsgListPageReducer.price, getState().MsgListPageReducer.cate_id, dispatch);
      };
    }
    // 更新loading状态
    export function updateLoadingStatus(nextStatus) {
      return {
        type: consts.MSG_LIST_PAGE_UPDATE_LOADING_STATUS,
        nextStatus: nextStatus
      };
    }

    // 更新下拉状态
    export function updatePullDownStatus(nextPullDownStatus) {
      return {
        type: consts.MSG_LIST_PAGE_UPDATE_PULLDOWN_STATUS,
        nextPullDownStatus: nextPullDownStatus
      };
    }
    // 更新上拉状态
    export function updatePullUpStatus(nextPullUpStatus) {
      return {
        type: consts.MSG_LIST_PAGE_UPDATE_PULLUP_STATUS,
        nextPullUpStatus: nextPullUpStatus
      };
    }
    // 更新滚动条长度

    export function backupIScrollY(y) {
      return {
        type: consts.MSG_LIST_PAGE_BACKUP_ISCROLL_Y,
        y: y
      };
    }


    export function getKeyword(keyword) {
      return {
        type: consts.MSG_LIST_PAGE_KEYWORD,
        keyword: keyword
      };
    }
    export function cate_id(cate_id) {
      return {
        type: consts.MSG_LIST_PAGE_CATE_ID,
        cate_id: cate_id
      };
    }
    export function volume(volume) {
      return {
        type: consts.MSG_LIST_PAGE_VOLUME,
        volume: volume
      };
    }
    export function price(price) {
      return {
        type: consts.MSG_LIST_PAGE_PRICE,
        price: price
      };
    }

    export function searchNum() {
      return {
        type: consts.MSG_LIST_UPDATE_SEARCHNUM
      };
    }

    //////iscrool///////