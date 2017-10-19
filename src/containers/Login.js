import React from 'react';
import './../styles/login.scss';

import {
  connect
} from 'react-redux'
import {

  beginUser

} from '../actions'
import Modal from '../components/public/Modal';
import TopNav from '../components/TopNav';

import $ from 'jquery';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.go = '-1';
  };
  componentWillMount() {
    document.title = '登录'
    const params = this.props.match.params
    const router = params.router
    if (this.props.userStatus === 1) {
      this.go = '-1'
    } else if (router === 'product') {
      this.go = '-1'
    } else {
      this.go = '-2'

    }
  }

  componentDidMount() {
    document.body.style.backgroundColor = '#fff'
    setTimeout(function() {
      if ($('#username').val() !== '') {
        $('#username').next().show();
        $('#pwd').next().show();
        $('#loginform').removeClass('bg-dark');
      }
    }, 10);


    $('#username,#pwd').on('keyup', function() {
      var uVal = $("#username").val();
      var pVal = $("#pwd").val();
      if (uVal !== "" && pVal !== "") {
        $(this).next().show();
        $('#loginform').removeClass('bg-dark');
      } else if (uVal === "" && pVal !== "") {
        $('#loginform').addClass('bg-dark');
        $('#username').next().hide();
        $('#pwd').next().show();
      } else if (uVal !== "" && pVal === "") {
        $('#loginform').addClass('bg-dark');
        $('#username').next().show();
        $('#pwd').next().hide();
      } else {
        $(this).next().hide();
      }
    });
    $('.delete').on('click', function() {
      $(this).prev().val("");
      $(this).hide();
      $('#loginform').addClass('bg-dark');
    });

  }
  componentWillUnmount() {
    document.body.style.backgroundColor = '#f5f5f5'
  }
  backEchange() {
    this.props.history.push(this.props.baseUrl + '/')

  }
  router() {
    const params = this.props.match.params
    const router = params.router
    let id = this.props.id
    if (router) {
      if (router === 'product') {

        this.props.history.push(this.props.baseUrl + '/' + router + '/' + id)

      } else {
        this.props.history.push(this.props.baseUrl + '/' + router)
      }

    } else {

      //跳转到用户主页
      this.props.history.push(this.props.baseUrl + '/')
    }
  }
  toLogin() {
    let p = new Promise(function(resolve, reject) {});
    var username = $('#username').val();
    var pwd = $('#pwd').val();

    if (username === '') {
      this.refs.Modal.setText2('请填写账号信息');
      this.refs.Modal.handleOpenModal2();

      return false;
    }

    if (pwd === '') {
      this.refs.Modal.setText2('密码不能为空')
      this.refs.Modal.handleOpenModal2();

      return false;
    }

    $.ajax({
      url: '/wap/?g=WapSite&c=Login&a=checkin',
      dataType: 'json',
      type: 'post',
      'data': {
        'username': '13516557373',
        'pwd': '030465'
        // 'username': username,
        // 'pwd': pwd
      },
      success: (data) => {
        if (data.returns) {
          this.refs.Modal.setText2(data.msg)
          this.refs.Modal.handleOpenModal2();

          window.localStorage.user_info = data.returns;
          this.props.dispatch(beginUser());

  // setTimeout(
  //           this.router()
  //         , 1000)
          setTimeout(() => {
            this.router()
          }, 1000)
        } else {
          this.refs.Modal.setText2(data.msg)
          this.refs.Modal.handleOpenModal2();

        }
      },
      error: () => {
        console.log('加载失败')
      }
    })


  }


  render() {

    return (
      <div className="div1" id="bodyDiv">
        <TopNav titleName = "登录" go={this.go} border='0' color='#fbfbfb'/>
        <div id="wrapper">
            <div className="user-img">
                <div className="img-show"><img src="https://www.thgo8.com/public/wapsite/images/micro_site/login/logo.png" alt=""/></div>
            </div>
            <div className="form-list login-list">
                <ul>
                    <li className="rel">
    <label className='account' htmlFor="username"> 账 号 </label>
                        <input type="text" id="username" placeholder="请填写用户名或手机号码" autoFocus  />
                        <div id="del" className="delete"></div>
                    </li>
                    <li className="rel">
                        <label className='pwd' htmlFor="pwd"> 密 码 </label>
                        <input type="password" id="pwd" placeholder="请输入登录密码"/>
                        <div id="del" className="delete"></div>
                    </li>
                    <li className='forget' ><a href="https://www.thgo8.com/wap/Login-forgetpwd.html" >忘记密码</a></li>
                </ul>
            </div>
            <div className="button">
                <ul>
                    <li>
    <button id="loginform" onClick={this.toLogin.bind(this)} className="btn bg-red bg-dark">登录</button>
                    </li>
                    <li>
                        <button className="btn bg-fff registered" ><a href='https://www.thgo8.com/wap/Login-register.html'>立即注册</a></button>
                    </li>
                </ul>
            </div>
        </div>
         <Modal ref='Modal' />

        </div>
    )


  }
}



const mapStateToProps = state => {
  return {
    baseUrl: state.MsgAppReducer.baseUrl,
    userStatus: state.MsgAppReducer.userStatus,
    id: state.MsgDetailReducer.id
  }
}


export default connect(mapStateToProps)(Login)