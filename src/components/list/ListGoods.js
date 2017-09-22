import React from 'react';
import LazyLoad from 'react-lazyload';
import ChangeLoading from '../public/changLoading';
import {
    Link
} from 'react-router-dom'
class ListGoods extends React.Component {
    goodsFun(e) {

        this.props.goodsFun(e)
    }
    render() {
        const self = this
        let ListGood = [];
        let ListGoods = this.props.goodItems;
        if (ListGoods !== 0) {
            ListGood = ListGoods.map(function(good, index) {

                let liGood = good.thcate.map(function(liThcate, index) {
                    return (
                        <li  key={index}>
                    <Link to={'/Exchange-index.html/search/'+liThcate.cate_id+'&list'} onClick={self.goodsFun.bind(self,liThcate.cate_id)}>
                    <LazyLoad   height={10} offset={10}>
                             <img  src={liThcate.cate_thumb}/>
                                   </LazyLoad>
                                   <span>{liThcate.cate_name}</span>
                             </Link>
                             </li>
                    )
                })
                return (
                    <dl key={index}><dt>{good.cate_name}</dt>
                <dd>
                <ul>
                {liGood}
                </ul>
                </dd>
                </dl>
                )
            })
        } else if (this.props.goodStatus == 0 && ListGoods == 0) {
            ListGood = (<div className="none-data" style={{width:'auto'}}></div>)

        }
        return (

            <div id="js-list-img" className="list-details wbox-flex ">
        <ChangeLoading changeLoading={this.props.changeLoading}/>
                <div className="list-detail">
                    <div className="list-label list-label-img " style={{overflowY: 'scroll',position: 'relative',height:this.props.height}}>
                    {ListGood}
                    </div>

                </div>
            </div>
        )
    }
}
export default ListGoods;