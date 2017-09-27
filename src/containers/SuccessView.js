import React from 'react';
import {
    connect
} from 'react-redux'
// import '../styles/userInfo.scss';

import $ from 'jquery';


import Goback from '../components/public/Goback';

class TopNav extends React.Component {

    static defaultProps = {
        dis: 'none'
    };
    backEchange() {
        this.props.backEchange()
    }
    render() {
        return (
            <div className="th-nav wbox " style={{background:'#fff'}}>
      <a className="class th-nav-back" href="javascript:history.go(-2);"> </a>
            <div className="th-nav-title of bg">{this.props.titleName}</div>
            <div className="th-nav-right tr" style={{display: this.props.dis}}>
            <a className={this.props.icon} href={this.props.icon_link}> </a>
               {/*  <a className="jf-record-icon" href=""> </a>*/}
            </div>
        </div>
        );
    }
}

class SuccessView extends React.Component {



    renderPage() {
        return (
            <div >
        <TopNav titleName = "支付成功" />

               <div className='w'>
<div className="successOrder">
                <img src="http://dev.thgo8.com/public/app_site/images/ExchangeShop/success.png" alt=""/>
                <p>恭喜您，兑换成功啦!</p>
                <div className="button">
                    <a className='order_details' href=''>订单详情</a>
                    <a className='continue_exchange' href=''>继续兑换</a>
                </div>
            </div>

   </div>

</div>)


    }
    render() {

        let renderHtml = [];
        renderHtml = this.renderPage();
        return (
            <div>
        {
            renderHtml
        }
        </div>
        );


    }
}



export default SuccessView