import React from 'react';
import $ from 'jquery';
import Modal from '../../components/public/Modal';

class PayPwd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ModalIicon: '',
            value: '',
            csrf: '',
            orderNum: ''

        };
        this.fetchOrderTip = true;
        this.handleChange = (event) => {
            let val = event.target.value;
            this.setState({
                value: val
            }, () => {
                if (val.length === 6 && this.fetchOrderTip) {
                    this.refs.Modal.handleOpenModal3();
                    this.fetchOrder();
                }
            });
        }
    }

    componentDidMount() {
        var payPassword = $("#payPassword_container");
        var _this = payPassword.find('i');
        var k = 0;
        var j = 0;
        var l = '';

        var _cardwrap = $('#cardwrap');

        //点击隐藏的input密码框,在6个显示的密码框的第一个框显示光标
        payPassword.on('focus', "input[name='payPassword_rsainput']", function() {

            var _this = payPassword.find('i');
            if (payPassword.attr('data-busy') === '0') {

                //在第一个密码框中添加光标样式
                _this.eq(k).addClass("active");
                _cardwrap.css('visibility', 'visible');
                payPassword.attr('data-busy', '1');
            }
        });
        //change时去除输入框的高亮，用户再次输入密码时需再次点击
        payPassword.on('change', "input[name='payPassword_rsainput']", function() {
            _cardwrap.css('visibility', 'hidden');
            _this.eq(k).removeClass("active");
            payPassword.attr('data-busy', '0');
        }).on('blur', "input[name='payPassword_rsainput']", function() {

            _cardwrap.css('visibility', 'hidden');
            _this.eq(k).removeClass("active");
            payPassword.attr('data-busy', '0');

        });

        //使用keyup事件，绑定键盘上的数字按键和backspace按键
        payPassword.on('keyup', "input[name='payPassword_rsainput']", function(e) {
            var e = (e) ? e : window.event;

            //键盘上的数字键按下才可以输入
            if (e.keyCode == 8 || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                k = this.value.length; //输入框里面的密码长度
                // l = _this.size(); //6
                l = 6; //6

                for (; l--;) {

                    //输入到第几个密码框，第几个密码框就显示高亮和光标（在输入框内有2个数字密码，第三个密码框要显示高亮和光标，之前的显示黑点后面的显示空白，输入和删除都一样）
                    if (l === k) {
                        _this.eq(l).addClass("active");
                        _this.eq(l).find('b').css('visibility', 'hidden');

                    } else {
                        _this.eq(l).removeClass("active");
                        _this.eq(l).find('b').css('visibility', l < k ? 'visible' : 'hidden');

                    }

                    if (k === 6) {
                        j = 5;
                    } else if (k < 6) {
                        j = k;
                    }
                    $('#cardwrap').css('left', (j * $('.sixDigitPassword-box i').width()) + 'px');
                }
            } else {
                //输入其他字符，直接清空
                var _val = this.value;
                this.value = _val.replace(/\D/g, '');
            }


        });
    }



    clean() {
        this.cleanInput();
        // $("#payPassword_rsainput").attr("value", "");
        $('#payWay').show();
        $('#paypwd').hide();

    }
    fetchOrder() {
        $.ajax({
            url: '/wap/?g=WapSite&c=Exchange&a=exchangeOrder',
            dataType: 'json',
            type: 'post',
            'data': {
                'p_type': this.props.chooseId,
                'payPwd': this.state.value,
                'csrf': this.state.csrf ? this.state.csrf : this.props.csrf,
                'address_id': this.props.addressId
            },
            success: (data) => {
                this.refs.Modal.handleOpenModal2();
                this.refs.Modal.handleCloseModal3();

                if (data.status === 1) {
                    this.refs.Modal.setText2('支付成功')
                    this.setState({
                        ModalIicon: 1
                    });
                    this.fetchOrderPaid();
                } else {


                    this.refs.Modal.setText2(data.msg)
                    this.setState({
                        ModalIicon: 0
                    }, () => {
                        this.cleanInput()
                    });


                }


            },
            error: () => {
                console.log('加载失败')
            }
        });
    }
    cleanInput() {

        $('.sixDigitPassword-box b').css('visibility', 'hidden')
        $('#cardwrap').css('left', '0')
        $("#payPassword_rsainput").val('');
    }
    fetchOrderPaid() {
        $.ajax({
            url: '/wap/?g=WapSite&c=Exchange&a=orderList',
            dataType: 'json',
            type: 'post',
            'data': {
                'page': 1,
                'state': 'paid'
            },
            success: (data) => {
                if (data.status) {
                    this.props.successView(data.list[0].exchange_order_number)

                }

            },
            error: () => {
                console.log('加载失败')
            }
        });
    }
    focus() {
        $('#payPassword_rsainput').focus()
    }
    render() {
        return (
            <div>
            <div id='paypwd' className="payPwd">
  

        <div className="ups-cont paid-pwd">
        <a className="class th-nav-back" onClick={this.clean.bind(this)}> </a>
        <div className='wbox-flex payTitle' onClick={this.focus.bind(this)}>输入支付密码</div>

     
                    <div id="payPassword_container" className="alieditContainer clearfix" data-busy="0">
                        <div className="i-block" data-error="i_error">
                            <div className="i-block six-password">
                                <input  className="i-text sixDigitPassword" id="payPassword_rsainput" type="tel" name="payPassword_rsainput" maxLength="6"  onKeyUp={this.handleChange}/>
                                <div tabIndex="0" className="sixDigitPassword-box">
                                    <i><b style={{visibility: 'hidden'}}></b></i>
                                    <i><b style={{visibility: 'hidden'}}></b></i>
                                    <i><b style={{visibility: 'hidden'}}></b></i>
                                    <i><b style={{visibility: 'hidden'}}></b></i>
                                    <i><b style={{visibility: 'hidden'}}></b></i>
                                    <i><b style={{visibility: 'hidden'}}></b></i>
                                    <span id="cardwrap" data-role="cardwrap"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tips">
                        <a href="https://www.thgo8.com/wap/User-forgetPayword.html" className="forget-psd">忘记密码?</a>
                    </div>
                </div>
                </div>
      <Modal ref='Modal'  icon={this.state.ModalIicon} />

                </div>
        )

    }
}



export default PayPwd;