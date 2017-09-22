import React from 'react';
import {
  Link
} from 'react-router-dom'


class FooterNav extends React.Component {

  componentDidMount() {}

  render() {
    return (
      <div className = 'nav-tab'>
            <div className='hor-view'>
              <Link to={'/Exchange-index.html/home/'}  className='cur'><span>我的积分</span></Link>
               <a href=""><span>兑换订单</span></a>
               <a href=""><span>兑换记录</span></a>

            </div>
            </div>
    )
  }
}



export default FooterNav;