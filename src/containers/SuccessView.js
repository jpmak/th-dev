import React from 'react';
import TopNav from '../components/TopNav';
import {
    connect
} from 'react-redux'

class SuccessView extends React.Component {
    componentWillMount() {
        document.title = '支付成功'
    }
    historyOrderDetail() {
        this.props.history.push(this.props.baseUrl + '/orderDetail/' + this.props.match.params.id)
    }
    historyHome() {
        this.props.history.push(this.props.baseUrl + '/')

    }

    renderPage() {
        return (
            <div >
        <TopNav titleName = "支付成功" border='0' isNone='none'/>

               <div className='w'>
<div className="successOrder">
<div className='bg'></div>
         
                <p>恭喜您，兑换成功啦!</p>
                <div className="button">
                    <a className='order_details' onClick={this.historyOrderDetail.bind(this)}>订单详情</a>
                    <a className='continue_exchange' onClick={this.historyHome.bind(this)}>返回兑换首页</a>
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

const mapStateToProps = state => {
    return {
        baseUrl: state.MsgAppReducer.baseUrl,
    }
}
export default connect(mapStateToProps)(SuccessView)