import React from 'react';
import $ from 'jquery';

class PutBtn extends React.Component {
    payway() {
        $('#payWay').show();
        $('.product-cover').removeClass('cover-mask-toggle').hide();

    }
    render() {
        return (
            <div className='fix-box product-payup' onClick={this.payway.bind(this)}>
        <div className='pay-item'>
        <div className='wbox-flex tc exchange-submit'>
        <a className='th-btn th-btn-assertive'>确定</a>
                        </div>
                    </div>
                </div>
        )

    }
}

export default PutBtn;