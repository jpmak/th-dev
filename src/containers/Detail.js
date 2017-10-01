import 'core-js/fn/object/assign';
import React from 'react';
import $ from 'jquery';

import {
    connect
} from 'react-redux'
import TopNav from '../components/TopNav';
import DetBody from '../components/detail/DetBody';
import {
    detailTryRestoreComponent,
    fetchDetailGoods,
    pushIdStatus,
    fetchPropsGoods
} from '../actions/detail'
import {
    beginUser
} from '../actions'
// const R_det = ({
// 	match
// }) => (
// 	<div className="th-block">
//         <header id="headnav"><TopNav titleName = "产品详情"	icon = "jf-record-icon"	dis = "none" /></header>
// <div id="detwrap"><DetBody paramsId={match.params.id}/></div>
//     </div>
// )
class Detail extends React.Component {
    componentWillMount() {
        if (this.props.detailLoadingStatus === 2 && this.props.id === this.props.match.params.id) {
            this.props.dispatch(detailTryRestoreComponent());
        } else if (window.localStorage.user_info != 1 || this.props.userStatus === 0) {
            this.props.dispatch(beginUser());
        }

    }
    componentDidMount() {

        if (this.props.detailLoadingStatus === 1) {
            this.props.dispatch(fetchDetailGoods(this.props.match.params.id));
            this.props.dispatch(pushIdStatus(this.props.match.params.id));
        } else if (this.props.detailLoadingStatus === 2 && this.props.id !== this.props.match.params.id) {
            this.props.dispatch(fetchDetailGoods(this.props.match.params.id));
            this.props.dispatch(pushIdStatus(this.props.match.params.id));
        }

    }
    pushIdStatus(id) {
        this.props.dispatch(pushIdStatus(id));
        this.props.dispatch(fetchPropsGoods(id));

    }
    history() {
        if (window.localStorage.user_info != 1 || !this.props.userStatus) {
            this.props.history.push('/Exchange-index.html/login/product/' + this.props.id)
        } else {
            this.commit_exchange()
        }
    }

    commit_exchange() {
            $.ajax({
                url: '/wap/?g=WapSite&c=Exchange&a=commit_exchange',
                dataType: 'json',
                type: 'post',
                'data': {
                    'item_id': this.props.id
                },
                success: (data) => {
                    if (data.status) {
                        this.props.history.push('/Exchange-index.html/IsOrder/' + this.props.match.params.id)
                    }

                },
                error: () => {
                    console.log('网络失败');
                }
            });
        }
    render() {
        const {
            detailLoadingStatus,
            goodStatus,
            name,
            saleProp,
            prop_name,
            itemUrl,
            imgsrc,
            stock,
            item_price,
            item_name,
            goods_id,
            goods_body
        } = this.props
        return (
            <div className = "th-block">
        	<header id = "headnav" >
        	<TopNav titleName = "产品详情" icon = "jf-record-icon" dis = "none"/></header><div id = "detwrap" ></div> 
        	<DetBody history={this.history.bind(this)} pushIdStatus={this.pushIdStatus.bind(this)}  id={this.props.match.params.id} detailLoadingStatus={detailLoadingStatus} name = { name } saleProp = { saleProp } prop_name = { prop_name } itemUrl = { itemUrl } imgsrc = { imgsrc } stock = { stock } item_price = { item_price } item_name = { item_name } goods_id = { goods_id } goods_body = {goods_body} goodStatus={goodStatus}/>
        	</div>
        )
    }
}
const mapStateToProps = state => {
    return {
        userStatus: state.MsgAppReducer.userStatus,
        userName: state.MsgAppReducer.userName,

        id: state.MsgDetailReducer.id,
        detailLoadingStatus: state.MsgDetailReducer.detailLoadingStatus,
        goodStatus: state.MsgDetailReducer.goodStatus,
        name: state.MsgDetailReducer.name,
        saleProp: state.MsgDetailReducer.saleProp,
        prop_name: state.MsgDetailReducer.prop_name,
        itemUrl: state.MsgDetailReducer.itemUrl,
        imgsrc: state.MsgDetailReducer.imgsrc,
        stock: state.MsgDetailReducer.stock,
        item_price: state.MsgDetailReducer.item_price,
        item_name: state.MsgDetailReducer.item_name,
        goods_id: state.MsgDetailReducer.goods_id,
        goods_body: state.MsgDetailReducer.goods_body,
    }
}


export default connect(mapStateToProps)(Detail)