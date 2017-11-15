import React from 'react';
import {
    connect
} from 'react-redux'

import TopNav from '../components/TopNav';
import LogGoods from '../components/log/LogGoods';

import {
    beginUser,
    scrollUp
} from '../actions'
import {
    beginShare
} from '../actions/wxchat'
import {
    logTryRestoreComponent,
    beginRefresh,
    fetchLogGoods,
    updateLogLoadingStatus,
    backupIScroll,
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

        document.title = '兑换记录'
        let p = new Promise(function(resolve, reject) {});

        if (window.localStorage.user_info != 1) {
            // 转换数字
            this.props.history.push(this.props.baseUrl + '/login/log')
        } else {
            this.props.dispatch(logTryRestoreComponent());
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.loghandleScroll);
        if (window.localStorage.user_info == 1) {
            // 转换数字
            if (this.props.logLoadingStatus !== 2) {
                // this.props.dispatch(beginUser())
                this.props.dispatch(beginRefresh())
            } else {
                window.scrollTo(0, this.props.y)
            }
        }
        this.props.dispatch(beginShare('log'))

    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.loghandleScroll);
        if (this.props.logLoadingStatus === 2) { // 首屏成功刷出，则备份y
            this.props.dispatch(backupIScrollY(this.scrollTop))
        } else if (this.props.logLoadingStatus === 3) {
            this.props.dispatch(updateLogLoadingStatus(1));
        }

    }
    loghandleScroll() {
        let clientHeight = this.props.dispatch(scrollUp.getClientHeight())
        let scrollTop = this.props.dispatch(scrollUp.getScrollTop()); //滚动条滚动高度
        let scrollHeight = this.props.dispatch(scrollUp.getScrollHeight()); //滚动内容高度
        this.scrollTop = scrollTop
        if ((clientHeight + scrollTop) === (scrollHeight) && this.props.LogGoodsStatus !== 0 && this.isDataing === false) {
            this.isDataing = true;
            this.changeGoods()
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.logList !== this.props.logList) {
            this.isDataing = false;
        }
    }

    beginRefresh() {
        this.props.dispatch(updateLogLoadingStatus(1));
        this.props.dispatch(beginUser())
        this.props.dispatch(beginRefresh())

    }
    backupIScrollY(e) {
        this.props.dispatch(backupIScrollY(e))
    }

    changeGoods() {
        this.props.dispatch(fetchLogGoods(this.props.logGoodsPage))
    }
    history() {
        this.props.history.push(this.props.baseUrl + '/login/log')
    }
    renderPage() {
        return (
            <div >
        <TopNav titleName = "兑换记录" color='#fbfbfb' border='0' fixed='1'/>

               <div className='w pt88'>

        <LogGoods baseUrl={this.props.baseUrl} history={this.history.bind(this)} userStatus={this.props.userStatus} logLoadingStatus={this.props.logLoadingStatus} beginRefresh={this.beginRefresh.bind(this)} logGoodsPage={this.props.logGoodsPage} logList={this.props.logList}  pullDownStatus={this.props.pullDownStatus} changeGoods={this.changeGoods.bind(this)}/>
   </div>

</div>)


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
        logLoadingStatus: state.MsgLogReducer.logLoadingStatus,
        LogGoodsStatus: state.MsgLogReducer.LogGoodsStatus,
        logGoodsPage: state.MsgLogReducer.logGoodsPage,
        logList: state.MsgLogReducer.logList,
        pullDownStatus: state.MsgLogReducer.pullDownStatus,
        y: state.MsgLogReducer.y

    }
}


export default connect(mapStateToProps)(Log)