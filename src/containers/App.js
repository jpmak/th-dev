import React from 'react';
import {
	connect
} from 'react-redux'
import $ from 'jquery';

import TopNav from '../components/TopNav';
import SearchBox from '../components/SearchBox';
import SlickBanner from '../components/SlickBanner';
import SlickBanner2 from '../components/SlickBanner2';
import SalesWrapper from '../components/SalesWrapper';
import JsCate from '../components/JsCate';
import FooterNav from '../components/FooterNav';
import {
	tryRestoreComponent,
	beginRefresh,
	fetchCateGoods,
	getCateId,
	pullUpStatus,
	liMove
} from '../actions'
import {
	updateLoadingStatus,
} from '../actions/search'

import {
	detailInit,
} from '../actions/detail'



class App extends React.Component {
	componentWillMount() {
		this.props.dispatch(updateLoadingStatus(1)); //清空搜索status
		this.props.dispatch(tryRestoreComponent());
	}
	componentDidMount() {
		console.log(this.props.loadingStatus);
		if (this.props.loadingStatus === 1) {
			this.props.dispatch(beginRefresh())
		}

	}

	get_cate_goods(index, id, page) {
		this.props.dispatch(getCateId(id))
		this.props.dispatch(fetchCateGoods(index, id, page))
	}
	changeGoods(e, page) {
		if (this.props.pullUpStatus !== 0) {
			this.props.dispatch(fetchCateGoods(this.props.cateId, this.props.CateGoodsPage))
		}
	}
	UpDataPullUpStatus(e) {
		this.props.dispatch(pullUpStatus(e))
	}
	detailData(goods_name, item_price, list_image) {
		// this.props.dispatch(LocalDetailData(goods_name, item_price, list_image))
		this.props.dispatch(detailInit())

		window.localStorage.detailData = JSON.stringify({
			'productName': goods_name,
			'productPrice': item_price,
			'productImg': [list_image]
		})
	}
	liMove(index, widths, width) {
		this.props.dispatch(liMove(index, widths, width))
	}
	render() {
		console.log(this.props.loadingStatus);
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
			<a href="www.163.com">1111111</a>
		<header id="headnav" >
		<TopNav titleName = "兑换商城"	icon = "jf-record-icon" icon_link = "search.html" />
		</header>
		<div id='search' style={{ zIndex:'200'}}>
		<SearchBox loadingStatus={this.props.loadingStatus} parmKeyword={this.props.match.params.keyword} history={this.props.history} />
		</div>
		<div className='w'>
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
		<JsCate loadingStatus={loadingStatus} detailData={this.detailData.bind(this)} cateList={cateList} cateGoods={cateGoods} liWidth={liWidth} moveWidths={moveWidths} pushIndex={pushIndex} pageStatus={pageStatus} pullDownStatus={pullDownStatus} pullUpStatus={pullUpStatus} UpDataPullUpStatus={this.UpDataPullUpStatus.bind(this)} get_cate_goods={this.get_cate_goods.bind(this)} changeGoods={this.changeGoods.bind(this)} liMove={this.liMove.bind(this)}/>

            </div>
		<footer id='nav '>
            <FooterNav/>
            </footer>
</div>
		);
	}
}



const mapStateToProps = state => {
	return {
		searchLoadingStatus: state.MsgListPageReducer.loadingStatus,
		loadingStatus: state.MsgAppReducer.loadingStatus,
		userStatus: state.MsgAppReducer.userStatus,
		// userMoney: state.MsgAppReducer.userMoney,
		// userBuy: state.MsgAppReducer.userBuy,
		// UserTourism: state.MsgAppReducer.UserTourism,
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
		liWidth: state.MsgAppReducer.liWidth
	}
}

// function mapDispatchToProps(actions, dispatch) {
// 	return bindActionCreators(actions, dispatch);
// }
export default connect(mapStateToProps)(App)