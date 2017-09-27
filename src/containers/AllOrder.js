import React from 'react';
import {
    connect
} from 'react-redux'
// import '../styles/userInfo.scss';

import $ from 'jquery';

import TopNav from '../components/TopNav';
import Goback from '../components/public/Goback';
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
    updateAllOrderLoadingStatus,
    backupIScrollY

} from '../actions/allorder'

class AllOrder extends React.Component {
    constructor(props) {
        super(props);
        this.scrollTop = 0;
        this.allOrderhandleScroll = this.allOrderhandleScroll.bind(this);
    };

    componentWillMount() {
        let p = new Promise(function(resolve, reject) {});

        if (window.localStorage.user_info != 1) {
            p.then(this.props.history.push('/Exchange-index.html/login/allorder/'))
                // .then(window.location.href = "http://www.thgo8.me/wap/User-login-1.html")
        } else {

            this.props.dispatch(allOrderTryRestoreComponent());
        }


    }


    componentDidMount() {
        window.addEventListener('scroll', this.allOrderhandleScroll);
        let p = new Promise(function(resolve, reject) {});


        if (this.props.logLoadingStatus === 1 || this.props.userStatus === 0) {
            this.props.dispatch(beginUser())
            this.props.dispatch(beginRefresh())
        } else {
            window.scrollTo(0, this.props.y)
        }


    }


    componentWillUnmount() {

        window.removeEventListener('scroll', this.allOrderhandleScroll);



        if (this.props.logLoadingStatus === 2) { // 首屏成功刷出，则备份y
            this.props.dispatch(backupIScrollY(this.scrollTop))

        }

    }
    allOrderhandleScroll() {

        let scrollTop = this.getScrollTop(); //滚动条滚动高度
        this.scrollTop = scrollTop


    }
    getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }

    //search
    beginRefresh() {
        this.props.dispatch(updateAllOrderLoadingStatus(1)); // 恢复loading界面
        this.props.dispatch(beginRefresh());

    }
    backupIScrollY(e) {
        this.props.dispatch(backupIScrollY(e))
    }



    changeGoods() {
        console.log(this.props.pullDownStatus);
        this.props.dispatch(fetchAllOrderGoods(this.props.AllOrderGoodsPage))
    }

    renderPage() {
        return (
            <div >
        <TopNav titleName = "兑换订单" />

               <div className='w'>

        <AllOrderGoods allOrderLoadingStatus={this.props.allOrderLoadingStatus} beginRefresh={this.beginRefresh.bind(this)} allOrderGoodsPage={this.props.allOrderGoodsPage} allOrderList={this.props.allOrderList}  pullDownStatus={this.props.pullDownStatus} changeGoods={this.changeGoods.bind(this)}/>
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
        y: state.MsgAllOrderReducer.y

    }
}


export default connect(mapStateToProps)(AllOrder)