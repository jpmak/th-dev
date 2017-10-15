import * as consts from "../consts/ActionTypes";
// 组件初始化状态，其实就是把component的constructor的挪到这里就完事了
const detailInitState = {
    goodStatus: 0,
    id: 0,
    saleProp: [],
    name: null, //标题
    prop_name: '',
    itemUrl: '',
    imgsrc: null, //图片[]
    stock: null,
    item_price: null, //积分数量
    item_name: '',
    goods_id: '',
    exchange_points:'',
    goods_body: '',
    detailLoadingStatus: 1, // 首屏加载状态
    y: 0, // 上一次滚动偏移量
};

const DETAIL_INIT_reducer = (state, action) => {
    // 计算一下
    return Object.assign({}, state, detailInitState);
    return state;
}


const DETAIL_RESTORE_COMPONENT_reducer = (state, action) => {
    // 计算一下
    return state;
}

const DETAIL_GOODS_SUCCESS_reducer = (state, action) => {
    return Object.assign({}, state, {
        goodStatus: 1,
        detailLoadingStatus: 2,
        name: action.name,
        saleProp: action.saleProp,
        prop_name: action.prop_name,
        itemUrl: action.itemUrl,
        exchange_points:action.exchange_points,
        imgsrc: action.imgsrc,
        stock: action.stock,
        item_price: action.item_price,
        item_name: action.item_name,
        goods_id: action.goods_id,
        goods_body: action.goods_body,

    });
    return state;
}
const DETAIL_PROPS_SUCCESS_reducer = (state, action) => {
    return Object.assign({}, state, {

        stock: action.stock,
        item_price: action.item_price,
        exchange_points:action.exchange_points,
        item_name: action.item_name,
        itemUrl: action.itemUrl,

    });
    return state;
}
// const DETAIL_GOODS_FAIL_reducer = (state, action) => {
//     // 首屏加载失败, 那么需要展示loading fail效果
//     return Object.assign({}, state, {
//         detailloadingStatus: 3
//     });
//     return state;
// }

const DETAIL_ID_STATUS_reducer = (state, action) => {
    return Object.assign({}, state, {
        id: action.id
    });
    return state;
}

const DETAIL_UPDATA_LOCALDETAILDATA_reducer = (state, action) => {
    return Object.assign({}, state, {
        name: action.L_name,
        item_price: action.L_item_price,
        imgsrc: [action.L_imgsrc]
    });
    return state;
}
const DETAIL_UPDATE_LOADING_STATUS_reducer = (state, action) => {
    return Object.assign({}, state, {
        detailLoadingStatus: action.nextStatus
    });
    return state;
}


// Reducer函数
// 1, 在redux初始化，路由切换等时机，都会被唤醒，从而有机会返回初始化state，
//    这将领先于componnent从而可以props传递
// 2, 这里redux框架传来的是state对应Reducer的子集合
export const MsgDetailReducer = (state = detailInitState, action) => {
    switch (action.type) {

        case consts.DETAIL_INIT:
            return DETAIL_INIT_reducer(state, action);
        case consts.DETAIL_RESTORE_COMPONENT:
            return DETAIL_RESTORE_COMPONENT_reducer(state, action);
        case consts.DETAIL_ID_STATUS:
            return DETAIL_ID_STATUS_reducer(state, action);

        case consts.DETAIL_PROPS_SUCCESS:
            return DETAIL_PROPS_SUCCESS_reducer(state, action);

        case consts.DETAIL_GOODS_SUCCESS:
            return DETAIL_GOODS_SUCCESS_reducer(state, action);
        case consts.DETAIL_UPDATA_LOCALDETAILDATA:
            return DETAIL_UPDATA_LOCALDETAILDATA_reducer(state, action);
        case consts.DETAIL_UPDATE_LOADING_STATUS:
            return DETAIL_UPDATE_LOADING_STATUS_reducer(state, action);
            // case consts.DETAIL_GOODS_FAIL:
            //   return DETAIL_GOODS_FAIl_reducer(state, action);

        default:
            // console.log(action);
            return state; // 返回当前默认state或者当前state
    }
}



export default MsgDetailReducer