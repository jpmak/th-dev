import React from 'react';


import $ from 'jquery';

import TopNav from '../components/TopNav';
import Goback from '../components/public/Goback';

import {
    tryRestoreComponent,
    beginUser,

} from '../actions'

class TranList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tranListItem: [],
            cur: 0

        };

    };
    componentWillMount() {
        window.scrollTo(0, 0)
        let p = new Promise(function(resolve, reject) {});

        if (window.localStorage.user_info != 1) {
            p.then(this.props.history.push('/Exchange-index.html/login/tranList/'))
                // .then(window.location.href = "http://www.thgo8.me/wap/User-login-1.html")
        }
    }
    componentDidMount() {
        if (this.props.userStatus === 0) {
            this.props.dispatch(beginUser())


        } else {
            this.fetchTranList(this.props.match.params.id)
        }


    }

    fetchTranList(orderNum) {
        $.ajax({
            url: '/wap/?g=WapSite&c=Exchange&a=getOrderPrompt',
            dataType: 'json',
            type: 'post',
            'data': {
                'orderId': '161012114229844205'
            },
            success: (data) => {
                if (data.status && data.delivery.track) {
                    this.setState({
                        tranListItem: data.delivery.track
                    })

                } else {
                    this.setState({
                        tranListItem: 'none'
                    })
                }
            },
            error: () => {

            }
        });
    }
    rendNone() {
        return (

            <div className='wlNoData'>
<h3>暂无物流包裹</h3>
</div>

        )


    }

    checkIndex(index) {
        return index === this.state.cur ? 'log-lists cur' : 'log-lists'
    }

    renderPage() {
        let detHtml = [];
        let detGoods = this.state.tranListItem.info ? this.state.tranListItem.info : '';
        let checkCur = 'log-lists';

        if (detGoods != '') {
            detHtml = detGoods.map((detGood, index) => {

                return (
                    <div className={this.checkIndex(index)} key={index}>
                <i></i>
                <div className="time">{detGood.time}</div>
                <div className="txt">{detGood.context}</div>
                </div>


                )
            }, this)
        }



        return (
            <div>
        <TopNav titleName = "物流列表" />
           <div className='w'>
           <div className="wuliu">
                <div className="log-info">
                <div className="log-icon">
             
                </div>
                <div className="log-cont">
                <dl>
                <dt>物流状态</dt>
        <dd>{this.state.tranListItem.status}</dd>
                </dl>
                <dl>
                <dt>物流公司</dt>
                <dd>{this.state.tranListItem.exp_name}</dd>
                </dl>
                <dl>
                <dt>物流单号</dt>
                <dd>{this.state.tranListItem.waybill}</dd>
                </dl>
                </div>
                </div>
                <div className="log-details">
        {detHtml}
                </div>
            </div>

</div>
</div>)


    }

    render() {



        let p = new Promise(function(resolve, reject) {});
        let renderHtml = [];
        // 首屏没有加载成功，那么均展示loading效果


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



export default TranList