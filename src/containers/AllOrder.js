import React from 'react';
import {
    connect
} from 'react-redux'
// import '../styles/userInfo.scss';

import $ from 'jquery';

import TopNav from '../components/TopNav';
import Goback from '../components/public/Goback';

import AllOrderCate from '../components/allorder/AllOrderCate';

import AllOrderGoods from '../components/allorder/AllOrderGoods';

import {
    tryRestoreComponent,
    beginUser,

} from '../actions'
// import ResultWrap from '../components/search/ResultWrap';
import {
    allOrderTryRestoreComponent,
    beginRefresh,
    fetchAllOrderGoods,
    pullUpStatus,
    UpDataCateType,
    updateAllOrderLoadingStatus,
    backupIScrollY

} from '../actions/allorder'

class AllOrder extends React.Component {
    constructor(props) {
        super(props);
        this.scrollTop = 0;
    };

    componentWillMount() {
        // console.log(this.props.y);
        let p = new Promise(function(resolve, reject) {});

        if (window.localStorage.user_info != 1) {
            p.then(this.props.history.push('/Exchange-index.html/login/allorder/'))
                // .then(window.location.href = "http://www.thgo8.me/wap/User-login-1.html")
        } else {

            this.props.dispatch(allOrderTryRestoreComponent());
        }


    }


    componentDidMount() {
        let p = new Promise(function(resolve, reject) {});

        // console.log(this.props.allOrderLoadingStatus);
        // console.log(this.props.userStatus);

        if (this.props.allOrderLoadingStatus === 1 || this.props.userStatus === 0) {
            this.props.dispatch(beginUser())


            this.props.dispatch(beginRefresh())
        } else {
            window.scrollTo(0, this.props.y)
        }


    }

    componentWillUnmount() {
        if (this.props.allOrderLoadingStatus === 2) { // 首屏成功刷出，则备份y
            // this.props.dispatch(backupIScrollY(this.scrollTop))
            this.props.dispatch(backupIScrollY(this.scrollTop))
                // 

        }

    }

    //search
    beginRefresh() {
        this.props.dispatch(updateAllOrderLoadingStatus(1)); // 恢复loading界面
        this.props.dispatch(beginRefresh());

    }
    backupIScrollY(e) {
        this.scrollTop = e
    }

    UpDataCateType(type, move) {

        this.props.dispatch(UpDataCateType(type, move))

    }
    UpDataPullUpStatus(e) {
        this.props.dispatch(pullUpStatus(e))

    }
    changeGoods(e, type) {

        this.props.dispatch(fetchAllOrderGoods(this.props.allOrderGoodsPage, this.props.allOrderType))
    }
    get_type_goods(page, type) {

        this.props.dispatch(fetchAllOrderGoods(page, type))


    }

    renderPage() {

        return (
            <div >
        <TopNav titleName = "兑换订单" border='0' color='#fbfbfb' />
               <div className='w'>

        <AllOrderCate TypeMove={this.props.TypeMove} allOrderType={this.props.allOrderType} get_type_goods={this.get_type_goods.bind(this)}  UpDataPullUpStatus={this.UpDataPullUpStatus.bind(this)} UpDataCateType={this.UpDataCateType.bind(this)}/>

        <AllOrderGoods get_type_goods={this.get_type_goods.bind(this)}   pullUpStatus={this.props.pullUpStatus} allOrderLoadingStatus={this.props.allOrderLoadingStatus} beginRefresh={this.beginRefresh.bind(this)} allOrderGoodsPage={this.props.allOrderGoodsPage} allOrderList={this.props.allOrderList}  pullDownStatus={this.props.pullDownStatus} changeGoods={this.changeGoods.bind(this)} backupIScrollY={this.backupIScrollY.bind(this)}/>
   </div>

</div>)

    }
    render() {
        let p = new Promise(function(resolve, reject) {});
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
        userStatus: state.MsgAppReducer.userStatus,
        allOrderLoadingStatus: state.MsgAllOrderReducer.allOrderLoadingStatus,
        allOrderGoodsStatus: state.MsgAllOrderReducer.allOrderGoodsStatus,
        allOrderGoodsPage: state.MsgAllOrderReducer.allOrderGoodsPage,
        allOrderList: state.MsgAllOrderReducer.allOrderList,
        pullDownStatus: state.MsgAllOrderReducer.pullDownStatus,
        pullUpStatus: state.MsgAllOrderReducer.pullUpStatus,
        allOrderType: state.MsgAllOrderReducer.allOrderType,
        TypeMove: state.MsgAllOrderReducer.TypeMove,


        y: state.MsgAllOrderReducer.y

    }
}


export default connect(mapStateToProps)(AllOrder)