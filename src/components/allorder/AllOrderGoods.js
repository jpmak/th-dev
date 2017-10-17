import React from 'react';

import $ from 'jquery';
import LoadingLayer from '../../components/LoadingLayer/LoadingLayer';

import Modal from '../../components/public/Modal';
import DataNone from '../../components/public/DataNone';

import {
    Link
} from 'react-router-dom'

class AllOrderGoods extends React.Component {
    constructor(props) {
        super(props);
        this.pullUpTips = {
            // 上拉状态
            0: '<i class="r-gif"></i>正在加载',
            1: '加载失败',
            2: ''
        };
        this.pullDownTips = {
            // 上拉状态
            0: '<i class="r-gif"></i>正在加载',
            1: '没有更多数据了 ',
            2: '已经到底了,别址了',
            3: '加载失败',
            4: ''
        };
        this.stateOrderNum = '';
        this.state = {
            ModalIicon: ''
        }

    };



    componentWillReceiveProps(nextProps) {
        if (nextProps.allOrderList !== this.props.allOrderList) {
            this.props.changeIsData(false);
        }
    }
    onRetryLoading() {
        this.props.beginRefresh();
    }
    handleClick(goods_name, item_price, list_image) {
        this.props.detailData(goods_name, item_price, list_image)
    }
    orderPayBtn(e) {
        this.stateOrderNum = e;
        this.refs.Modal.setText('确定已收到货吗?')
        this.refs.Modal.handleOpenModal()
    }
    ModalCallBack() {
        this.fecthPay(this.stateOrderNum)
        this.refs.Modal.handleOpenModal3();
        this.refs.Modal.handleCloseModal()
    }
    fecthPay(num) {
        $.ajax({
            url: '/wap/?g=WapSite&c=Exchange&a=finish_order',
            dataType: 'json',
            type: 'post',
            'data': {
                'order_number': num

            },
            success: (data) => {
                this.refs.Modal.handleCloseModal3();
                this.refs.Modal.handleOpenModal2()
                if (data.OK) {
                    this.refs.Modal.setText2('收货成功')
                    this.setState({
                        ModalIicon: 1
                    })
                    this.props.get_type_goods(1, this.props.allOrderType)


                } else {
                    this.setState({
                        ModalIicon: 0
                    })
                    this.refs.Modal.setText2(data.error)
                }
            },
            error: () => {
                console.log('加载失败')
            }
        });
    }

    renderLoading() {
        let outerStyle = {
            height: window.innerHeight / 2
        };
        return (
            <div>
                <LoadingLayer outerStyle={outerStyle} onRetry={this.onRetryLoading.bind(this)}
                    loadingStatus={this.props.allOrderLoadingStatus}
                />
            </div>
        );
    }

    history() {
        this.props.history()
    }
    renderPage() {

        let allOrderGoodList = [];
        let shopCostHtml = [];
        let btnHtml = [];


        let allOrderGoods = this.props.allOrderList ? this.props.allOrderList : '';
        if (allOrderGoods.length > 0) {
            allOrderGoodList = allOrderGoods.map((allOrderGood, index) => {
                let valueHtml = '';
                if (allOrderGood.prop_value) {
                    valueHtml = (<div className="prop_value-title"><span>颜色分类：{allOrderGood.prop_value}</span></div>)
                } else {
                    valueHtml = ('');
                }
                if (allOrderGood.shipping_cost === '0.00') {
                    shopCostHtml = (<span className='serve'>免运费</span>)
                } else {
                    shopCostHtml = (<span><span className='serve'>运费</span><span className='num'>¥</span><span className='num'>{allOrderGood.shipping_cost}</span></span>)
                }
                if (allOrderGood.cur_state === '待收货') {
                    btnHtml = (<div className='orderBtn' onClick={this.orderPayBtn.bind(this,allOrderGood.exchange_order_number)}>确定收货</div>)
                } else {
                    btnHtml = ('')
                }
                let priceHtml = ''
                let item_price = parseFloat(allOrderGood.price)
                if (item_price !== 0) {
                    priceHtml = (<span className='point'><span className='add'>+</span><em className='money'>¥</em>{allOrderGood.price}</span>)
                } else {
                    priceHtml = (<span></span>)

                }

                return (
                    <li key={index}>
                    <Link to={this.props.baseUrl+'/orderdetail/'+allOrderGood.exchange_order_number} className='upItem' >
<div className='order'>
<div className='orderNum' ><span>订单号：</span><span>{allOrderGood.exchange_order_number}</span>
</div>
<div className='orderState'><span>{allOrderGood.cur_state} </span></div>
</div>

   <div className="info-img"><img alt="" className="lazy" src={allOrderGood.goods_image}/>{/*</LazyLoad>*/}</div>
   <div className="info-bar">
   <div className="pro-title">{allOrderGood.goods_name}</div>
       {
                    valueHtml
                }
   <div className="e-numb"><span className="e-price"><em className='moneyPrice'>{allOrderGood.t_beans}</em>积分</span>
                {
                    priceHtml
                }
   <span className="orderPrice">X1</span>
   </div>
   </div>
      </Link>  
   <div className='totalWrap'>
   <div className='orderTotal'>
<div className='total'><span>总计</span> <span className='num'>{allOrderGood.t_beans}</span><span className='num'>积分</span>{priceHtml} <i className='add'>+</i> {shopCostHtml}  </div>
{btnHtml}
   </div>

   </div>
   
    </li>
                )
            }, this)
        } else if (this.props.allOrderGoodsPage === 1 && !allOrderGoods.length) {

            allOrderGoodList = <DataNone/>;
        }

        return (

            <div className="app-pd-wp pt88" style={{paddingBottom:'0'}}>
                    <p ref="PullUp" id="PullUp" dangerouslySetInnerHTML={{__html:this.pullUpTips[this.props.pullUpStatus]}} />
                <div className="app-pd-list hor-list order">
                   <ul >
     
                {allOrderGoodList}
                   </ul>
                    </div>
              <p ref="PullDown" id="PullDown" dangerouslySetInnerHTML={{__html:this.pullDownTips[this.props.pullDownStatus]}} />
                      <Modal ref='Modal'  icon={this.state.ModalIicon}  ModalCallBack={this.ModalCallBack.bind(this)}/>
                    </div>
        )
    }


    render() {
        let renderHtml = [];
        if (this.props.allOrderLoadingStatus !== 2 && this.props.userStatus === 1) {
            renderHtml = this.renderLoading();
        } else if (this.props.allOrderLoadingStatus === 3 && this.props.userStatus === 0) {
            renderHtml = this.history();
            //跳去跳转页面
        } else {
            renderHtml = this.renderPage();

        }
        return (
            <div>
               {renderHtml} 
            </div>

        )
    }


}

export default AllOrderGoods;