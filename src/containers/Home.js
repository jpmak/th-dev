import React from 'react';
import {
    connect
} from 'react-redux'
import '../styles/userInfo.scss';

import $ from 'jquery';

import TopNav from '../components/TopNav';
import Goback from '../components/public/Goback';
import LoadingLayer from '../components/LoadingLayer/LoadingLayer';
import {
    tryRestoreComponent,
    beginUser
} from '../actions'
// import ResultWrap from '../components/search/ResultWrap';
// import {
//     ListTryRestoreComponent,
//     fetchListNav,
//     fetchListGoods,
//     beginRefresh,
//     changeLoading,
//     updateListLoadingStatus
// } from '../actions/list'

class Home extends React.Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {

        // console.log(this.props.userStatus);
        if (this.props.userStatus === 0) {
            // this.props.dispatch(beginRefresh());
            // window.location.href = "http://www.thgo8.me/wap/User-login-1.html";
        }
        // this.props.dispatch(tryRestoreComponent());
        // this.props.dispatch(updateLoadingStatus(1)); //重置搜索页的loading状态
    }
    componentDidMount() {
        if (this.props.userStatus === 0) {
            console.log('componentDidMount=  ' + this.props.userStatus);

            window.location.href = "http://www.thgo8.me/wap/User-login-1.html";


        }



    }



    componentWillReceiveProps(nextProps) {
            console.log(this.props.userStatus);

            if (nextProps.userStatus === this.props.userStatus)
                window.location.href = "http://www.thgo8.me/wap/User-login-1.html";
        }
        //search


    onRetryLoading() {
        // this.props.dispatch(updateListLoadingStatus(1)); // 恢复loading界面
        // this.props.dispatch(beginRefresh());
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
  
     
</div>)


    }
    render() {
        console.log('render=  ' + this.props.userStatus);

        let renderHtml = [];
        // 首屏没有加载成功，那么均展示loading效果
        if (this.props.userStatus === 0) {
            {
                this.props.dispatch(beginUser());
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
    }
}


export default connect(mapStateToProps)(Home)