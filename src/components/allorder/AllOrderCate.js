import React from 'react';

import $ from 'jquery';

class AllOrderCate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: this.props.allOrderType,
            TypeMove: 0
        }

    };

    componentDidMount() {
        let _self = this;
        $('.title-list li').click(function() {
            var liindex = $('.title-list li').index(this);
            $(this).addClass('cur').siblings().removeClass('cur');
            var liWidth = $('.title-list li').width();
            $('.titleWrap .title-list p').stop(false, true).animate({
                'left': liindex * liWidth + 'px'
            }, 300);
            _self.setState({
                TypeMove: liindex * liWidth + 'px'

            })
        });

    }


    componentWillReceiveProps(nextProps) {

    }
    onRetryLoading() {
        this.props.beginRefresh();
    }

    cheack(type) {

        return type === this.state.currentIndex ? 'filter-item cur' : 'filter-item';
    }
    handleClick(type) {
        window.scrollTo(0, 0)
        this.setState({
            currentIndex: type,
        });

        this.props.UpDataCateType(type, this.state.TypeMove)
        this.props.get_type_goods(1, type)
        this.props.UpDataPullUpStatus(0);
    }
    render() {

        return (
            <div className='titleWrap w33'>
                            <ul className="nav title-list cf">
        <li className={'w33 '+this.cheack('')} onClick={this.handleClick.bind(this,'')}>全部</li>
                    <li className={this.cheack('paid')} onClick={this.handleClick.bind(this,'paid')}>待发货</li>
                    <li className={this.cheack('ems')} onClick={this.handleClick.bind(this,'ems')}>待收货</li>
                    <p style={{left:this.props.TypeMove}}><b></b></p>
                </ul>
            </div>

        )
    }


}

export default AllOrderCate;