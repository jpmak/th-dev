import React from 'react';
import {
    connect
} from 'react-redux'
import '../styles/userInfo.scss';

import $ from 'jquery';

import TopNav from '../components/TopNav';
import Goback from '../components/public/Goback';
import LoadingLayer from '../components/LoadingLayer/LoadingLayer';
import InfoGoods from '../components/info/InfoGoods';

import {
    tryRestoreComponent,
    beginUser,

} from '../actions'
// import ResultWrap from '../components/search/ResultWrap';
import {
    InfoTryRestoreComponent,
    beginRefresh,
    fetchInfoGoods

} from '../actions/home'

class Home extends React.Component {

    componentWillMount() {

        let p = new Promise(function(resolve, reject) {});

        if (window.localStorage.user_info != 1) {
            p.then(this.props.history.push('/Exchange-index.html/'))
                .then(window.location.href = "http://www.thgo8.me/wap/User-login-1.html")
        } else {
            this.props.dispatch(InfoTryRestoreComponent());
        }


    }

    checkout() {
        if (window.localStorage.user_info != 1) {
            console.log('test');
            // this.props.dispatch(beginRefresh());
        }
    }
    componentDidMount() {

        console.log(this.props.userStatus);

        let p = new Promise(function(resolve, reject) {});
        // if (window.localStorage.user_info != 1) {
        //     p.then(this.props.dispatch(beginUser()))
        //         .then(window.location.href = "http://www.thgo8.me/wap/User-login-1.html")
        // }


        if (this.props.userStatus === 0) {
            this.props.dispatch(beginUser())
        }
        if (this.props.homeLoadingStatus === 1) {
            this.props.dispatch(beginRefresh())
        }


    }
    componentWillReceiveProps(nextProps) {
            console.log(this.props.userStatus);

            if (nextProps.userStatus === this.props.userStatus) {
                console.log(111111);

            }
            // window.location.href = "http://www.thgo8.me/wap/User-login-1.html";
        }
        //search


    onRetryLoading() {
        // this.props.dispatch(updateListLoadingStatus(1)); // 恢复loading界面
        // this.props.dispatch(beginRefresh());
    }
    detailData(goods_name, item_price, list_image) {
        window.localStorage.detailData = JSON.stringify({
            'productName': goods_name,
            'productPrice': item_price,
            'productImg': [list_image]
        })
    }

    changeGoods() {

        this.props.dispatch(fetchInfoGoods(this.props.InfoGoodsPage))

    }
    renderLoading() {
        let outerStyle = {
            height: window.innerHeight
        };
        return (
            <div>
                <LoadingLayer outerStyle={outerStyle} onRetry={this.onRetryLoading.bind(this)}
                    loadingStatus={this.props.listLoadingStatus}
                />
            </div>
        );
    }
    renderPage() {
        return (
            <div>
        <TopNav titleName = "我的积分" />
<Info userBuy={this.props.userBuy}  userMoney={this.props.userMoney} UserTourism={this.props.UserTourism}/>
               <div className='w'>
 <div className='infoTitle'>
   我可兑换
   </div>

        <InfoGoods InfoGoodsPage={this.props.InfoGoodsPage} InfoGoods={this.props.InfoGoodsItems} detailData={this.detailData.bind(this)} pullDownStatus={this.props.pullDownStatus} changeGoods={this.changeGoods.bind(this)}/>
   </div>

</div>)


    }
    render() {
        let p = new Promise(function(resolve, reject) {});
        console.log(this.props.homeLoadingStatus);
        console.log(this.props.InfoGoodsItems);
        console.log(this.props.InfoGoodsStatus);


        console.log('render=  ' + this.props.userStatus);

        let renderHtml = [];
        // 首屏没有加载成功，那么均展示loading效果
        if (this.props.userStatus === 0) {
            {
                // this.props.dispatch(beginUser());
                // window.location.href = "http://www.thgo8.me/wap/User-login-1.html";
                // window.location.href = "http://www.163.com/";
            }
        } else {

            renderHtml = this.renderPage();

        }
        return (
            <div>
        {
            renderHtml
        }
        </div>
        );


    }
}



class Info extends React.Component {
    render() {
        let userMoney = this.props.userMoney ? this.props.userMoney : '0';
        let UserTourism = this.props.UserTourism ? this.props.UserTourism : '0';
        let userBuy = this.props.userBuy ? this.props.userBuy : '0';
        return (
            <div className='info-watch'>
               <ul>
          <li>
                          <p className='num'>{userMoney}</p>
                                <p>可用积分排点</p>
          </li>
                <li>
                          <p className='num'>{UserTourism} </p>
                                <p>可用旅游积分</p>
          </li>
                <li>
                          <p className='num'>{userBuy}</p>
                                <p>可用购物积分</p>
          </li>
               </ul>
               </div>
        )
    }
}



const mapStateToProps = state => {
    return {

        userStatus: state.MsgAppReducer.userStatus,
        userBuy: state.MsgAppReducer.userBuy,
        userMoney: state.MsgAppReducer.userMoney,
        UserTourism: state.MsgAppReducer.UserTourism,
        homeLoadingStatus: state.MsgHomeReducer.homeLoadingStatus,
        InfoGoodsStatus: state.MsgHomeReducer.InfoGoodsStatus,
        InfoGoodsPage: state.MsgHomeReducer.InfoGoodsPage,
        InfoGoodsItems: state.MsgHomeReducer.InfoGoodsItems,
        pullDownStatus: state.MsgHomeReducer.pullDownStatus,


    }
}


export default connect(mapStateToProps)(Home)