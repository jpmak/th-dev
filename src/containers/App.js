import React from 'react';
import {
	connect
} from 'react-redux'

import TopNav from '../components/TopNav';
import SearchBox from '../components/SearchBox';
import SlickBanner from '../components/SlickBanner';
import SlickBanner2 from '../components/SlickBanner2';
import SalesWrapper from '../components/SalesWrapper';
import JsCate from '../components/JsCate';
import FooterNav from '../components/FooterNav';
import WechatSdk from '../components/public/WechatSdk';

import {
	scrollUp,
	tryRestoreComponent,
	beginRefresh,
	fetchCateGoods,
	getCateId,
	pullUpStatus,
	liMove,
	backupIScrollY
} from '../actions'
import {
	updateLoadingStatus,
} from '../actions/search'

import {
	detailInit,
} from '../actions/detail'
import {
	beginShare,
} from '../actions/wxchat'


class App extends React.Component {
	constructor(props) {
		super(props);
		this.scrollTop = 0;
		this.isDataing = false;
		this.appHandleScroll = this.appHandleScroll.bind(this);

	};
	componentWillMount() {
		document.title = '积分商城'
		this.props.dispatch(updateLoadingStatus(1)); //清空搜索status
		this.props.dispatch(tryRestoreComponent());
	}
	componentDidMount() {
		window.addEventListener('scroll', this.appHandleScroll);

		if (this.props.loadingStatus === 1) {
			this.props.dispatch(beginRefresh())
		} else {
			window.scrollTo(0, this.props.y)
		}
		this.props.dispatch(beginShare())

	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.appHandleScroll);
		if (this.props.loadingStatus === 2) { // 首屏成功刷出，则备份y
			this.props.dispatch(backupIScrollY(this.scrollTop))
		}
	}
	appHandleScroll() {
		let clientHeight = this.props.dispatch(scrollUp.getClientHeight())
		let scrollTop = this.props.dispatch(scrollUp.getScrollTop()); //滚动条滚动高度
		let scrollHeight = this.props.dispatch(scrollUp.getScrollHeight()); //滚动内容高度
		this.refs.JsCate.fixWrap(scrollTop)
		this.scrollTop = scrollTop
		if ((clientHeight + scrollTop) === (scrollHeight) && this.isDataing === false) {
			this.isDataing = true;
			this.changeGoods()
		}
	}
	get_cate_goods(index, id, page) {
		// this.props.dispatch(getCateId(id))
		this.props.dispatch(fetchCateGoods(index, id, page))
	}
	changeIsData(e) {
		console.log(e);
		this.isDataing = e
	}
	changeGoods(e, page) {
		if (this.props.pullUpStatus !== 0) {
			this.props.dispatch(fetchCateGoods(this.props.cateId, this.props.CateGoodsPage))
		}
	}
	UpDataCateId(id) {

		this.props.dispatch(getCateId(id))

	}
	UpDataPullUpStatus(e) {
		this.props.dispatch(pullUpStatus(e))
	}
	detailData(goods_name, exchange_points, item_price, list_image) {
		this.props.dispatch(detailInit())

		window.localStorage.detailData = JSON.stringify({
			'productName': goods_name,
			'productPoints': exchange_points,
			'productPrice': item_price,
			'productImg': [list_image]
		})
	}
	liMove(index, widths, width) {
		this.props.dispatch(liMove(index, widths, width))
	}
	render() {
		const {
			loadingStatus,
			bannerItems,
			bannerItems_2,
			salesItems,
			cateList,
			pushIndex,
			cateGoods,
			pullUpStatus,
			pullDownStatus,
			pageStatus,
			liWidth,
			moveWidths
		} = this.props
		return (
			<div id='AppWrap'>
		<div id='scrollwrap' >
	
		<header id="headnav" >
		<TopNav titleName = "兑换商城"	icon = "jf-record-icon" icon_link = "search.html" />
		</header>
		
		<div className='w'>
		<div id='search' style={{ zIndex:'200'}}>
		<SearchBox loadingStatus={this.props.loadingStatus} parmKeyword={this.props.match.params.keyword} history={this.props.history} />
		</div>
		<div id="AppBanner">
		<SlickBanner bannerItems={bannerItems}/>
		</div>
		<div className='jf-bsell-box'>
        <SalesWrapper salesItems={salesItems} detailData={this.detailData.bind(this)}/>
        </div>
  		<div id="AppBanner_2">
		<SlickBanner2 bannerItems_2={bannerItems_2}/>
		</div>
		</div>
		</div>
			<div className='w'>
		<JsCate ref='JsCate' changeIsData={this.changeIsData.bind(this)} UpDataCateId={this.UpDataCateId.bind(this)}  loadingStatus={loadingStatus} detailData={this.detailData.bind(this)} cateList={cateList} cateGoods={cateGoods} liWidth={liWidth} moveWidths={moveWidths} pushIndex={pushIndex} pageStatus={pageStatus} pullDownStatus={pullDownStatus} pullUpStatus={pullUpStatus} UpDataPullUpStatus={this.UpDataPullUpStatus.bind(this)} get_cate_goods={this.get_cate_goods.bind(this)} changeGoods={this.changeGoods.bind(this)} liMove={this.liMove.bind(this)}/>

            </div>
		<footer id='nav '>
            <FooterNav/>
            </footer>
		<WechatSdk appId={this.props.appId} timestamp={this.props.timestamp} nonceStr={this.props.nonceStr} signature={this.props.signature} jsApiList={this.props.jsApiList}/>
</div>
		);
	}
}



const mapStateToProps = state => {
	return {
		searchLoadingStatus: state.MsgListPageReducer.loadingStatus,
		loadingStatus: state.MsgAppReducer.loadingStatus,
		y: state.MsgAppReducer.y,

		userStatus: state.MsgAppReducer.userStatus,
		userMoney: state.MsgAppReducer.userMoney,
		userBuy: state.MsgAppReducer.userBuy,
		UserTourism: state.MsgAppReducer.UserTourism,
		bannerItems: state.MsgAppReducer.bannerItems,
		bannerItems_2: state.MsgAppReducer.bannerItems_2,
		cateList: state.MsgAppReducer.cateList,
		salesItems: state.MsgAppReducer.salesItems,
		cateGoods: state.MsgAppReducer.cateGoods,
		cateId: state.MsgAppReducer.cateId,
		pushIndex: state.MsgAppReducer.pushIndex,
		pullUpStatus: state.MsgAppReducer.pullUpStatus,
		pullDownStatus: state.MsgAppReducer.pullDownStatus,
		pageStatus: state.MsgAppReducer.pageStatus,
		CateGoodsPage: state.MsgAppReducer.CateGoodsPage,
		moveWidths: state.MsgAppReducer.moveWidths,
		liWidth: state.MsgAppReducer.liWidth,
		appId: state.MsgAppReducer.appId,
		timestamp: state.MsgAppReducer.timestamp,
		nonceStr: state.MsgAppReducer.nonceStr,
		signature: state.MsgAppReducer.signature,
		jsApiList: state.MsgAppReducer.jsApiList
	}
}

export default connect(mapStateToProps)(App)