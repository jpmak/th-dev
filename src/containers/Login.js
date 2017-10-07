import React from 'react';
import './../styles/login.scss';

import {
  connect
} from 'react-redux'
import Modal from 'react-modal';
import {

  beginUser

} from '../actions'

import $ from 'jquery';
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
  },
  overlay: {
    background: 'none',
  }
};
// import {
//     ListTryRestoreComponent,
//     fetchListNav,
//     fetchListGoods,
//     beginRefresh,
//     changeLoading,
//     backupY,
//     updateListLoadingStatus
// } from '../actions/list'
class TopNav extends React.Component {

  static defaultProps = {
    dis: 'none'
  };
  backEchange() {
    this.props.backEchange()
  }
  render() {
    return (
      <div className="th-nav wbox ">
      <a className="class th-nav-back" href="javascript:history.go(-2);"> </a>
            <div className="th-nav-title of bg">{this.props.titleName}</div>
            <div className="th-nav-right tr" style={{display: this.props.dis}}>
            <a className={this.props.icon} href={this.props.icon_link}> </a>
               {/*  <a className="jf-record-icon" href=""> </a>*/}
            </div>
        </div>
    );
  }
}
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      text: ''
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({
        modalIsOpen: true
      },
      () => {
        setTimeout(this.closeModal, 1000)
      }

    );
  }



  closeModal() {
    this.setState({
      modalIsOpen: false
    });
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
      } else if (uVal == "" && pVal !== "") {
        $('#loginform').addClass('bg-dark');
        $('#username').next().hide();
        $('#pwd').next().show();
      } else if (uVal !== "" && pVal == "") {
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
  backEchange() {
    this.props.history.push('/Exchange-index.html/')

  }
  router() {

    const params = this.props.match.params
    const router = params.router
    let id = this.props.id
    if (router) {
      if (router === 'product') {
        this.props.history.push('/Exchange-index.html/' +
          router + '/' + id)

      } else {
        this.props.history.push('/Exchange-index.html/' +
          router)
      }

    } else {

      //跳转到用户主页
      this.props.history.push('/Exchange-index.html/')
    }
  }
  toLogin() {
    var username = $('#username').val();
    var pwd = $('#pwd').val();


    if (username == '') {
      this.setState({
        text: '请填写账号信息'
      });
      this.openModal()

      return false;
    }

    if (pwd == '') {
      this.setState({
        text: '密码不能为空'
      });
      this.openModal()
      return false;
    }

    $.ajax({
      url: '/wap/?g=WapSite&c=Login&a=checkin',
      dataType: 'json',
      type: 'post',
      'data': {
        //        'username': '13516557373',
        // 'pwd': 'a6885938a'
        'username': username,
        'pwd': pwd
      },
      success: (data) => {
        if (data.returns) {
          window.localStorage.user_info = data.returns;
          this.props.dispatch(beginUser());
          this.setState({
            text: data.msg
          })
          this.openModal();

          this.router();
        } else {
          this.setState({
            text: data.msg
          });
          this.openModal()
        }
      },
      error: () => {
        console.log('加载失败')
      }
    })

  }

  //search


  render() {

    return (
      <div className="div1" id="bodyDiv">
        <TopNav titleName = "登录" backEchange={this.backEchange.bind(this)}/>
        <div id="wrapper">
            <div className="user-img">
                <div className="img-show"><img src="https://www.thgo8.com/public/wapsite/images/micro_site/login/logo.png" alt=""/></div>
            </div>
            <div className="form-list login-list">
                <ul>
                    <li className="rel">
    <label className='account' htmlFor="username"> 账 号 </label>
                        <input type="text" id="username" placeholder="请填写用户名或手机号码" />
                        <div id="del" className="delete"></div>
                    </li>
                    <li className="rel">
                        <label className='pwd' htmlFor="pwd"> 密 码 </label>
                        <input type="password" id="pwd" placeholder="请输入登录密码"/>
                        <div id="del" className="delete"></div>
                    </li>
                    <li className='forget' ><a href="User-forgetpwd.html" >忘记密码</a></li>
                </ul>
            </div>
            <div className="button">
                <ul>
                    <li>
    <button id="loginform" onClick={this.toLogin.bind(this)} className="btn bg-red bg-dark">登录</button>
                    </li>
                    <li>
                        <button className="btn bg-fff registered" ><a href='www.thgo8.com'>立即注册</a></button>
                    </li>
                </ul>
            </div>
        </div>
     <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <p>{this.state.text}</p>
        </Modal>
        </div>
    )


  }
}



const mapStateToProps = state => {
  return {
    id: state.MsgDetailReducer.id
  }
}


export default connect(mapStateToProps)(Login)