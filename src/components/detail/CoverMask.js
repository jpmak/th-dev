import React from 'react';
import $ from 'jquery';
class CoverMask extends React.Component {
    componentDidMount() {
        $('.cover-body').height($('.product-cover').height() - $('.cover-head').height());
        $('.close,.cover-mask').on('click', function() {
            $('.product-cover').removeClass('cover-toggle').hide();
            $('.cover-mask').removeClass('cover-mask-toggle').hide();
            $('#payWay,#chooseTypeWrap .payWay,#paypwd').hide();

            $('html').removeClass('hidescroll');
        });
    }
    render() {
        return (
            <div className="cover-mask" ></div>
        )
    }
}

export default CoverMask;