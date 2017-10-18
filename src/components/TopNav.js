import React from 'react';
import Goback from './public/Goback';
class TopNav extends React.Component {

    static defaultProps = {
        dis: 'none',
        color: '#fff',
        go: '-1'
    };
    render() {
        let color = this.props.color ? this.props.color : '#fff'
        let border = this.props.border ? this.props.border : '1'
        let fixed = +this.props.fixed ? 'th-nav-list' : ''
        return (
            <div className={'th-nav wbox '+fixed} style={{background:color,borderBottom:+border+'px solid #DCDCDC'}}>
               <Goback go={this.props.go} isNone={this.props.isNone?this.props.isNone:''}/>
            <div className="th-nav-title of bg">{this.props.titleName}</div>
            <div className="th-nav-right tr" style={{display: this.props.dis}}>
            <a className={this.props.icon} href={this.props.icon_link}> </a>
               {/*  <a className="jf-record-icon" href=""> </a>*/}
            </div>
        </div>
        );
    }
}

export default TopNav;