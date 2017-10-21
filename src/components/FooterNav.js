import React from 'react';
import {
  Link
} from 'react-router-dom'


class FooterNav extends React.Component {
  render() {
    console.log('test');
    return (
      <div className = 'nav-tab'>
            <div className='hor-view'>
              <Link to={this.props.baseUrl+'/home/'} ><span>我的积分</span></Link>
             <Link to={this.props.baseUrl+'/allorder/'}><span>兑换订单</span></Link>
               <Link to={this.props.baseUrl+'/log/'}><span>兑换记录</span></Link>

            </div>
            </div>
    )
  }
}



export default FooterNav;