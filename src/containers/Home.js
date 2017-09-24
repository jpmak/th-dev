import React from 'react';
import {
    connect
} from 'react-redux'
import '../styles/userInfo.scss';

import $ from 'jquery';

import TopNav from '../components/TopNav';
import Goback from '../components/public/Goback';
import InfoGoods from '../components/info/InfoGoods';

import {
    tryRestoreComponent,
    beginUser,

} from '../actions'
// import ResultWrap from '../components/search/ResultWrap';
import {
    InfoTryRestoreComponent,
    beginRefresh,
    fetchInfoGoods,
    updateHomeLoadingStatus,
    backupIScrollY

} from '../actions/home'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.scrollTop=0;
        this.homehandleScroll = this.homehandleScroll.bind(this);
    };
    componentWillMount() {
console.log(this.props.y)
        let p = new Promise(function(resolve, reject) {});

        if (window.localStorage.user_info != 1) {
            p.then(this.props.history.push('/Exchange-index.html/login/home/'))
                // .then(window.location.href = "http://www.thgo8.me/wap/User-login-1.html")
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

        window.addEventListener('scroll', this.homehandleScroll);
       
       console.log(this.props.y)
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
        }else{
                        window.scrollTo(0,this.props.y)
        }


    }
    componentWillReceiveProps(nextProps) {
            console.log(this.props.userStatus);

            if (nextProps.userStatus === this.props.userStatus) {
                console.log(111111);

            }
            // window.location.href = "http://www.thgo8.me/wap/User-login-1.html";
        }

            componentWillUnmount() {

        window.removeEventListener('scroll', this.homehandleScroll);




        if (this.props.homeLoadingStatus === 2) { // 首屏成功刷出，则备份y
        this.props.dispatch(backupIScrollY(this.scrollTop))
         
        }
      
    }
    homehandleScroll(){

        let scrollTop = this.getScrollTop(); //滚动条滚动高度
       this.scrollTop=scrollTop


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
beginRefresh(){
      this.props.dispatch(updateHomeLoadingStatus(1)); // 恢复loading界面
      this.props.dispatch(beginRefresh());

}
    backupIScrollY(e) {
        this.props.dispatch(backupIScrollY(e))
    }

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
   
    renderPage() {
        return (
            <div id='home'>
        <TopNav titleName = "我的积分" />
<Info userBuy={this.props.userBuy}  userMoney={this.props.userMoney} UserTourism={this.props.UserTourism}/>
               <div className='w'>
 <div className='infoTitle'>
   我可兑换
   </div>

        <InfoGoods homeLoadingStatus={this.props.homeLoadingStatus} beginRefresh={this.beginRefresh.bind(this)} InfoGoodsPage={this.props.InfoGoodsPage} InfoGoods={this.props.InfoGoodsItems} detailData={this.detailData.bind(this)} pullDownStatus={this.props.pullDownStatus} changeGoods={this.changeGoods.bind(this)}/>
   </div>

</div>)


    }
    render() {
        let p = new Promise(function(resolve, reject) {});
        console.log(this.props.homeLoadingStatus);
  


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
        y:state.MsgHomeReducer.y


    }
}


export default connect(mapStateToProps)(Home)