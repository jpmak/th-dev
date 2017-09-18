import React from 'react';
import Goback from './Goback';
import $ from 'jquery';

class GobackUp extends React.Component {
    componentDidMount() {}
    handClick() {
        $('#AppWrap').css({
            'height': 'auto',
            'overflow': 'auto'
        });
        $('.pushHide').show()
        $('#searchInput').val("")
        $('#searchInput').blur();
        $('.th-search-container').removeClass('on-focus');
        $('.th-search-container').addClass('on-blur');
        $('#headnav').removeClass('js-header');
        $('#js-list,.class,.result-wp').show();
        $('.search-wrap,.th-search-box .backbtn').hide();
    }

    render() {
        return (
            <div>
                <a className="backbtn" onClick={this.handClick}></a>
</div>
        )


    }
}
export default GobackUp;