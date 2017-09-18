import * as consts from "../consts/ActionTypes";
// 组件初始化状态，其实就是把component的constructor的挪到这里就完事了
const listInitState = {
  listLoadingStatus: 1, // [1]首屏加载状态 [2]非首次进去 [3]加载失败 [4]没有数据放回首页
  navStatus: 1, // 导航状态
  navItems: [], // 导航列表,
  pushIndex: 0, //导航ID
  goodStatus: 1, // 内容状态
  goodItems: [], // 列表内容
  changeLoading: 1 //列表加载状态
};

const LIST_RESTORE_COMPONENT_reducer = (state, action) => {
  // 计算一下
  return state;
}

const LIST_NAV_SUCCESS_reducer = (state, action) => {
  let nextState = Object.assign({}, state);

  nextState.navStatus = action.navStatus;
  nextState.listLoadingStatus = 2;
  if (action.navStatus) {
    // nextState.listLoadingStatus = 2;

    nextState.navItems = action.navItems;
  } else {
    nextState.listLoadingStatus = 4;
  }
  return nextState;
}

const LIST_NAV_FAIL_reducer = (state, action) => {
  return Object.assign({}, state, {
    listLoadingStatus: 3
  });
    return state;
}

const LIST_GOODS_SUCCESS_reducer = (state, action) => {
  return Object.assign({}, state, {
    listLoadingStatus: 2,
    pushIndex: action.pushIndex,
    goodItems: action.goodItems,
    changeLoading: 0
  });
  return state;
}



const LIST_GOODS_FAIL_reducer = (state, action) => {
  return Object.assign({}, state, {
    goodStatus: 0,
    goodItems: 0
  });
  return state;
}

const LIST_GOODS_UPDATE_CHANGE_STATUS_reducer = (state, action) => {
  return Object.assign({}, state, {
    changeLoading: action.changeLoading
  });
  return state;

}



const LIST_UPDATE_LOADING_STATUS_reducer = (state, action) => {
  if (state.listLoadingStatus !== action.listLoadingStatus) {
    return Object.assign({}, state, {
      listLoadingStatus: action.nextStatus
    });
  }
  return state;
}


export const MsgListReducer = (state = listInitState, action) => {
  switch (action.type) {
    case consts.LIST_RESTORE_COMPONENT:
      return LIST_RESTORE_COMPONENT_reducer(state, action);
    case consts.LIST_GOODS_UPDATE_CHANGE_STATUS:
      return LIST_GOODS_UPDATE_CHANGE_STATUS_reducer(state, action);
    case consts.LIST_NAV_SUCCESS:
      return LIST_NAV_SUCCESS_reducer(state, action);
    case consts.LIST_NAV_FAIL:
      return LIST_NAV_FAIL_reducer(state, action);
    case consts.LIST_GOODS_SUCCESS:
      return LIST_GOODS_SUCCESS_reducer(state, action);
    case consts.LIST_GOODS_FAIL:
      return LIST_GOODS_FAIL_reducer(state, action);
    case consts.LIST_UPDATE_LOADING_STATUS:
      return LIST_UPDATE_LOADING_STATUS_reducer(state, action);
      // 有2类action.type会进入default
      // 1) 你不关心的action，属于其他组件
      // 2）系统的action，例如router切换了location，redux初始化了等等
    default:
      // console.log(action);
      return state; // 返回当前默认state或者当前state
  }
}



export default MsgListReducer