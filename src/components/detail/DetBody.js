import React from 'react';

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
                    exchange_points: (json.goods.exchange_points) ? json.goods.exchange_points : 0,
                    name: json.goods.goods_name,
                    stock: json.goods.stock,
                    goods_id: json.goods.goods_id,
                    goods_body: json.goods.goods_body,
                    imgsrc: json.goods.main_image,
                    item_name: (json.goods.item_name) ? '已选择：' + json.goods.item_name : '',

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

    componentWillMount() {
        if (window.localStorage.detailData) {
            this.detailMsg = JSON.parse(window.localStorage.detailData);
        }
        if (this.props.detailLoadingStatus === 2) {

            this.setState({
                iScrollUp: true
            })
        }



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
                // console.log(this.state.iScrollUp);
                this.iScrollUp();

                this.refs.Scrollup.changeBlock();
                this.touchRangeBannerX = 0;
                this.movingY = 0;

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
        let name = this.detailMsg ? this.detailMsg.productName : this.props.name;
        let item_prices = this.detailMsg ? this.detailMsg.productPrice : this.props.item_price;
        let exchange_points = this.detailMsg ? this.detailMsg.productPoints : this.props.exchange_points;
        let imgsrc = this.detailMsg ? this.detailMsg.productImg : this.props.imgsrc;
        let stock = this.props.stock;
        let item_price = parseFloat(item_prices)
        let priceHtml = '';
        if (item_price !== 0) {
            priceHtml = (<span className='point'><span className='add'>+</span><em className='money'>¥</em>{item_price}</span>)
        } else {
            priceHtml = (<span></span>)

        }
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
            <span className="num"><em>{exchange_points}</em></span><span className="unit">积分</span>
{priceHtml}
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
      


        <ProductCover history={this.history.bind(this)} exchange_points={this.props.exchange_points} pushIdStatus={this.pushIdStatus.bind(this)} isDisplay={isDisplay} imgsrc={this.props.imgsrc}  callClick={this.handleClick} item_price={this.props.item_price} stock={this.props.stock? this.props.stock : '缺货'} item_name={this.props.item_name} prop_name={this.props.prop_name} saleProp={this.props.saleProp} itemUrl={this.props.itemUrl} />
            </div>
        )


    }
}
export default DetBody;