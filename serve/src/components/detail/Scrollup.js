import React from 'react';
import $ from 'jquery';
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
        this.Det_mounted = true;
        window.scrollTo(0, 0);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        this.Det_mounted = false;
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
        if (document.compatMode === "CSS1Compat") {
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
        let clientHeight = this.getClientHeight()
        let scrollTop = this.getScrollTop(); //滚动条滚动高度
        let scrollHeight = this.getScrollHeight(); //滚动内容高度


        let produtShowHeight = $('.produt-show').height();
        let headHeight = $('#detNav').height();
        let productBodyHeight = $('#productBody').height();
        let scrollUp = produtShowHeight + headHeight - productBodyHeight;

        if ((clientHeight + scrollTop) === (scrollHeight)) {
            this.props.bottomFun(true)

        }

        if (scrollTop + 50 < scrollUp && this.scrollUp) {
            this.props.iScrollUp();
            $('html, body').animate({
                scrollTop: $('#detNav').offset().top
            }, 800, () => {
                this.setState({
                    height: 0,
                    isPushUp: 'none'
                })
            });
            this.props.bottomFun(false)

            this.scrollUp = false;
        }
    }
    changeBlock() {

        let produtShowHeight = $('.produt-show').height();
        let headHeight = $('#detNav').height();
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


            <div id='productBody' style={{'display':this.state.isPushUp,'height':this.state.height+'px'}} onTouchStart={this.startMove.bind(this)} onTouchMove={this.movIng.bind(this)}  onTouchEnd={this.endMove.bind(this)}>
        <div className="items" dangerouslySetInnerHTML={{__html:goods_body}} />
            </div>



        )
    }
}

export default Scrollup;