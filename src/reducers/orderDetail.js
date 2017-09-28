import * as consts from "../consts/ActionTypes";
// 组件初始化状态，其实就是把component的constructor的挪到这里就完事了
const orderDetailInitState = {
  orderDetailLoadingStatus: 1, // [1]首屏加载状态 [2]非首次进去 [3]加载失败 [4]没有数据放回首页
  orderDetailGoodsStatus: 1, // 内容状态
  orderDetailGoodsItems: [], // 列表内容

  y: 0

};

const ORDERDETAIL_RESTORE_COMPONENT_reducer = (state, action) => {
  // 计算一下
  return state;
}

const ORDERDETAIL_GOODS_SUCCESS_reducer = (state, action) => {
  let nextState = Object.assign({}, state);

  // nextState.orderDetailGoodsStatus = action.orderDetailGoodsStatus;
  nextState.orderDetailLoadingStatus = 2;
  if (action.orderDetailGoodsItems.length > 0) {

    if (action.InfoGoodsPage === 1) {
      // nextState.listLoadingStatus = 2;
      nextState.InfoGoodsPage = action.InfoGoodsPage + 1;
      nextState.orderDetailGoodsItems = action.orderDetailGoodsItems;
      if (action.orderDetailGoodsItems.length < 6) {
        nextState.pullDownStatus = 1;
      } else {
        nextState.pullDownStatus = 0;

      }
    } else { // 加载操作
      if (state.pullDownStatus === 0) {
        if (action.orderDetailGoodsItems.length < 6) {
          nextState.pullDownStatus = 1;
        }
        nextState.orderDetailGoodsItems = state.orderDetailGoodsItems.concat(action.orderDetailGoodsItems);

        nextState.InfoGoodsPage = action.InfoGoodsPage + 1;
      }
    }


  } else {
    if (action.InfoGoodsPage === 0) {
      console.log('null');
      nextState.orderDetailGoodsItems = [];
      nextState.pullDownStatus = 4;
    }
    if (action.InfoGoodsPage > 0 && state.pullDownStatus < 2) {
      nextState.pullDownStatus = 2;

    }
  }
  return nextState;
}

const ORDERDETAIL_GOODS_FAIL_reducer = (state, action) => {
  return Object.assign({}, state, {
    orderDetailLoadingStatus: 3
  });
  return state;
}

const ORDERDETAIL_UPDATE_LOADING_STATUS_reducer = (state, action) => {
  if (state.orderDetailLoadingStatus !== action.orderDetailLoadingStatus) {
    return Object.assign({}, state, {
      orderDetailLoadingStatus: action.nextStatus
    });
  }
  return state;
}
const ORDERDETAIL_BACKUP_Y_reducer = (state, action) => {
  return Object.assign({}, state, {
    y: action.y
  });
  return state;
}
export const MsgOrderDetailReducer = (state = orderDetailInitState, action) => {
  switch (action.type) {
    case consts.ORDERDETAIL_RESTORE_COMPONENT:
      return ORDERDETAIL_RESTORE_COMPONENT_reducer(state, action);
    case consts.ORDERDETAIL_GOODS_SUCCESS:
      return ORDERDETAIL_GOODS_SUCCESS_reducer(state, action);
    case consts.ORDERDETAIL_GOODS_FAIL:
      return ORDERDETAIL_GOODS_FAIL_reducer(state, action);
    case consts.ORDERDETAIL_UPDATE_LOADING_STATUS:
      return ORDERDETAIL_UPDATE_LOADING_STATUS_reducer(state, action);
    case consts.ORDERDETAIL_BACKUP_Y:
      return ORDERDETAIL_BACKUP_Y_reducer(state, action);

      // 有2类action.type会进入default
      // 1) 你不关心的action，属于其他组件
      // 2）系统的action，例如router切换了location，redux初始化了等等
    default:
      // console.log(action);
      return state; // 返回当前默认state或者当前state
  }
}



export default MsgOrderDetailReducer