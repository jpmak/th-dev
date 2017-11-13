import React from 'react';
import {
    connect
} from 'react-redux'

import TopNav from '../components/TopNav';

import AllOrderCate from '../components/allorder/AllOrderCate';
import AllOrderGoods from '../components/allorder/AllOrderGoods';
import {
    scrollUp,
    beginUser
} from '../actions'
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
        this.isDataing = false;
        this.allOrderHandleScroll = this.allOrderHandleScroll.bind(this);

    };
    componentWillMount() {
        let p = new Promise(function(resolve, reject) {});
        document.title = '兑换订单'
        if (window.localStorage.user_info != 1) {
            //类型转换
            this.props.history.push(this.props.baseUrl + '/login/allorder')
        } else {
            this.props.dispatch(allOrderTryRestoreComponent());
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.allOrderHandleScroll);

        if (window.localStorage.user_info == 1) {
            if (this.props.allOrderLoadingStatus !== 2) {
                // this.props.dispatch(beginUser())
                this.props.dispatch(beginRefresh())
            } else {
                window.scrollTo(0, this.props.y)
            }
        }
    }

    componentWillUnmount() {
            window.removeEventListener('scroll', this.allOrderhandleScroll);

            if (this.props.allOrderLoadingStatus === 2) { // 首屏成功刷出，则备份y
                this.props.dispatch(backupIScrollY(this.scrollTop))
            } else if (this.props.allOrderLoadingStatus === 3) {
                this.props.dispatch(updateAllOrderLoadingStatus(1));
            }
        }
        //search
    allOrderHandleScroll() {
        let clientHeight = this.props.dispatch(scrollUp.getClientHeight())
        let scrollTop = this.props.dispatch(scrollUp.getScrollTop()); //滚动条滚动高度
        let scrollHeight = this.props.dispatch(scrollUp.getScrollHeight()); //滚动内容高度
        // let clientHeight = this.getClientHeight(); //可视区域高度
        // let scrollTop = this.getScrollTop(); //滚动条滚动高度
        // let scrollHeight = this.getScrollHeight(); //滚动内容高度
        if ((clientHeight + scrollTop) === (scrollHeight) && this.props.allOrderGoodsStatus !== 0 && this.isDataing === false) {
            this.isDataing = true;
            this.changeGoods()
        }
        this.scrollTop = scrollTop

    }
    beginRefresh() {
        this.props.dispatch(updateAllOrderLoadingStatus(1)); // 恢复loading界面
        this.props.dispatch(beginUser())
        this.props.dispatch(beginRefresh());
    }



    UpDataCateType(type, move) {
        this.props.dispatch(UpDataCateType(type, move))
    }
    changeIsData(e) {
        this.isDataing = e
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
    history() {
        this.props.history.push(this.props.baseUrl + '/login/allorder')
    }
    renderPage() {
        return (
            <div >
        <TopNav titleName = "兑换订单" border='0' color='#fbfbfb' fixed='1'/>
                <AllOrderCate TypeMove={this.props.TypeMove} allOrderType={this.props.allOrderType} get_type_goods={this.get_type_goods.bind(this)}  UpDataPullUpStatus={this.UpDataPullUpStatus.bind(this)} UpDataCateType={this.UpDataCateType.bind(this)}/>
               <div className='w pt88'>


        <AllOrderGoods ref='AllOrderGoods' baseUrl={this.props.baseUrl} allOrderGoodsStatus={this.props.allOrderGoodsStatus}  changeIsData={this.changeIsData.bind(this)}  history={this.history.bind(this)} userStatus={this.props.userStatus} allOrderType={this.props.allOrderType} get_type_goods={this.get_type_goods.bind(this)}   pullUpStatus={this.props.pullUpStatus} allOrderLoadingStatus={this.props.allOrderLoadingStatus} beginRefresh={this.beginRefresh.bind(this)} allOrderGoodsPage={this.props.allOrderGoodsPage} allOrderList={this.props.allOrderList}  pullDownStatus={this.props.pullDownStatus} changeGoods={this.changeGoods.bind(this)} />
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