import React from 'react';
import SortsBtn from './public/SortsBtn';
import GobackUp from './public/GobackUp';
import DelValue from './search/DelValue';
import SearchBtn from './search/SearchBtn';
import SearchInput from './search/SearchInput';
import SearchResult from './search/SearchResult';
import $ from 'jquery';

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            hided: false,
            searchMsgStatus: false
        };
    }
    componentWillMount() {
        if (window.localStorage.searchhistory) {
            this.setState({
                searchMsgStatus: true
            });
            // this.searchhistory_ev = true;
        }
    }
    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }
    handleDel() {
        $('#searchInput').val('').focus();
        $('#del').hide();

    }

    componentDidMount() {

        $('#searchInput').on('click', function() {
            $('#headnav').addClass('js-header');

            // $('#js-list,.sorts,.result-wp').hide();
            $('.th-search-container').addClass('on-focus');
            $('.th-search-container').removeClass('on-blur');
            // $('.th-search-box .backbtn').show();
            // $('.th-active,.th-active body').css('overflow', 'auto');
        });

    }



    clearValue() {
        this.setState({
            value: ''
        });
        this.refs.SearchInput.clearValue();
    }
    funStoreHistory(e) {
        this.refs.getarr.funStoreHistory(e)
    }
    pushValue(e) {
        this.setState({
            value: e
        })
    }

    historyPush(e) {
       
        this.props.history.push(this.props.baseUrl + '/search/' + e)

    }
    searchMsgStatus_fun(e) {
        this.setState({
            searchMsgStatus: e
        });
    }
    pushHide() {
        this.props.pushHide();
    }

    render() {
        return (
            <div className="th-search-container on-blur" style={{position:'relative',zIndex:'200'}}>
            <div className="th-search-box">
                <div className="th-search-shadow"></div>
                      <SortsBtn baseUrl={this.props.baseUrl}/>
  
        <GobackUp/>
             <SearchBtn funStoreHistory={this.funStoreHistory.bind(this)} value={this.state.value}/>
                <div className="wbox search-bar">
                    <lable className="th-search-iconbtn"></lable>
                         <DelValue handleDel={this.clearValue.bind(this)}/>
                    <div className="wbox-flex">
        <SearchInput  ref='SearchInput' pushValue={this.pushValue.bind(this)}  parmKeyword={ this.props.parmKeyword}  funStoreHistory={this.funStoreHistory.bind(this)} searchMsgStatus={this.state.searchMsgStatus}/>
                     
                    </div>
                </div>

            </div>
<SearchResult ref="getarr"  searchMsgStatus_fun={ this.searchMsgStatus_fun.bind(this)} handleDel = {this.handleDel.bind(this)}  historyPush={this.historyPush.bind(this)}/>
        </div>

        )
    }
}



export default SearchBox;