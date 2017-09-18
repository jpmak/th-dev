import React from 'react';


// 


class SearchBtn extends React.Component {
    constructor(props) {
        super(props);
        this.hasValue = false;
        this.state = {
            parmkeyword: 'wo',
            value: ''
        }
        this._handleClick = () => {
            if (this.props.value !== '') {
                this.setState({
                    value: true
                })

                this.props.funStoreHistory(this.props.value)
            }
        }

    }
    unClick() {
        this.setState({
            value: false
        })
    }

    render() {

        return (<a  className = "search-btn" style={{'pointerEvents':this.props.value?'auto':'none'}}  onClick = {this._handleClick.bind(this)} >搜索</a>)
    }
}
export default SearchBtn;