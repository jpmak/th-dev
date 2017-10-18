import React from 'react';
import {
  connect
} from 'react-redux'
import {
  Link
} from 'react-router-dom'
import TopNav from '../components/TopNav';
import NotFoundGoods from '../components/notFound/NotFoundGoods';
import {
  SearchBeginRefresh,
  price,
  volume,
  beginLoad,
  updatePullUpStatus

} from '../actions/search'

class NotFoundPage extends React.Component {
  constructor(props) {
    super(props);
  };
  componentWillMount() {
    document.title = '页面出错'

  }
  changeGoods() {
    this.props.dispatch(beginLoad())

  }
  componentDidMount() {
    this.props.dispatch(volume())
    this.props.dispatch(price(''))
    this.props.dispatch(SearchBeginRefresh())



  }


  updatePullUpStatus(e) {
    this.props.dispatch(updatePullUpStatus(e))
    }
    // UpDatapullDownStatus(){

  // }
  componentWillUnmount() {
    document.body.style.backgroundColor = '#f5f5f5'
  }


  // volumeClick(e) {
  //   this.props.dispatch(volume(e))

  //   this.props.dispatch(SearchBeginRefresh())
  // }
  render() {
    console.log(this.props.pullDownStatus);
    return (
      <div className="div1" id="bodyDiv">
        <TopNav titleName = "页面出错" go={this.go} border='0' color='#fbfbfb' isNone='none'/>
       <div className='NotFound'> 
      <h3>抱歉,您所访问的页面不存在</h3>
    <p className="broder_f36"><Link to={this.props.baseUrl+'/'}>返回兑换首页</Link></p>

      </div>
      <div className='w'>
      <div className="infoTitle" style={{color:'#E7940C'}}>随便看看</div>
    <NotFoundGoods updatePullUpStatus={this.updatePullUpStatus.bind(this)} pullUpStatus={this.props.pullUpStatus} NotFoundGoods={this.props.items} changeGoods={this.changeGoods.bind(this)}/>
</div>
        </div>
    )


  }
}



const mapStateToProps = state => {
  return {
    pullUpStatus: state.MsgListPageReducer.pullUpStatus, // 上拉状态
    baseUrl: state.MsgAppReducer.baseUrl,
    items: state.MsgListPageReducer.items,

  }
}


export default connect(mapStateToProps)(NotFoundPage)