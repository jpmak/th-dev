import React from 'react';
import $ from 'jquery';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#000',
        opacity: '.5',
        color: '#fff',
        padding: '20px'
    },
    overlay: {
        background: 'none',
        zIndex: '999'
    }
};
class PayPwd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            text: '',
            value: '',
            csrf: ''

        };
        this.fetchOrderTip = true;
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.handleChange = (event) => {
            let val = event.target.value;
            this.setState({
                value: val
            }, () => {
                if (val.length === 6 && this.fetchOrderTip) {
                    console.log(this.state.value);
                    this.fetchOrder();
                    // this.fetchOrderTip = false;

                }

            });


        }
    }
    openModal() {

        this.setState({
                modalIsOpen: true
            },
            () => {
                $("#payPassword_rsainput").keyup()
                setTimeout(this.closeModal, 2000)
            }

        );
    }
    closeModal() {
        this.setState({
            modalIsOpen: false
        }, () => {
            $("#payPassword_rsainput").keyup()
        });
    }
    componentWillMount() {
        console.log(11111111);
    }
    componentDidMount() {
        let _self = this
        var payPassword = $("#payPassword_container");
        var _this = payPassword.find('i');
        var k = 0;
        var j = 0;
        var l = '';
        var password = '';
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
            var _val = this.value;
            // if (_val.length === 6 && _self.fetchOrderTip) {

            //     _self.fetchOrder(_val);

            //     // _self.fetchOrder(_val)
            // }
        });
    }
    fetchCref() {
        $.ajax({
            url: '/wap/?g=WapSite&c=Exchange&a=get_order_info',
            dataType: 'json',
            type: 'post',
            'data': {
                'item_id': 291
            },
            success: (data) => {
                this.setState({
                    csrf: data.info.csrf
                });

            },
            error: () => {
                console.log('网络异常');
            }
        });
    }

    close() {


    }
    clean() {
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
                this.setState({
                    text: data.msg
                });
                this.openModal();

                if (data.status) {

                    console.log('OK')
                }
            },
            error: () => {

            }
        });
    }
    render() {
        return (
            <div>
            <div id='paypwd' className="payPwd">
  

        <div className="ups-cont paid-pwd">
        <a className="class th-nav-back" onClick={this.clean.bind(this)}> </a>
        <div className='wbox-flex payTitle'>输入支付密码</div>

     
                    <div id="payPassword_container" className="alieditContainer clearfix" data-busy="0">
                        <div className="i-block" data-error="i_error">
                            <div className="i-block six-password">
                                <input className="i-text sixDigitPassword" id="payPassword_rsainput" type="tel" name="payPassword_rsainput" maxLength="6" onChange={this.handleChange}/>
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
                        <a href="User-payword.html" className="forget-psd">忘记密码?</a>
                    </div>
                </div>
                </div>
                    <Modal isOpen={this.state.modalIsOpen}          // onAfterOpen={this.afterOpenModal}
          // onRequestClose={this.closeModal}
                    style={customStyles}   contentLabel="Example Modal"  >
        <p>{this.state.text}</p>
        </Modal>
                </div>
        )

    }
}



export default PayPwd;