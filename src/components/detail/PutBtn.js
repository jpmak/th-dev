import React from 'react';
import $ from 'jquery';

class PutBtn extends React.Component {
    // payway() {
    //     $('#payWay').show();
    //     $('.product-cover').removeClass('cover-mask-toggle').hide();

    // }
    // onClick={this.payway.bind(this)}
    handelClick() {
        this.props.history();
    }
    render() {
        return (
            <div className='fix-box product-payup' >
        <div className='pay-item'>
        <div className='wbox-flex tc exchange-submit' onClick={this.handelClick.bind(this)}>
        <a className='th-btn th-btn-assertive' >确定</a>
                        </div>
                    </div>
                </div>
        )

    }
}

export default PutBtn;