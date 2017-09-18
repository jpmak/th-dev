    import $ from 'jquery';
    export const SEARCHPAGE_REDDIT = 'SEARCHPAGE_REDDIT'
    export const REQUESTPAGE_POSTS = 'REQUESTPAGE_POSTS'

    export const RECEIVEPAGE_POSTS = 'RECEIVEPAGE_POSTS'
    export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

    export const MSG_LIST_PAGE_TRY_RESTORE_COMPONENT = 'MSG_LIST_PAGE_TRY_RESTORE_COMPONENT';
    export const MSG_LIST_PAGE_FETCH_ITEMS_SUCCESS = 'MSG_LIST_PAGE_FETCH_ITEMS_SUCCESS';
    export const MSG_LIST_PAGE_FETCH_ITEMS_FAIL = 'MSG_LIST_PAGE_FETCH_ITEMS_FAIL';
    export const MSG_LIST_PAGE_UPDATE_PULLDOWN_STATUS = 'MSG_LIST_PAGE_UPDATE_PULLDOWN_STATUS';
    export const MSG_LIST_PAGE_UPDATE_PULLUP_STATUS = 'MSG_LIST_PAGE_UPDATE_PULLUP_STATUS';
    export const MSG_LIST_PAGE_KEYWORD = 'MSG_LIST_PAGE_KEYWORD';
    export const MSG_LIST_PAGE_VOLUME = 'MSG_LIST_PAGE_VOLUME';
    export const MSG_LIST_PAGE_PRICE = 'MSG_LIST_PAGE_PRICE';
    export const MSG_LIST_UPDATE_SEARCHNUM = 'MSG_LIST_UPDATE_SEARCHNUM';

    export const MSG_LIST_PAGE_BACKUP_ISCROLL_Y = 'MSG_LIST_PAGE_BACKUP_ISCROLL_Y';
    export const MSG_LIST_PAGE_UPDATE_LOADING_STATUS = 'MSG_LIST_PAGE_UPDATE_LOADING_STATUS';

    /**
     * 恢复组件的状态
     * @returns {{type}}
     */
    //////iscroll///////
    export function tryRestoreComponent() {
      return {
        type: MSG_LIST_PAGE_TRY_RESTORE_COMPONENT
      };
    }

    function _fetchItems(page, keyword, volume, price, dispatch) {
      setTimeout(() => { // 模拟延迟0.5秒
        $.ajax({
          url: '/wap/?g=WapSite&c=Exchange&a=search_goods',
          data: {
            page: page,
            keyword: keyword,
            volume: volume,
            by: price
          },
          type: 'POST',
          dataType: 'json',
          success: (data) => {

            dispatch({
              type: MSG_LIST_PAGE_FETCH_ITEMS_SUCCESS,
              items: data.goods_list,
              page: page,
              pageStatus: data.status
            });

          },
          error: () => {
            dispatch({
              type: MSG_LIST_PAGE_FETCH_ITEMS_FAIL,
              page: page
            });
          }
        });
      }, 500);
    }


    // 发起刷新
    export function beginRefresh() {
      return (dispatch, getState, volume, ) => {
        // 同步更新下拉状态
        dispatch({
          type: MSG_LIST_PAGE_UPDATE_PULLDOWN_STATUS,
          nextPullDownStatus: 3
        });
        // 异步网络请求
        _fetchItems(0, getState().MsgListPageReducer.keyword, getState().MsgListPageReducer.volume, getState().MsgListPageReducer.price, dispatch);
      }
    }

    // 发起加载更多
    export function beginLoad() {
      return (dispatch, getState) => {
        // 同步更新下拉状态
        dispatch({
          type: MSG_LIST_PAGE_UPDATE_PULLUP_STATUS,
          nextPullUpStatus: 2
        });
        // 异步网络请求
        _fetchItems(getState().MsgListPageReducer.page, getState().MsgListPageReducer.keyword, getState().MsgListPageReducer.volume, getState().MsgListPageReducer.price, dispatch);
      };
    }
    // 更新loading状态
    export function updateLoadingStatus(nextStatus) {
      return {
        type: MSG_LIST_PAGE_UPDATE_LOADING_STATUS,
        nextStatus: nextStatus
      };
    }

    // 更新下拉状态
    export function updatePullDownStatus(nextPullDownStatus) {
      return {
        type: MSG_LIST_PAGE_UPDATE_PULLDOWN_STATUS,
        nextPullDownStatus: nextPullDownStatus
      };
    }
    // 更新上拉状态
    export function updatePullUpStatus(nextPullUpStatus) {
      return {
        type: MSG_LIST_PAGE_UPDATE_PULLUP_STATUS,
        nextPullUpStatus: nextPullUpStatus
      };
    }
    // 更新滚动条长度

    export function backupIScrollY(y) {
      return {
        type: MSG_LIST_PAGE_BACKUP_ISCROLL_Y,
        y: y
      };
    }


    export function getKeyword(keyword) {
      return {
        type: MSG_LIST_PAGE_KEYWORD,
        keyword: keyword
      };
    }
    export function volume(volume) {
      return {
        type: MSG_LIST_PAGE_VOLUME,
        volume: volume
      };
    }
    export function price(price) {
      return {
        type: MSG_LIST_PAGE_PRICE,
        price: price
      };
    }

    export function searchNum() {
      return {
        type: MSG_LIST_UPDATE_SEARCHNUM
      };
    }

    //////iscrool///////

    export const searchPageReddit = reddit => ({
      type: SEARCHPAGE_REDDIT,
      reddit
    })
    export const requestPagePosts = reddit => ({
      type: REQUESTPAGE_POSTS,
      reddit
    })
    export const invalidateReddit = reddit => ({
      type: INVALIDATE_REDDIT,
      reddit
    })
    export const receivePagePosts = (reddit, data) => ({
      type: RECEIVEPAGE_POSTS,
      reddit,
      posts: data.goods_list,
      status: data.status
    })

    export const fetchPosts = reddit => dispatch => {
      dispatch(requestPagePosts(reddit))
      $.ajax({
        // url: '/wap/?g=WapSite&c=Exchange&a=search_goods',
        data: {
          page: `${reddit}`

        },
        type: 'POST',
        dataType: 'json',
        success: (data) => {

          dispatch(receivePagePosts(reddit, data))

        }
      });


    }

    export const shouldFetchPosts = (state, reddit) => {
      const posts = state.postsByReddit[reddit]
      if (!posts) {
        return true
      }
      if (posts.isFetching) {
        return false
      }
      return posts.didInvalidate
    }

    export const fetchPostsIfNeeded = reddit => (dispatch, getState) => {
      // if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit))
        // }
    }