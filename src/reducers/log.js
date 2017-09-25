import * as consts from "../consts/ActionTypes";
// 组件初始化状态，其实就是把component的constructor的挪到这里就完事了
const logInitState = {
  logLoadingStatus: 1, // [1]首屏加载状态 [2]非首次进去 [3]加载失败 [4]没有数据放回首页
  logGoodsStatus: 1, // 内容状态
  logList: [], // 列表内容
  logGoodsPage: 0, //页数
  pullDownStatus: 4, //下加载状态
  y: 0

};

const LOG_RESTORE_COMPONENT_reducer = (state, action) => {
  // 计算一下
  return state;
}

const LOG_GOODS_SUCCESS_reducer = (state, action) => {
  let nextState = Object.assign({}, state);
  // console.log(action.logList);
  // nextState.logGoodsStatus = action.logGoodsStatus;
  nextState.logLoadingStatus = 2;
  console.log(action.logGoodsPage);
  if (action.logList.length > 0) {
    if (action.logGoodsPage === 0) {
      nextState.logGoodsPage = action.logGoodsPage + 1;
      nextState.logList = action.logList;

      if (action.logList.length < 10) {

        nextState.pullDownStatus = 1;
      } else {
        nextState.pullDownStatus = 0;
      }
    } else { // 加载操作
      if (state.pullDownStatus === 0) {
        if (action.logList.length < 10) {
          nextState.pullDownStatus = 1;
        }
        nextState.logList = state.logList.concat(action.logList);
        nextState.logGoodsPage = action.logGoodsPage + 1;
      }
    }


  } else {
    if (action.logGoodsPage === 0) {
      nextState.logList = [];
      nextState.pullDownStatus = 4;
    }
    if (action.logGoodsPage > 0 && state.pullDownStatus < 2) {
      nextState.pullDownStatus = 2;

    }
  }
  return nextState;
}

const LOG_GOODS_FAIL_reducer = (state, action) => {
  return Object.assign({}, state, {
    logLoadingStatus: 3
  });
  return state;
}

const LOG_UPDATE_LOADING_STATUS_reducer = (state, action) => {
  if (state.logLoadingStatus !== action.logLoadingStatus) {
    return Object.assign({}, state, {
      logLoadingStatus: action.nextStatus
    });
  }
  return state;
}
const LOG_BACKUP_Y_reducer = (state, action) => {
  return Object.assign({}, state, {
    y: action.y
  });
  return state;
}
export const MsgLogReducer = (state = logInitState, action) => {
  switch (action.type) {
    case consts.LOG_RESTORE_COMPONENT:
      return LOG_RESTORE_COMPONENT_reducer(state, action);
    case consts.LOG_GOODS_SUCCESS:
      return LOG_GOODS_SUCCESS_reducer(state, action);
    case consts.LOG_GOODS_FAIL:
      return LOG_GOODS_FAIL_reducer(state, action);
    case consts.LOG_UPDATE_LOADING_STATUS:
      return LOG_UPDATE_LOADING_STATUS_reducer(state, action);
    case consts.LOG_BACKUP_Y:
      return LOG_BACKUP_Y_reducer(state, action);

      // 有2类action.type会进入default
      // 1) 你不关心的action，属于其他组件
      // 2）系统的action，例如router切换了location，redux初始化了等等
    default:
      // console.log(action);
      return state; // 返回当前默认state或者当前state
  }
}



export default MsgLogReducer