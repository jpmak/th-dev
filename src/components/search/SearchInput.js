import React from 'react';
import $ from 'jquery';

class SearchInput extends React.Component {
    // static propTypes = {
    //     history: PropTypes.object.isRequired
    // }
    constructor(props) {
        super(props);
        this.state = {
            hided: false,
            value: this.props.parmKeyword || ''
        };

        this.handleChange = (event) => {
            let val = event.target.value;
            val = val.replace(/["'<>%;)(&+, ]/g, '');
            this.props.pushValue(val)
            this.setState({
                value: val
            });

        }

    }
    clearValue() {
        // this.props.pushValue('')
        this.setState({
            value: ''
        });

    }
    hideContent() {

    }
    searchInputClick() {
        let height = window.screen.height - 100;

        $('#js-list,.class,.result-wp').hide();
        $('.th-search-box .backbtn,.fixedSearch').show();

        // $('.th-active,.th-active body').css('overflow', 'auto');

        $('#AppWrap').css({
            'height': height,
            'overflow': 'hidden'
        });
        // $('.pushHide').hide()

        $('.search-bar input').css('width', '80%');
        if (this.state.value !== '') {
            $('#del').show();
        }
        if (this.props.searchMsgStatus) {
            $('.search-wrap').css('display', 'block');
        }
        // this.props.hideContent()


    }
    componentDidMount() {
        let parmKeyword = this.props.parmKeyword ? this.props.parmKeyword : '';
        let list = parmKeyword.indexOf('&list');
        if (list != -1) {
            this.setState({
                value: ''
            })
        }
    }
    searchInputonKeyUp(e) {
        const value = this.state.value
        if (this.state.value !== '') {
            if (e.keyCode === 13) {
                // this.props.historyPush(value)
                this.props.funStoreHistory(value);
            }
            $('#del').show();
        }

    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.parmKeyword !== this.props.parmKeyword) {
            this.setState({
                value: nextProps.parmKeyword
            })
        }
    }
    render() {

        return (
            <input id="searchInput" className="th-search-form" type="text" placeholder="搜索商品关键字"  value={this.state.value} onClick={this.searchInputClick.bind(this)} onKeyUp={this.searchInputonKeyUp.bind(this)}  onChange={this.handleChange}/>
        )


    }
}

export default SearchInput;