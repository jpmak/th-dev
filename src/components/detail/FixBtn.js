import React from 'react';
import $ from 'jquery';
class FixBtn extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.titleTips = {
            0: '',
            1: '暂时缺货',
            2: '立即兑换'
        }
    }

    cover() {

        $('.product-cover').addClass('cover-toggle').show();
        $('.cover-mask').addClass('cover-mask-toggle').show();
        $('html').addClass('hidescroll');
    }

    render() {
        // onClick={this.cover.bind(this)}
        let stock = this.props.stock;
        let stockTips = '';
        let stockClass = 'stockNone'
        if (stock === 0) {
            stockTips = '缺货';

        } else if (stock === null) {
            stockTips = '加载中'
        } else {
            stockTips = '立即兑换'
            stockClass = '';
        }
        return (
            <div className="product-payup">
        <div className={'pay-item '+ stockClass} onClick={this.cover.bind(this)}>
                <div className="wbox-flex tc">
        <a className="th-btn th-btn-assertive">{stockTips}</a>
                </div>
            </div>
        </div>
        )
    }
}
export default FixBtn;