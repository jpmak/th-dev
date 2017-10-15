import React from 'react';




class ListNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: this.props.pushIndex,
        }
    };
    cheack(index) {
        return index === this.state.currentIndex ? 'cur' : '';

    }
    handleClick(e, id) {
        this.setState({
            currentIndex: e
        })
        this.props.listGoods(e, id);
        this.props.changeLoading(1);
        let ListGoods=document.getElementById('list-label');

        ListGoods.scrollTop=0;
  
    }
    render() {
        let ListNavs = this.props.navItems;
        let ListNav = ListNavs.map(function(list, index) {
            return (
                <li key={index} className={this.cheack(index)} onClick={this.handleClick.bind(this,index,list.cate_id)}>{list.cate_name}</li>
            )
        }, this)
        return (
            <div id="js-list-items">
        <div id="listScroller" className="list-items overtouch" style={{height:this.props.height}}>
{ListNav}
                </div>
            </div>
        )
    }
}
export default ListNav;