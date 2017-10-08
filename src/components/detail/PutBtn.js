import React from 'react';
import $ from 'jquery';

class PutBtn extends React.Component {

    handelClick() {
        this.props.history();
        $('html').removeClass('hidescroll');

    }
    render() {
        let stock=this.props.stock;
        let stockHtml='';
        let stockNone='';
        if(stock==='缺货'){
stockHtml='缺货';
stockNone='stockNone'
        }else{
stockHtml='确定兑换'
        }

        return (
            <div className='fix-box product-payup' >
        <div className={'pay-item '+stockNone }>
        <div className='wbox-flex tc exchange-submit' onClick={this.handelClick.bind(this)}>
        <a className='th-btn th-btn-assertive' >{stockHtml}</a>
                        </div>
                    </div>
                </div>
        )

    }
}

export default PutBtn;