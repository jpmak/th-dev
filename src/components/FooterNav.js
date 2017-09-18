import React from 'react';
// import SortsBtn from './public/SortsBtn';


class FooterNav extends React.Component {

    componentDidMount() {}

    render() {
        return (
            <div className = 'nav-tab'>
            <div className='hor-view'>
               <a href="" className='cur'><span>我的积分</span></a>
               <a href=""><span>兑换订单</span></a>
               <a href=""><span>兑换记录</span></a>

            </div>
            </div>
        )
    }
}



export default FooterNav;