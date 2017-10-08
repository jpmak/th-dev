import React from 'react';
import Goback from './public/Goback';
class TopNav extends React.Component {

    static defaultProps = {
        dis: 'none',
        color:'#fff',
        go:'-1'
    };
    render() {
        return (
            <div className="th-nav wbox " style={{backgroundColor:this.props.color}}>
               <Goback go={this.props.go}/>
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