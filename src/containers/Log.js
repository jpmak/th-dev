import React from 'react';
import {
    connect
} from 'react-redux'
import $ from 'jquery';
import TopNav from '../components/TopNav';
import Goback from '../components/public/Goback';
import LogGoods from '../components/log/LogGoods';

import {
    tryRestoreComponent,
    beginUser,

} from '../actions'
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
        this.isDataing = false;
        this.scrollTop = 0;
        this.loghandleScroll = this.loghandleScroll.bind(this);
    };
    componentWillMount() {
        let p = new Promise(function(resolve, reject) {});

        if (window.localStorage.user_info != 1) {
            p.then(this.props.history.push('/Exchange-index.html/login/log/'))
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
    getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }
    getClientHeight() {
        var windowHeight = 0;
        if (document.compatMode == "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    }
    getScrollHeight() {
        var scrollHeight = 0,
            bodyScrollHeight = 0,
            documentScrollHeight = 0;
        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    }
    loghandleScroll() {
        console.log()

        let bodyBox = document.getElementById('root')
        let clientHeight = this.getClientHeight(); //可视区域高度
        let scrollTop = this.getScrollTop(); //滚动条滚动高度
        let scrollHeight = this.getScrollHeight(); //滚动内容高度
        this.scrollTop = scrollTop
        if ((clientHeight + scrollTop) == (scrollHeight) && this.props.loghandleScroll !== 0 && this.isDataing === false) {
            this.isDataing = true;
            this.changeGoods()
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.logList !== this.props.logList) {
            this.isDataing = false;
        }
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
        this.props.dispatch(fetchLogGoods(this.props.logGoodsPage))
    }

    renderPage() {
        return (
            <div >
        <TopNav titleName = "兑换记录" color='#fbfbfb' border='0'/>

               <div className='w'>

        <LogGoods logLoadingStatus={this.props.logLoadingStatus} beginRefresh={this.beginRefresh.bind(this)} logGoodsPage={this.props.logGoodsPage} logList={this.props.logList}  pullDownStatus={this.props.pullDownStatus} changeGoods={this.changeGoods.bind(this)}/>
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
        logLoadingStatus: state.MsgLogReducer.logLoadingStatus,
        LogGoodsStatus: state.MsgLogReducer.LogGoodsStatus,
        logGoodsPage: state.MsgLogReducer.logGoodsPage,
        logList: state.MsgLogReducer.logList,
        pullDownStatus: state.MsgLogReducer.pullDownStatus,
        y: state.MsgLogReducer.y

    }
}


export default connect(mapStateToProps)(Log)