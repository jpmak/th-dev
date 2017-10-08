import React from 'react';

import $ from 'jquery';
import Modal from '../../components/public/Modal';

import {
    Link
} from 'react-router-dom'
class SearchResult extends React.Component {
    constructor(props, context) {
        super(props, context);
        // this.arrval = [];
        this.searchMsg = '';
        this._props = this.props;
        this.state = {
            history_Html: '',
            isCleanUp: false,
            arrval: [],
            ModalIcon:''
        };
    }
    componentWillMount() {
        if (window.localStorage.searchhistory) {
            this.searchMsg = JSON.parse(window.localStorage.searchhistory);
            // arrval.push(searchMsg);
            // this.historyHtml();
            this.setState({
                arrval: this.state.arrval.concat(this.searchMsg)
            });

            // this.state.arrval = this.state.arrval.concat(this.searchMsg);
        } else {
            $('.search-keywords').hide();
        }

    }

    PreventDefault(e) {
        e.preventDefault();
    }
    delbtnClick(e) {
        e.preventDefault();
         this.refs.Modal.setText('确定清空历史搜索吗?')
        this.refs.Modal.handleOpenModal()
  

    }

    ModalCallBack(){
         this.refs.Modal.setText2('删除成功')
        this.refs.Modal.handleCloseModal()
        this.refs.Modal.handleOpenModal2()
          this.setState({
                arrval: [],
                ModalIcon:1
            });
            localStorage.removeItem('searchhistory');
            $('.search-wrap').hide();
            this.props.searchMsgStatus_fun(false);
            this.props.handleDel();
    }

    handClick() {
        $('#searchInput').blur();
        $('#js-list,.class,.result-wp').show();
        $('.fixedSearch,.th-search-box .backbtn').hide();
    }
    funStoreHistory(e) {
            let p = new Promise(function(resolve, reject) {});
            let arrval = this.state.arrval;
            // this.state.arrval.unshift(e);
            arrval.unshift(e)
            if (arrval.length === 10) {
                arrval.pop()
            }
            this.setState({
                    arrval: this.unique(this.state.arrval)
                }, () =>
                p.then(
                    window.localStorage.searchhistory = JSON.stringify(this.state.arrval)
                )
                .then(
                    this.props.historyPush(e)
                )
            )
            this.handClick();
        }
       
    pushSearch(e) {
        this.props.searchNum();
        this.props.getKeyword(this.state.arrval[0])
        this.props.priceClick('')
    }

    unique(arr) {
        var res = [];
        var json = {};
        for (var i = 0; i < arr.length; i++) {
            if (!json[arr[i]]) {
                res.push(arr[i]);
                json[arr[i]] = 1;
            }
        }
        return res;
    }



    render() {
        const _this = this;
        let history_Html = this.state.arrval.map(function(Msg, index) {
            return (
                <li key={index}><a onClick={_this.funStoreHistory.bind(_this,Msg)} >{Msg}</a></li>
            )

        });

        return (
            <div className='fixedSearch' style={{height:window.innerHeight}}>
                            <Modal ref='Modal'  icon={this.state.ModalIcon}  ModalCallBack={this.ModalCallBack.bind(this)}/>
            
            <div className = "search-wrap" >
            <div className="search-keywords bor-b">
                <div className="search-keywords-name">
        <span>历史记录 <i className="delbtn" onClick={this.delbtnClick.bind(this)}></i></span>
                </div>
                <div className="search-keywords-list ">
        {
       history_Html
        }
                </div>
            </div>
            </div>

            </div>
        )
    }
}
export default SearchResult;