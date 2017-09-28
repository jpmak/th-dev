import React from 'react';
import {
  Link
} from 'react-router-dom'


class FooterNav extends React.Component {



  render() {
    return (
      <div className = 'nav-tab'>
            <div className='hor-view'>
              <Link to={'/Exchange-index.html/home/'} ><span>我的积分</span></Link>
             <Link to={'/Exchange-index.html/allorder/'}><span>兑换订单</span></Link>
               <Link to={'/Exchange-index.html/log/'}><span>兑换记录</span></Link>

            </div>
            </div>
    )
  }
}



export default FooterNav;