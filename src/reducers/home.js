import * as consts from "../consts/ActionTypes";
// 组件初始化状态，其实就是把component的constructor的挪到这里就完事了
const homeInitState = {
  homeLoadingStatus: 1, // [1]首屏加载状态 [2]非首次进去 [3]加载失败 [4]没有数据放回首页
  InfoGoodsStatus: 1, // 内容状态
  InfoGoodsItems: [], // 列表内容
  InfoGoodsPage: 0, //页数
  pullDownStatus: 4, //下加载状态
  y:0

};

const INFO_RESTORE_COMPONENT_reducer = (state, action) => {
  // 计算一下
  return state;
}

const INFO_GOODS_SUCCESS_reducer = (state, action) => {
  let nextState = Object.assign({}, state);

  // nextState.InfoGoodsStatus = action.InfoGoodsStatus;
  nextState.homeLoadingStatus = 2;
  if (action.InfoGoodsItems.length>0) {

    if (action.InfoGoodsPage === 0) {
      // nextState.listLoadingStatus = 2;
      nextState.InfoGoodsPage = action.InfoGoodsPage + 1;
      nextState.InfoGoodsItems = action.InfoGoodsItems;
      if (action.InfoGoodsItems.length < 6) {
        nextState.pullDownStatus = 1;
      } else {
        nextState.pullDownStatus = 0;

      }
    } else { // 加载操作
      if (state.pullDownStatus === 0) {
        if (action.InfoGoodsItems.length < 6) {
          nextState.pullDownStatus = 1;
        }
        nextState.InfoGoodsItems = state.InfoGoodsItems.concat(action.InfoGoodsItems);

        nextState.InfoGoodsPage = action.InfoGoodsPage + 1;
      }
    }


  } else {
    if (action.InfoGoodsItems.length === 0) {
      nextState.InfoGoodsItems = [];
      nextState.pullDownStatus = 4;
    }
    if (action.InfoGoodsPage > 0 && state.pullDownStatus < 2) {
      nextState.pullDownStatus = 2;

    }
  }
  return nextState;
}

const INFO_GOODS_FAIL_reducer = (state, action) => {
  return Object.assign({}, state, {
    homeLoadingStatus: 3
  });
  return state;
}

const HOME_UPDATE_LOADING_STATUS_reducer = (state, action) => {
  if (state.homeLoadingStatus !== action.homeLoadingStatus) {
    return Object.assign({}, state, {
      homeLoadingStatus: action.nextStatus
    });
  }
  return state;
}
const HOME_BACKUP_Y_reducer = (state, action) => {
  return Object.assign({}, state, {
    y: action.y
  });
  return state;
}
export const MsgHomeReducer = (state = homeInitState, action) => {
  switch (action.type) {
    case consts.INFO_RESTORE_COMPONENT:
      return INFO_RESTORE_COMPONENT_reducer(state, action);
    case consts.INFO_GOODS_SUCCESS:
      return INFO_GOODS_SUCCESS_reducer(state, action);
    case consts.INFO_GOODS_FAIL:
      return INFO_GOODS_FAIL_reducer(state, action);
    case consts.HOME_UPDATE_LOADING_STATUS:
      return HOME_UPDATE_LOADING_STATUS_reducer(state, action);
          case consts.HOME_BACKUP_Y:
      return HOME_BACKUP_Y_reducer(state, action);

      // 有2类action.type会进入default
      // 1) 你不关心的action，属于其他组件
      // 2）系统的action，例如router切换了location，redux初始化了等等
    default:
      // console.log(action);
      return state; // 返回当前默认state或者当前state
  }
}



export default MsgHomeReducer