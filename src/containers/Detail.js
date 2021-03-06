import 'core-js/fn/object/assign';
import React from 'react';
import $ from 'jquery';

import {
    connect
} from 'react-redux'
import TopNav from '../components/TopNav';
import DetBody from '../components/detail/DetBody';
import DataNone from '../components/public/DataNone';
import TrBtn from '../components/public/TrBtn';

import {
    detailTryRestoreComponent,
    fetchDetailGoods,
    pushIdStatus,
    fetchPropsGoods
} from '../actions/detail'
import {
    beginShare
} from '../actions/wxchat'
import {
    beginUser
} from '../actions'


class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.detailMsg = '';
    }
    componentWillMount() {
        if (window.localStorage.detailData) {
            this.detailMsg = JSON.parse(window.localStorage.detailData);
        }
        document.title = this.detailMsg ? this.detailMsg.productName : '商品详情';
        if (this.props.detailLoadingStatus === 2 && this.props.id === this.props.match.params.id) {
            this.props.dispatch(detailTryRestoreComponent());
        } else if (window.localStorage.user_info != 1 || this.props.userStatus === 0) {
            //转换类型
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
        this.props.dispatch(beginShare('product', this.props.match.params.id))
    }
    componentWillUnmount() {
        document.documentElement.style.overflowY = 'auto'

    }
    pushIdStatus(id) {
        this.props.dispatch(pushIdStatus(id));
        this.props.dispatch(fetchPropsGoods(id));

    }
    history() {
        if (window.localStorage.user_info != 1 || !this.props.userStatus) {
            this.props.history.push(this.props.baseUrl + '/login/product/' + this.props.id)
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
                    this.props.history.push(this.props.baseUrl + '/isorder/' + this.props.match.params.id)
                }

            },
            error: () => {
                console.log('网络失败');
            }
        });
    }
    renderPage() {
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
            exchange_points,
            goods_id,
            goods_body
        } = this.props
        let goodStatusHtml = [];

        if (goodStatus === 1) {
            goodStatusHtml = <DetBody history={this.history.bind(this)} pushIdStatus={this.pushIdStatus.bind(this)}  id={this.props.match.params.id} exchange_points={exchange_points} detailLoadingStatus={detailLoadingStatus} name = { name } saleProp = { saleProp } prop_name = { prop_name } itemUrl = { itemUrl } imgsrc = { imgsrc } stock = { stock } item_price = { item_price } item_name = { item_name } goods_id = { goods_id } goods_body = {goods_body} goodStatus={goodStatus}/>
        } else {
            goodStatusHtml = (<DataNone tip='商品已下架或不存在'/>)
        }
        return (
            <div>
        <header id = "detNav" styele={{position:'relative'}}>
        <TopNav titleName = "商品详情" go='-1' border = "0" color='#fbfbfb' /> 
 <TrBtn baseUrl={this.props.baseUrl}/>
        </header>

        {
            goodStatusHtml
        }
            </div>
        )
    }
    render() {
        let renderHtml = [];
        renderHtml = this.renderPage();
        return (
            <div>
        {
            renderHtml
        }
        </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        baseUrl: state.MsgAppReducer.baseUrl,
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
        exchange_points: state.MsgDetailReducer.exchange_points,
        item_name: state.MsgDetailReducer.item_name,
        goods_id: state.MsgDetailReducer.goods_id,
        goods_body: state.MsgDetailReducer.goods_body,
    }
}


export default connect(mapStateToProps)(Detail)