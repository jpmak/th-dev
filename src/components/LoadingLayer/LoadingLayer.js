import React from 'react';
import style from './LoadingLayer.css';


export default class LoadingLayer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let outerStyle = this.props.outerStyle ? this.props.outerStyle : {};
        let innerStyle = this.props.innerStyle ? this.props.innerStyle : {};
        let onRetry = this.props.onRetry ? this.props.onRetry : () => {};
        let loadingStatus = this.props.loadingStatus ? this.props.loadingStatus :
            0; // 0: wait for loading 1: isLoading, 2: loading ok 3:loading fail

        let loadingTips = (<span>开始加载</span>);
        if (loadingStatus === 1) {
            loadingTips = (
                <div className='overlayLoader'>
            <div className='loader'>
                        <div></div>
                   
                    </div>
                </div>
            );
        } else if (loadingStatus === 2) {
            loadingTips = (<span>加载完成</span>);
        } else if (loadingStatus === 3) {

            loadingTips = (<div><p className='error_404'></p><p className='f36'>服务竟然出错了</p><p className='f24'>别紧张，试试看刷新页面~</p><p className='broder_f36' onClick={onRetry}>重新加载</p></div>);
            // loadingTips = (<div><span></span><span>服务竟然出错了</span><p>别紧张，试试看刷新页面~</p><p>重新加载</p></div>);

        }
        //  else if (loadingStatus == 4) {
        //     loadingTips = (<div className="none-data"></div>);
        //     // loadingTips = (<div><span></span><span>服务竟然出错了</span><p>别紧张，试试看刷新页面~</p><p>重新加载</p></div>);

        // }
        return (
            <div id='outer' style={outerStyle}>
                <div id='inner' style={innerStyle} >
                    {loadingTips}
                </div>
            </div>
        );
    }
}