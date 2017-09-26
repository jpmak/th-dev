import React from 'react';
import {
    connect
} from 'react-redux'
// import '../styles/userInfo.scss';

import $ from 'jquery';

import TopNav from '../components/TopNav';
import Goback from '../components/public/Goback';
import LogGoods from '../components/log/LogGoods';

import {
    tryRestoreComponent,
    beginUser,

} from '../actions'
// import ResultWrap from '../components/search/ResultWrap';
import {
    logTryRestoreComponent,
    beginRefresh,
    fetchLogGoods,
    updateLogLoadingStatus,
    backupIScrollY

} from '../actions/log'

class Log extends React.Component {
    constructor(props) {
        super(props);
        this.scrollTop = 0;
        this.loghandleScroll = this.loghandleScroll.bind(this);
    };

    componentWillMount() {
        let p = new Promise(function(resolve, reject) {});

        if (window.localStorage.user_info != 1) {
            p.then(this.props.history.push('/Exchange-index.html/login/log/'))
                // .then(window.location.href = "http://www.thgo8.me/wap/User-login-1.html")
        } else {

            this.props.dispatch(logTryRestoreComponent());
        }


    }


    componentDidMount() {
        window.addEventListener('scroll', this.loghandleScroll);
        let p = new Promise(function(resolve, reject) {});


        if (this.props.logLoadingStatus === 1 || this.props.userStatus === 0) {
            this.props.dispatch(beginUser())
            this.props.dispatch(beginRefresh())
        } else {
            window.scrollTo(0, this.props.y)
        }


    }


    componentWillUnmount() {

        window.removeEventListener('scroll', this.loghandleScroll);



        if (this.props.logLoadingStatus === 2) { // 首屏成功刷出，则备份y
            this.props.dispatch(backupIScrollY(this.scrollTop))

        }

    }
    loghandleScroll() {

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
        this.props.dispatch(updateLogLoadingStatus(1)); // 恢复loading界面
        this.props.dispatch(beginRefresh());

    }
    backupIScrollY(e) {
        this.props.dispatch(backupIScrollY(e))
    }



    changeGoods() {
        console.log(this.props.pullDownStatus);
        this.props.dispatch(fetchLogGoods(this.props.logGoodsPage))
    }

    renderPage() {
        return (
            <div >
        <TopNav titleName = "兑换记录" />

               <div className='w'>

        <LogGoods logLoadingStatus={this.props.logLoadingStatus} beginRefresh={this.beginRefresh.bind(this)} logGoodsPage={this.props.logGoodsPage} logList={this.props.logList}  pullDownStatus={this.props.pullDownStatus} changeGoods={this.changeGoods.bind(this)}/>
   </div>

</div>)


    }
    render() {
        console.log(this.props.logGoodsPage);
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
        logLoadingStatus: state.MsgLogReducer.logLoadingStatus,
        LogGoodsStatus: state.MsgLogReducer.LogGoodsStatus,
        logGoodsPage: state.MsgLogReducer.logGoodsPage,
        logList: state.MsgLogReducer.logList,
        pullDownStatus: state.MsgLogReducer.pullDownStatus,
        y: state.MsgLogReducer.y

    }
}


export default connect(mapStateToProps)(Log)