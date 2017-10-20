import * as consts from "../consts/ActionTypes";
// 组件初始化状态，其实就是把component的constructor的挪到这里就完事了
const allOrderInitState = {
  allOrderLoadingStatus: 1, // [1]首屏加载状态 [2]非首次进去 [3]加载失败 [4]没有数据放回首页

  allOrderType: '', //订单支付类型
  TypeMove: '0px', //块状移动
  allOrderGoodsStatus: 0, // 内容状态
  pullUpStatus: 0, //上加载状态

  allOrderList: [], // 列表内容
  allOrderGoodsPage: 1, //页数
  pullDownStatus: 4, //下加载状态
  y: 0

};

const ALLORDER_RESTORE_COMPONENT_reducer = (state, action) => {
  // 计算一下
  return state;
}

const ALLORDER_GOODS_SUCCESS_reducer = (state, action) => {
  let nextState = Object.assign({}, state);
  nextState.allOrderLoadingStatus = 2;
  nextState.pullUpStatus = 2;
  nextState.allOrderGoodsStatus = 1;

  if (action.allOrderList.length > 0) {

    if (action.allOrderGoodsPage === 1) {

      nextState.allOrderGoodsPage = action.allOrderGoodsPage + 1;
      nextState.allOrderList = action.allOrderList;

      if (action.allOrderList.length < 5) {

        nextState.pullDownStatus = 1;
      } else {
        nextState.pullDownStatus = 0;
      }
    } else { // 加载操作
      if (state.pullDownStatus === 0) {
        if (action.allOrderList.length < 5) {
          nextState.pullDownStatus = 1;
        }
        nextState.allOrderList = state.allOrderList.concat(action.allOrderList);
        nextState.allOrderGoodsPage = action.allOrderGoodsPage + 1;
      }
    }


  } else {
    if (action.allOrderGoodsPage === 1) {
      nextState.allOrderGoodsPage = 1;

      nextState.allOrderList = [];
      nextState.pullDownStatus = 4;
    }
    if (action.allOrderGoodsPage > 1 && state.pullDownStatus < 2) {

      nextState.pullDownStatus = 2;

    }
  }
  return nextState;
}

const ALLORDER_GOODS_FAIL_reducer = (state, action) => {
  let nextState = Object.assign({}, state);
  // nextState.allOrderGoodsStatus=0;
  //         nextState.allOrderLoadingStatus= 1

  if (state.allOrderGoodsStatus === 1) {

    nextState.allOrderLoadingStatus = 3

  } else {
    nextState.allOrderGoodsStatus = 0;
    nextState.allOrderLoadingStatus = 1
  }

  return nextState;
}

const ALLORDER_UPDATE_LOADING_STATUS_reducer = (state, action) => {

  if (state.allOrderLoadingStatus !== action.allOrderLoadingStatus) {
    return Object.assign({}, state, {
      allOrderLoadingStatus: action.nextStatus
    });
  }
  return state;
}
const ALLORDER_BACKUP_Y_reducer = (state, action) => {
  return Object.assign({}, state, {
    y: action.y
  });
  return state;
}
const ALLORDER_UPDATE_PULLUP_STATUS_reducer = (state, action) => {
  return Object.assign({}, state, {
    pullUpStatus: action.pullUpStatus
  });
  return state;
}

const ALLORDER_UPDATE_CATETYPE_STATUS_reducer = (state, action) => {

  return Object.assign({}, state, {
    allOrderType: action.allOrderType,
    TypeMove: action.TypeMove
  });
  return state;
}

export const MsgAllOrderReducer = (state = allOrderInitState, action) => {
  switch (action.type) {

    case consts.ALLORDER_UPDATE_PULLUP_STATUS:
      return ALLORDER_UPDATE_PULLUP_STATUS_reducer(state, action);


    case consts.ALLORDER_UPDATE_CATETYPE_STATUS:
      return ALLORDER_UPDATE_CATETYPE_STATUS_reducer(state, action);

    case consts.ALLORDER_RESTORE_COMPONENT:
      return ALLORDER_RESTORE_COMPONENT_reducer(state, action);
    case consts.ALLORDER_GOODS_SUCCESS:
      return ALLORDER_GOODS_SUCCESS_reducer(state, action);
    case consts.ALLORDER_GOODS_FAIL:
      return ALLORDER_GOODS_FAIL_reducer(state, action);
    case consts.ALLORDER_UPDATE_LOADING_STATUS:
      return ALLORDER_UPDATE_LOADING_STATUS_reducer(state, action);
    case consts.ALLORDER_BACKUP_Y:
      return ALLORDER_BACKUP_Y_reducer(state, action);

      // 有2类action.type会进入default
      // 1) 你不关心的action，属于其他组件
      // 2）系统的action，例如router切换了location，redux初始化了等等
    default:
      // console.log(action);
      return state; // 返回当前默认state或者当前state
  }
}



export default MsgAllOrderReducer