import React from 'react';


import $ from 'jquery';
import {
    connect
} from 'react-redux'
import TopNav from '../components/TopNav';

import DataNone from '../components/public/DataNone';


import {

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
        document.title = '物流信息'
        window.scrollTo(0, 0)
        let p = new Promise(function(resolve, reject) {});

        if (window.localStorage.user_info != 1) {
            //转换数字
            p.then(this.props.history.push(this.props.baseUrl + '/login/tranList/'))
        }
    }
    componentDidMount() {
        if (this.props.userStatus === 0) {
            this.props.dispatch(beginUser())

        }
        this.fetchTranList(this.props.match.params.id)



    }

    fetchTranList(orderNum) {
        $.ajax({
            url: '/wap/?g=WapSite&c=Exchange&a=getOrderPrompt',
            dataType: 'json',
            type: 'post',
            'data': {
                'orderId': orderNum
            },
            // 161012114229844205
            success: (data) => {
                if (data.status && data.delivery.track) {
                    this.setState({
                        tranListItem: data.delivery.track
                    }, () => {

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

    checkIndex(index) {
        return index === this.state.cur ? 'log-lists cur' : 'log-lists'
    }

    renderPage() {
        let detHtml = [];
        let detGoods = this.state.tranListItem.info ? this.state.tranListItem.info : '';


        if (detGoods !== '') {
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
</div>)


    }

    render() {
        let renderHtml = [];
        if (this.state.tranListItem.info === undefined || this.state.tranListItem.info.length === 0) {
            renderHtml = <DataNone tip='暂无物流信息'/>
        } else {
            renderHtml = this.renderPage();
        }
        return (
            <div>
        <TopNav titleName = "物流列表" go='-1'/>
           <div className='w'>
        {
            renderHtml
        }
        </div>
        </div>

        );


    }
}
const mapStateToProps = state => {
    return {
        baseUrl: state.MsgAppReducer.baseUrl,
    }
}

export default connect(mapStateToProps)(TranList)