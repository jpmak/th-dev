import React from 'react';
import $ from 'jquery';
import LazyLoad from 'react-lazyload';

class Scrollup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mess: '',
            body: '',
            isPushUp: 'none',
            height: '0'
        };
        this.Det_mounted = false;
        this.touchRange = 0;
        this.moving = 0;
        this.handleScroll = this.handleScroll.bind(this);
        this.scrollUp = false;
    }

    componentWillMount() {
        //router显示滚动正常
        this.Det_mounted = true;
        window.scrollTo(0, 0);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        // window.removeEventListener('scroll', this.handleScroll);

        this.Det_mounted = false;
    }
    scrollUp1() {
        // const _this = this;
        let mess_state = 1;
        // let gBody = this.props.goods_body;
        var winH = $(window).height();
        $(window).scroll(function() {
            var pageH = $(document.body).height();
            var scrollT = $(window).scrollTop();
            var rate = (pageH - winH - scrollT) / winH;
            if (mess_state === 1) {
                if (rate < 0.01) {
                    // console.log('我是底部');
                    // $('.scroll-up').hide();
                    mess_state = 0;
                    let pbt = $('.post-body').text();
                    $('.post-body').show().html(pbt);
                }
            }
        });

    }
    startMove(e) {
        this.touchRange = e.touches[0].pageY;
    }
    movIng(e) {
        this.moving = e.touches[0].pageY
    }
    endMove() {
        if (this.touchRange - this.moving > 50) {

            this.handleScroll()
        }
    }
    getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }
    getClientHeight() {
        var windowHeight = 0;
        if (document.compatMode == "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    }
    getScrollHeight() {
        var scrollHeight = 0,
            bodyScrollHeight = 0,
            documentScrollHeight = 0;
        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    }
    handleScroll() {



        let produtShowHeight = $('.produt-show').height();
        let headHeight = $('#headnav').height();
        let productBodyHeight = $('#productBody').height();
        let scrollUp = produtShowHeight + headHeight - productBodyHeight;
        // let scrollwrap = document.getElementById('scrollwrap').offsetHeight
        let bodyBox = document.getElementById('root')
        let clientHeight = this.getClientHeight(); //可视区域高度
        let scrollTop = this.getScrollTop(); //滚动条滚动高度
        let scrollHeight = this.getScrollHeight(); //滚动内容高度
        if (scrollTop < scrollUp && this.scrollUp) {
            this.props.iScrollUp();
            $('html, body').animate({
                scrollTop: $('#headnav').offset().top
            }, 800, () => {
                this.setState({
                    height: 0,
                    isPushUp: 'none'
                })
            });
            this.scrollUp = false;
        }
    }
    changeBlock() {
        let produtShowHeight = $('.produt-show').height();
        let headHeight = $('#headnav').height();
        let productBodyHeight = $('#productBody').height();
        let scrollUp = produtShowHeight + headHeight - productBodyHeight;;
        this.setState({
            isPushUp: 'block',
            height: scrollUp
        }, () => {


            $('html, body').animate({
                scrollTop: $('.items').offset().top
            }, 800);
        })
        setTimeout(() => {
            this.scrollUp = true;
        }, 900)

    }
    render() {

        let goods_body = this.props.goods_body ? this.props.goods_body : '<div class="none-data"></div>'
        return (

            // <LazyLoad >
            <div id='productBody' style={{'display':this.state.isPushUp,'height':this.state.height+'px'}} onTouchStart={this.startMove.bind(this)} onTouchMove={this.movIng.bind(this)}  onTouchEnd={this.endMove.bind(this)}>
        <div className="items" dangerouslySetInnerHTML={{__html:goods_body}} />
            </div>

            // </LazyLoad>


        )
    }
}

export default Scrollup;