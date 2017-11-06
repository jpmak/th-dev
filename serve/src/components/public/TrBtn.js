import React from 'react';

import {
    Link
} from 'react-router-dom'
class TrBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dis: false
        };

    };

    historyHome() {
        this.props.historyHome()
    }
    handleClick() {
        this.setState({
            dis: !this.state.dis
        })
    }
    render() {

        return (
            <div className="js-tr">
         
            <div className="jstr-btn" onClick={this.handleClick.bind(this)}></div>
            <ul className="nav-more-list" id="sub-title" style={{display:this.state.dis?'block':'none'}}>
            <li><Link to={this.props.baseUrl+ '/'} className="nav-more-icon home-icon">积分首页</Link></li>
            <li><Link to={this.props.baseUrl+ '/list/'} className="nav-more-icon search-icon">积分分类</Link></li>
            <li><Link to={this.props.baseUrl+ '/search/'} className="nav-more-icon cate-icon">搜索</Link></li>
            <li><Link to={this.props.baseUrl+ '/home/'} className="nav-more-icon ebuy-icon" >我的积分</Link></li>
            <li><a className="nav-more-icon refresh-icon" href="javascript:location.reload()" >刷新</a></li>
            </ul>
            <div className="dialog_overlay" onClick={this.handleClick.bind(this)} style={{display:this.state.dis?'block':'none'}}></div>
        </div>
        );
    }
}

export default TrBtn;