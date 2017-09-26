import React from 'react';
import $ from 'jquery';
import Banner from './Banner';
import FixBtn from './FixBtn';
import BottomTipFloor from './BottomTipFloor';
import ProductCover from './ProductCover';
import CoverMask from './CoverMask';
import Scrollup from './Scrollup';
import PayWay from './PayWay';

import {
    Link
} from 'react-router-dom'

class DetBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saleProp: [],
            prop_name: '',
            itemUrl: '',
            imgsrc: [],
            item_price: '',
            name: '',
            stock: null,
            goods_id: '',
            goods_body: '',
            item_name: '',
            isDisplay: true,
            isPushUp: 'none',
            iScrollUp: false


        };
        this.detailMsg = '';
        this.touchRangeY = 0; // 触控距离;
        this.movingY = 0;
        this.touchRangeBannerX = 0; // 触控距离;
        this.movIngbannerX = 0;

    }
    stopPropagation(e) {
        e.stopPropagation();
    }

    handleClick() {
            fetch('/wap/?g=WapSite&c=Exchange&a=get_goods_msg', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: 'id=' + this.props.paramsId

                })
                .then((res) => res.json())
                .then((json) => {
                    this.setState({
                        prop_name: (json.prop_name) ? json.prop_name : '',
                        // saleProp: (json.saleProp) ? json.saleProp : [],
                        saleProp: json.saleProp,
                        itemUrl: (json.itemUrl) ? json.itemUrl : '',
                        item_price: json.goods.item_price,
                        name: json.goods.goods_name,
                        stock: json.goods.stock,
                        goods_id: json.goods.goods_id,
                        goods_body: json.goods.goods_body,
                        imgsrc: json.goods.main_image,
                        item_name: (json.goods.item_name) ? '已选择：' + json.goods.item_name : ''
                    });

                    if (!json.saleProp) {
                        this.setState({
                            isDisplay: false
                        });
                    }

                })
                .catch(function(e) {
                    console.log("加载失败");
                });
        }
        // getUpItem() {
        //     if (window.localStorage.upItem) {
        //         eventId = window.localStorage.upItem;
        //         this.handleClick();
        //     } else {
        //         alert('网络异常')
        //     }
        // }
    componentWillMount() {
        if (window.localStorage.detailData) {
            this.detailMsg = JSON.parse(window.localStorage.detailData);
            // this.setState({
            //     name: this.detailMsg.productName,
            //     item_price: this.detailMsg.productPrice,
            //     imgsrc: this.detailMsg.productImg
            // });
        }
    }
    componentDidMount() {

        $("body").unbind("touchmove");
    }

    componentDidUpdate() {

        // const _this = this
        // $('.way-wp li').on('click', function() {
        //     $(this).addClass('cur').siblings().removeClass('cur');
        // });
        // $('.select-list .items .value').on('click', function() {
        //     $(this).addClass('cur disabled').siblings().removeClass('cur disabled');
        //     // eventId = $(this).attr('id');
        //     _this.handleClick();
        // });
    }
    iScrollUp() {
        this.setState({
            iScrollUp: !this.state.iScrollUp
        })
    }
    startMoveBannerX(e) {
        this.touchRangeBannerX = e.touches[0].pageX;
    }
    movIngBannerX(e) {
        this.movingbannerX = e.touches[0].pageX;
    }

    startMoveY(e) {
        this.touchRangeY = e.touches[0].pageY;
        this.movingbannerX = 0;


    }
    movIngY(e) {
        this.movingY = e.touches[0].pageY
    }
    endMove() {
        if (Math.abs(this.touchRangeBannerX - this.movingbannerX) < 20) {
            if (this.touchRangeY - this.movingY > 20 && this.state.iScrollUp && this.movingY !== 0) {
                let num = this.touchRangeY - this.movingY;
                // console.log('Range= ' + this.touchRangeY);
                // console.log('movingY= ' + this.movingY);
                // console.log(num);
                this.iScrollUp();
                this.touchRangeBannerX = 0;
                this.refs.Scrollup.changeBlock()
            }
        } else {
            this.touchRangeBannerX = 0;

        }

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.goodStatus !== this.props.goodStatus) {
            this.setState({
                iScrollUp: !this.state.iScrollUp,
                stock: this.props.stock
            })
        }
    }

    pushIdStatus(id) {
        this.props.pushIdStatus(id);
    }
    history() {
        this.props.history();
    }
    render() {
        let isDisplay = this.state.isDisplay ? 'block' : 'none';
        let name = this.props.name ? this.props.name : this.detailMsg.productName;
        let item_price = this.props.item_price ? this.props.item_price : this.detailMsg.productPrice;
        // let imgsrc=this.props.imgsrc?this.props.imgsrc:this.detailMsg.productImg;
        let imgsrc = this.props.imgsrc ? this.props.imgsrc : this.detailMsg.productImg;
        let stock = this.props.stock;
        // imgsrc={this.props.imgsrc[0]}

        return (
            <div>
            <div className="produt-show" style={{position:'relative'}} onTouchStart={this.startMoveY.bind(this)} onTouchMove={this.movIngY.bind(this)}  onTouchEnd={this.endMove.bind(this)}>
     
            <div className="w">
            <div  onTouchStart={this.startMoveBannerX.bind(this)} onTouchMove={this.movIngBannerX.bind(this)} >
        <Banner imgsrc={imgsrc}/>
          </div>
            <div className="product-main">
            <div className="product-tit">
            <h1>{name}</h1>
        <div className='tip'>产品不设退换</div>
                <div className="product-price">
            <span className="num"><em>{item_price}</em></span><span className="unit">积分</span>
            </div>
            </div>

            <div className="product-count">
        <p className="remaining"><Link to={'/search/1'}>
        剩余库存:
        </Link>
        <em>{this.props.stock? this.props.stock : '0'}</em></p>
            </div>
  
            </div>
            </div>
               <FixBtn title = "立即兑换" stock={stock} />
            <BottomTipFloor/>
        <Scrollup ref='Scrollup'  goods_body={this.props.goods_body} iScrollUp={this.iScrollUp.bind(this)}/>
            </div>
                <PayWay/>
            <CoverMask />
      


        <ProductCover history={this.history.bind(this)} pushIdStatus={this.pushIdStatus.bind(this)} isDisplay={isDisplay} imgsrc={this.props.imgsrc}  callClick={this.handleClick} item_price={this.props.item_price} stock={this.props.stock? this.props.stock : '缺货'} item_name={this.props.item_name} prop_name={this.props.prop_name} saleProp={this.props.saleProp} itemUrl={this.props.itemUrl} />
            </div>
        )


    }
}
export default DetBody;