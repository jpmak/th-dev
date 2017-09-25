    import $ from 'jquery';

    import * as consts from "../consts/ActionTypes";



    export const detailInit = () => {
        return {
            type: consts.DETAIL_INIT
        };
    }
  
    export const detailTryRestoreComponent = () => {
        return {
            type: consts.DETAIL_RESTORE_COMPONENT
        };
    }


    export function pushIdStatus(id){
        return {
                type: consts.DETAIL_ID_STATUS,
                id: id
         }
   
    }
    export const LocalDetailData = (name,item_price,imgsrc) => {
 return {
                type: consts.DETAIL_UPDATA_LOCALDETAILDATA,
                L_name: name,
                L_item_price:item_price,
                L_imgsrc:imgsrc
         }

    }
    //  export function beginRefresh() {
    //   return (dispatch) => {
    //     fetchDeatailGoods(dispatch);
    //   }
    // }

    // 发起刷新
    export const fetchDetailGoods = (id) => {
        // pushIdStatus(id)
        return (dispatch) => {
            //       dispatch({
            //   type: consts.DETAIL_ID_STATUS,
            //   id: id
            // });
            fetch('/wap/?g=WapSite&c=Exchange&a=get_goods_msg', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: 'id=' + id
                })
                .then((res) => res.json())
                .then((data) => {
                    dispatch({
                        type: consts.DETAIL_GOODS_SUCCESS,

                        prop_name: (data.prop_name) ? data.prop_name : '',
                        // saleProp: (data.saleProp) ? data.saleProp : [],
                        saleProp: data.saleProp,
                        itemUrl: (data.itemUrl) ? data.itemUrl : '',
                        item_price: data.goods.item_price,
                        name: data.goods.goods_name,
                        stock: data.goods.stock,
                        goods_id: data.goods.goods_id,
                        goods_body: data.goods.goods_body,
                        imgsrc: data.goods.main_image,
                        item_name: (data.goods.item_name) ? '已选择：' + data.goods.item_name : ''
                    });

                })
            // .catch(() => {
            //   dispatch({
            //     type: consts.DETAIL_GOODS_FAIL

            //   })
            // })
        }
    }

    // 更新Id
    export const updateId=(nextStatus)=> {
        return {
            type: consts.DETAIL_UPDATA_ID,
            id: nextStatus
        };
    }
    // 更新loading状态
    export const updateDetailLoadingStatus=(nextStatus)=> {
        return {
            type: consts.DETAIL_UPDATE_LOADING_STATUS,
            nextStatus: nextStatus
        };
    }

    // 更新下拉状态

    // 更新上拉状态

    // 更新滚动条长度





    //////iscrool///////