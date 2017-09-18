import React from 'react';
// import PropTypes from 'prop-types'
import $ from 'jquery';

class DelValue extends React.Component {
    // static propTypes = {
    //     history: PropTypes.object.isRequired
    // }
    handleDel() {
        $('#searchInput').focus();
        this.props.handleDel()
    }
    render() {
        // onClick = {
        //     this.props.handleDel()
        // }
        return (
            <div id="del" className="delete"  onClick = { this.handleDel.bind(this) }></div>
        )


    }
}

export default DelValue;