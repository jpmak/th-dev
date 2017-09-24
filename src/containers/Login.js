import React from 'react';
import './../styles/login.scss';

import {
    connect
} from 'react-redux'
import TopNav from '../components/TopNav';

import $ from 'jquery';

// import {
//     ListTryRestoreComponent,
//     fetchListNav,
//     fetchListGoods,
//     beginRefresh,
//     changeLoading,
//     backupY,
//     updateListLoadingStatus
// } from '../actions/list'

class Login extends React.Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {


    }
componentDidMount() {
    // const _self=this
    // $("#loginform").click(function() {
    //     _self.toLogin();
    // });
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

toLogin() {
    var username = $('#username').val();
    // if (username == '') {
    //     // layer.msg('请填写账号信息', {
    //     //     skin: 'layui-layer-huise'
    //     // });
    //     return false;
    // }
    console.log(this.props.match.params.router)
 // this.props.history.push('/Exchange-index.html/list')

 this.props.history.push('/Exchange-index.html/'+this.props.match.params.router)
      // this.props.history.push('/Exchange-index.html/login')

    var pwd = $('#pwd').val();
    // if (pwd == '') {
    //     layer.msg('密码不能为空', {
    //         skin: 'layui-layer-huise'
    //     });
    //     return false;
    // }
    // Load.show();
    // ptsAjax({
    //     'url': urlRoot + '?g=WapSite&c=User&a=userlogin',
    //     'type': 'json',
    //     'Thread': true,
    //     'data': {
    //         'username': username,
    //         'pwd': pwd
    //     },
    //     'complete': function() {
    //         Load.hide();
    //     },
    //     'error': function() {
    //         alert('网络连接失败！');
    //     },
    //     success: function(data, textStatus, xhr) {
    //         layer.msg(data.msg, {
    //             skin: 'layui-layer-huise'
    //         });
    //         if (data.success) {
    //                             location = "User-center.html";
    //                         }
    //     }
    // });
}

        //search

  
    render() {
return(  
        <div className="div1" id="bodyDiv">
        <TopNav titleName = "登录" />
        <div id="wrapper">
            <div className="user-img">
                <div className="img-show"><img src="http://www.thgo8.me/public/wapsite/images/face.png" alt=""/></div>
            </div>
            <div className="form-list login-list">
                <ul>
                    <li className="rel">
                        <label for="username"> 账 号 </label>
                        <input type="text" id="username" placeholder="手机号/邮箱" autofocus="true"/>
                        <div id="del" className="delete"></div>
                    </li>
                    <li className="rel">
                        <label for="pwd"> 密 码 </label>
                        <input type="password" autocomplete="off" id="pwd" placeholder="登录密码"/>
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
                        <button className="btn bg-fff registered" onclick="location='User-registeruser.html'">立即注册</button>
                    </li>
                </ul>
            </div>
        </div>

        </div>
)


    }
}







const mapStateToProps = state => {
    return {
        
    }
}


export default connect(mapStateToProps)(Login)