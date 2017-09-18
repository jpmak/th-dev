import React from 'react';
import {
    connect
} from 'react-redux'
import $ from 'jquery';
import Goback from '../components/public/Goback';
import LoadingLayer from '../components/LoadingLayer/LoadingLayer';
// import ResultWrap from '../components/search/ResultWrap';
import SearchInput from '../components/search/SearchInput';
import DelValue from '../components/search/DelValue';
import SearchBtn from '../components/search/SearchBtn';
import SearchResult from '../components/search/SearchResult';
import ListNav from '../components/list/ListNav';
import ListGoods from '../components/list/ListGoods';
import {
    ListTryRestoreComponent,
    fetchListNav,
    fetchListGoods,
    beginRefresh,
    changeLoading,
    updateListLoadingStatus
} from '../actions/list'
import {
    updateLoadingStatus,
} from '../actions/search'
class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            message: '',
            searchMsgStatus: false,
            pushSearch: true,
            wrapHeight: 0
        };
    }
    componentWillMount() {
        this.props.dispatch(updateLoadingStatus(1)); //重置搜索页的loading状态
        this.props.dispatch(ListTryRestoreComponent());
        if (window.localStorage.searchhistory) {
            this.setState({
                searchMsgStatus: true
            });
        }

    }
    componentDidMount() {
        if (this.props.listLoadingStatus === 1) {
            this.props.dispatch(beginRefresh());
        }
        let windowHeight = window.screen.height;
        let searchBox = document.getElementById("boxHeight").offsetHeight;

        this.setState({
                wrapHeight: windowHeight - searchBox
            })
            // console.log(document.getElementById("boxHeight").offsetHeight);

    }



    componentWillReceiveProps(nextProps) {


        }
        //search

    funStoreHistory(e) {
        this.refs.getarr.funStoreHistory(e)
    }
    searchMsgStatus_fun(e) {
        this.setState({
            searchMsgStatus: e
        });
    }
    pushValue(e) {
        this.setState({
            value: e
        })
    }
    historyPush(e) {
        this.props.history.push('/search/' + e)
    }
    _handleClick(e) {
        this.refs.getarr.funStoreHistory(e);
        // this.refs.getarr.pushSearch();
    }
    handleDel() {
        $('#searchInput').val('').focus();
        $('#del').hide();

    }
    clearValue() {
            this.setState({
                value: ''
            });
            this.refs.SearchInput.clearValue();
        }
        //search
    getListGoods(index, id) {

        this.props.dispatch(fetchListGoods(index, id));

    }

    changeLoading(e) {

        this.props.dispatch(changeLoading(e));

    }
    onRetryLoading() {
        this.props.dispatch(updateListLoadingStatus(1)); // 恢复loading界面
        this.props.dispatch(beginRefresh());
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
            <div id="js-list">
        <div className="list-wrap wbox" style={{height:this.state.wrapHeight}}>
        <ListNav navItems={this.props.navItems} pushIndex={this.props.pushIndex} navStatus={this.props.navStatus} height={this.state.wrapHeight} listGoods={this.getListGoods.bind(this)} changeLoading={this.changeLoading.bind(this)}/>
        <ListGoods goodItems={this.props.goodItems} changeLoading={this.props.changeLoading}  height={this.state.wrapHeight} goodStatus={this.props.goodStatus} goodsFun={this.funStoreHistory.bind(this)}/>
        </div>
    </div>);

    }
    render() {

        let renderHtml = [];
        // 首屏没有加载成功，那么均展示loading效果
        if (this.props.listLoadingStatus !== 2) {
            renderHtml = this.renderLoading();
        } else {

            renderHtml = this.renderPage();

        }
        return (<div>
     <div className= 'th-search-container th-nav-list pr on-focus'>

            <div id='boxHeight' className="th-search-box">
                <div className="th-search-shadow"></div>
         <GobackUp />
        <SearchBtn funStoreHistory={this.funStoreHistory.bind(this)} value={this.state.value}/>
        {/*<a className="search-btn" onClick={this._handleClick.bind(this)}>搜索</a>*/}
                    <div className="wbox search-bar" >
                    <i className="th-search-iconbtn"></i>
        <DelValue handleDel={this.clearValue.bind(this)}/>
                    <div className="wbox-flex">
               <div className="th-search-form">
            
     <SearchInput  ref='SearchInput' pushValue={this.pushValue.bind(this)} historyPush={this.historyPush.bind(this)} parmKeyword={ this.props.parmKeyword} funStoreHistory={this.funStoreHistory.bind(this)} searchMsgStatus={this.state.searchMsgStatus}/>

                        </div>
                    </div>
     
                </div>
            </div>

<SearchResult ref="getarr"  historyPush={this.historyPush.bind(this)} searchMsgStatus_fun={ this.searchMsgStatus_fun.bind(this)} handleDel = {this.handleDel.bind(this)}  />

        </div>
        {
            renderHtml
        }
</div>)



    }
}



class GobackUp extends React.Component {

    handClick() {
        $('#searchInput').blur();
        $('#js-list,.class,.result-wp').show();
        $('.search-wrap,.th-search-box .backbtn,.fixedSearch').hide();
    }

    render() {
        return (
            <div>
         <Goback/>
                <a className="backbtn" onClick={this.handClick.bind(this)}> </a>
               </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        listLoadingStatus: state.MsgListReducer.listLoadingStatus,
        navStatus: state.MsgListReducer.navStatus,
        navItems: state.MsgListReducer.navItems,
        pushIndex: state.MsgListReducer.pushIndex,
        goodStatus: state.MsgListReducer.goodStatus,
        goodItems: state.MsgListReducer.goodItems,
        changeLoading: state.MsgListReducer.changeLoading
    }
}


export default connect(mapStateToProps)(List)