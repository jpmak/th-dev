import React from 'react';



// import loadingImg from '../LoadingLayer/loading.svg';
class PageMask extends React.Component {
    render() {
        // const isDis = this.props.isDis;

        return (
            <div className="mask" ><p>正在加载...{this.props.isDis}</p></div>
        )
    }
}


export default PageMask;