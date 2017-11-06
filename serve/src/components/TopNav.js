import React from 'react';
import Goback from './public/Goback';
import {
    Link
} from 'react-router-dom'
class TopNav extends React.Component {

    static defaultProps = {
        dis: 'none',
        color: '#fff',
        go: '-1'
    };
    historyHome() {
        this.props.historyHome()
    }
    render() {
        let color = this.props.color ? this.props.color : '#fff'
        let border = this.props.border ? this.props.border : '1'
        let fixed = this.props.fixed ? 'th-nav-list' : ''
        let text = this.props.text ? this.props.text : '';
        let link = this.props.link
        return (
            <div className={'th-nav wbox '+fixed} style={{background:color,borderBottom:+border+'px solid #DCDCDC'}}>
               <Goback go={this.props.go} isNone={this.props.isNone?this.props.isNone:''}/>
            <div className="th-nav-title of bg">{this.props.titleName}</div>
            <div className="th-nav-right tr" >
            <a style={{top:0,color:'#0066ff'}} onClick={this.historyHome.bind(this)}>{text}</a>
              
            </div>
        </div>
        );
    }
}

export default TopNav;