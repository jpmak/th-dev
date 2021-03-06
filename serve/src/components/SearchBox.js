import React from 'react';
import SortsBtn from './public/SortsBtn';
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
            $('.fixedTop').removeClass('scrollerDown').addClass('scrollerUp');

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
    handClick() {

        $('#searchInput').val("")
        $('#searchInput').blur();
        $('.th-search-container').removeClass('on-focus');
        $('.th-search-container').addClass('on-blur');
        $('#headnav').removeClass('js-header');
        $('.fixedTop').removeClass('scrollerUp').addClass('scrollerDown');



        $('#js-list,.class,.result-wp').show();
        $('#del').hide();
        $('.th-search-box .backbtn').hide();


        $('#AppWrap').css({
            'height': 'auto',
            'overflow': 'hidden'
        });
    }
    render() {
        return (
            <div className="th-search-container on-blur" style={{position:'relative',zIndex:'200'}}>
            <div className="th-search-box">
                <div className="th-search-shadow"></div>
                      <SortsBtn baseUrl={this.props.baseUrl}/>
    <a className="backbtn" onClick={this.handClick}></a>

             <SearchBtn funStoreHistory={this.funStoreHistory.bind(this)} value={this.state.value}/>
                <div className="wbox search-bar">
        <label className="th-search-iconbtn"></label>
                         <DelValue handleDel={this.clearValue.bind(this)}/>
                    <div className="wbox-flex">
        <SearchInput  ref='SearchInput' pushValue={this.pushValue.bind(this)}  parmKeyword={ this.props.parmKeyword}  funStoreHistory={this.funStoreHistory.bind(this)} searchMsgStatus={this.state.searchMsgStatus}/>
                     
                    </div>
                </div>

            </div>
            <div className='fixedTop'>
<SearchResult ref="getarr"  searchMsgStatus_fun={ this.searchMsgStatus_fun.bind(this)} handleDel = {this.handleDel.bind(this)}  historyPush={this.historyPush.bind(this)}/>
</div>
        </div>

        )
    }
}



export default SearchBox;