import React from 'react';
import $ from 'jquery';

class ResultSort extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            price: true,
            priceVal: '',
            priceColor: '',
            indexColor: '',
            volumeColor: ''
        }
        this.priceCss=''
    }
    componentDidUpdate() {

    }
    componentDidMount() {


        $('.result-sort li').not('.icons-list').on('click', function() {

            $(this).addClass('cur').siblings().removeClass('cur');
      
        });

        $('.result-sort li.icons-list').on('click', function() {
            if ($('.result-sort li.icons-list').hasClass('ver-icon')) {
                $('.result-sort li.icons-list').removeClass('ver-icon');
                $('.result-sort li.icons-list').addClass('hor-icon');
            } else {
                $('.result-sort li.icons-list').addClass('ver-icon');
                $('.result-sort li.icons-list').removeClass('hor-icon');
            }
            if ($('.app-pd-list').hasClass('hor-list')) {
                $('.app-pd-list').removeClass('hor-list');
            } else {
                $('.app-pd-list').addClass('hor-list');
            }
        });

    }
    defaultClick() {
        this.props.defaultClick();
        this.setState({
            priceVal: '',
            priceColor: '#666',
            volumeColor: '#666',
            indexColor: '#FF3838'
        })
    }
    volumeClick() {
        this.props.volumeClick('')
        this.setState({
            priceVal: '',
            priceColor: '#666',
            indexColor: '#666',
            volumeColor: '#FF3838'

        })
    }
    priceClick() {
        this.setState({
            price: !this.state.price,
            priceColor: '#FF3838',
            indexColor: '#666',
            volumeColor: '#666'

        },()=>{
            this.priceCss=this.state.price? 'asc' : 'desc'
            console.log(this.priceCss)
        this.props.priceClick(this.priceCss)
            
        })
     
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.price === '') {
            this.setState({
                priceVal: '',
                priceColor: '#666'
            })
        }
        if (nextProps.searchNum !== this.props.searchNum) {
            this.setState({
                indexColor: '#FF3838',
                volumeColor: '#666'
            })
        }

    }
    render() {
    
        return (
            <div className="result-sort">
            <li className="cur" onClick={this.defaultClick.bind(this)} style={{'color':this.state.indexColor}}>综合</li>
        <li className="volume" onClick={this.volumeClick.bind(this)} style={{'color':this.state.volumeColor}}>兑换排行</li>
        <li className={this.priceCss +' arrow price'} onClick={this.priceClick.bind(this)} style={{'color':this.state.priceColor}}>积分</li>
            <li className="icons-list ver-icon"></li>
        </div>
        );
    }
}

export default ResultSort;