import React from 'react';
// import Goback from '../public/Goback';
import $ from 'jquery';
// import SearchInput from './SearchInput';


let sVal = '';
let keyword = '';
let page_state = 1;
let page = 0;
let volume = '';
let price = '';
let c_id = '';
let searchClick = 0;
let searchMsg = '';
let cate_id = '';
let arrval = new Array();
// let sVal = '';
class Goback_up extends React.Component {
    componentDidMount() {}
    handClick() {

        $('#searchInput').blur();
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


class SearchResult extends React.Component {
    componentDidMount() {
        const _this = this;
        if (window.localStorage.searchhistory) {
            searchMsg = JSON.parse(window.localStorage.searchhistory);
            // arrval.push(searchMsg);
            this.historyHtml();
            arrval = arrval.concat(searchMsg);
        } else {
            $('.search-keywords').hide();
        }
        $('.search-keywords-list li a').on('click', function() {
            var sVal = $('#searchInput').val();
            var hVal = $(this).html();
            $('#searchInput').val(hVal);
            _this.funStoreHistory();

        });
        $('.delbtn').on('click', function() {
            if (confirm("确定要清空吗？")) {
                localStorage.removeItem("searchhistory");
                $('.search-wrap').remove();
                arrval = [];

            }

        });
    }

    funStoreHistory() {
        arrval.unshift($('#searchInput').val());
        if (arrval.length > 9) {
            arrval.pop(9);
        }
        // arrval=unique(arrval);
        arrval = this.unique(arrval);
        window.localStorage.searchhistory = JSON.stringify(arrval);
        keyword = arrval[0];
        window.location.reload();
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
    historyHtml() {
        let history_Html = '';
        for (var i = 0; i < searchMsg.length; i++) {
            history_Html += '<li><a >' + searchMsg[i] + '</a></li>';
        }
        $('.search-keywords-list').html(history_Html);

    }
    render() {
        return (
            <div className = "search-wrap" >
            <div className="search-keywords bor-b">
                <div className="search-keywords-name">
                    <span>历史记录 <i className="delbtn"></i></span>
                </div>
                <div className="search-keywords-list ">
                </div>
            </div>
            </div>
        )
    }
}

class Searchhead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            message: ''
        };

        this.handleChange = (event) => {
            this.setState({
                value: event.target.value
            });
        }

        $('.delbtn').on('click', function() {
            if (confirm("确定要清空吗？")) {
                localStorage.removeItem("searchhistory");
                $('.search-wrap').remove();
                arrval = [];

            }

        });

        this._handleClick = () => {
            var sVal = $('#searchInput').val();

            if (sVal != '') {
                const _this = this;
                keyword = sVal;
                _this.refs.getarr.funStoreHistory();
            }
        }
    }
    funloadHistory() {
        if (window.localStorage.searchhistory) {
            keyword = arrval[0];
        } else {
            keyword = '';
        }

        $('#searchInput').val(keyword);
        this.refs.getload.sendAjax();
    }

    componentDidMount() {
        this.funloadHistory()
        const _this = this;
        $('#searchInput').on('keyup focus', function(e) {
            $('.search-bar input').css('width', '80%');
            var uVal = $('#searchInput').val();
            if (uVal != '') {
                if (e.keyCode === 13) {
                    _this._handleClick();
                }
                $('#del').show();
            } else {
                $('#del').hide();
            }
        });
        $('#searchInput').on('click', function() {
            $('#js-list,.class,.result-wp').hide();
            $('.search-wrap,.th-search-box .backbtn').show();
            $('.th-active,.th-active body').css('overflow', 'auto');

        });
        $('#searchInput').on('keyup focus', function(e) {
            $('.search-bar input').css('width', '80%');
            var uVal = $('#searchInput').val();
            if (uVal !== '') {
                if (e.keyCode === 13) {
                    _this._handleClick();
                }
                $('#del').show();
            } else {
                $('#del').hide();
            }
        });
        // $('#searchInput').on('click', function() {
        //     $('#js-list,.class,.result-wp').hide();
        //     $('.search-wrap,.th-search-box .backbtn').show();
        //     $('.th-active,.th-active body').css('overflow', 'auto');

        // });

    }

    handleDel() {
        $('#searchInput').val('').focus();
        $('#del').hide();
        $('.search-bar input').css('width', '100%');
    }

    render() {
        var value = this.state.value;
        // <input type="text" value={this.state.value} onChange={this.handleClick} />
        return (
            <div>
        <div className= {'th-search-container th-nav-list pr'+ this.props.onName}>
         
            <div className="th-search-box">
                <div className="th-search-shadow"></div>
         <Goback_up/>
        <a className="search-btn" onClick={this._handleClick.bind(this)}>搜索</a>
                    <div className="wbox search-bar" >
                    <i className="th-search-iconbtn"></i>
                    <div id="del" className="delete" onClick={this.handleDel} ></div>
                    <div className="wbox-flex">
               <div className="th-search-form">
        <input id="searchInput" className="th-search-form" type="text" placeholder="搜索商品关键字"  value={value}  onChange={this.handleChange}/>
                        </div>
                    </div>
     
                </div>
            </div>
        </div>
<SearchResult ref="getarr"/>
<ResultWrap ref="getload"/>
            </div>
        );
    }
}
class ResultWrap extends React.Component {
    componentDidMount() {
        const _this = this;

        $('.result-sort li').not('.icons-list').on('click', function() {
            var liindex = $('.result-sort li').index(this);
            $(this).addClass('cur').siblings().removeClass('cur');
            if (liindex == 0) {
                price = '';

            }
            if (liindex == 1) {
                price = 'desc';

            }
            if (liindex == 2) {
                if ($('.result-sort li.arrow').hasClass('asc') || price == 'asc') {
                    $('.result-sort li.arrow').removeClass('asc').addClass('desc');
                    price = 'desc';
                } else {
                    $('.result-sort li.arrow').removeClass('desc').addClass('asc');
                    price = 'asc';
                }
            }
            _this.sendAjax();
        });

        $('.result-sort li.icons-list').on('click', function() {
            if ($('.result-sort li.icons-list').hasClass('ver-icon')) {
                $('.result-sort li.icons-list').removeClass('ver-icon');
                $('.result-sort li.icons-list').addClass('hor-icon');
            } else {
                $('.result-sort li.icons-list').addClass('ver-icon');
                $('.result-sort li.icons-list').removeClass('hor-icon');
            }
            if ($('.app-pd-list').hasClass('hor-list')) {
                $('.app-pd-list').removeClass('hor-list');
            } else {
                $('.app-pd-list').addClass('hor-list');
            }
        });
    }
    funStoreUpItem(upItem) {
        window.localStorage.upItem = upItem;
    }

    // componentDidUpdate() {
    //         // const _this = this;
    //         $('.app-pd-list li').on('click', function() {
    //             // upItem = $(this).attr('data-id');
    //             // _this.funStoreUpItem(upItem);
    //             console.log('12');
    //         });
    //     }
    // handload() {
    //     const _this = this;
    //     $.ajax({
    //         url: 'http://dev.thgo8.com/?g=WapSite&c=Exchange&a=search_goods',
    //         type: 'POST',
    //         dataType: 'json',
    //         Thread: true,
    //         data: {
    //             'keyword': keyword,
    //             'volume': volume,
    //             'by': price,
    //             'page': page
    //         },
    //         error: function() {
    //             alert('网络连接失败！');
    //         },
    //         success: function(data) {
    //             var searchHtml = '';
    //             if (data.status) {
    //                 $('.result-sort').show();
    //                 for (var i = 0; i < data.goods_list.length; i++) {
    //                     searchHtml += '<li><a href="Exchange-goods-' + data.goods_list[i].item_id + '.html"><div class="info-img"><div><img alt=""class="lazy"data-original="' + data.goods_list[i].list_image + '"></div></div><div class="info-bar"><div class="pro-title">' + data.goods_list[i].goods_name + '</div><div class="e-numb"><span class="e-price"><em>' + data.goods_list[i].item_price + '</em>积分</span></div></div></a></li>'
    //                 }
    //                 if (page == 0) {
    //                     $('.app-pd-list ul').html(searchHtml);
    //                 } else {
    //                     $('.app-pd-list ul').append(searchHtml);
    //                     page_state = 1;
    //                     $('.load-tip').hide();
    //                 }
    //             } else {
    //                 if (page > 0) {
    //                     $('.load-tip').show().html("没有更多数据了");
    //                 } else {
    //                     var liHtml = '';
    //                     page_state = 0;
    //                     liHtml += '<div class="none-data"></div>';

    //                     $('.app-pd-list ul').html(liHtml);
    //                 }
    //             }
    //             $('img.lazy').show().lazyload({
    //                 effect: 'fadeIn',
    //                 skip_invisible: false,
    //                 threshold: 100
    //             });
    //             $('a.upItem').on('click', function() {
    //                 upItem = $(this).attr('data-id');
    //                 _this.funStoreUpItem(upItem);
    //             });
    //         }
    //     });

    //     var winH = $(window).height();   
    //     $(window).scroll(function() {
    //         var pageH = $(document.body).height();
    //         var scrollT = $(window).scrollTop();
    //         var rate = (pageH - winH - scrollT) / winH;
    //         if (page_state == 1) {
    //             if (rate < 0.01) {
    //                 page++;
    //                 page_state = 0;
    //                 _this.handload();
    //                 $('.load-tip').show().html('<i class="r-gif"></i><span>正在载入</span>');
    //             }
    //         }
    //     });
    // }
    sendAjax() {
        const _this = this;
        let upItem = '';
        fetch("http://dev.thgo8.com/?g=WapSite&c=Exchange&a=search_goods", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: 'keyword=' + keyword + '&page=' + page + '&volume=' + volume + '&by=' + price + '&cate_id=' + cate_id
        }).then(function(res) {
            if (res.ok) {
                res.json().then(function(data) {
                    if (data.status) {
                        let searchHtml = '';
                        $('.result-sort').show();
                        for (var i = 0; i < data.goods_list.length; i++) {
                            searchHtml += '<li><a class="upItem" data-id="' + data.goods_list[i].item_id + '" href="detail.html" ><div class="info-img"><div><img alt=""class="lazy"data-original="' + data.goods_list[i].list_image + '"></div></div><div class="info-bar"><div class="pro-title">' + data.goods_list[i].goods_name + '</div><div class="e-numb"><span class="e-price"><em>' + data.goods_list[i].item_price + '</em>积分</span></div></div></a></li>'
                        }


                        if (page == 0) {
                            $('.app-pd-list ul').html(searchHtml);
                        } else {
                            $('.app-pd-list ul').append(searchHtml);
                            page_state = 1;
                            $('.load-tip').hide();
                        }
                        $('a.upItem').on('click', function() {
                            upItem = $(this).attr('data-id');
                            _this.funStoreUpItem(upItem);
                        });
                        $('img.lazy').show().lazyload({
                            effect: 'fadeIn',
                            skip_invisible: false,
                            threshold: 100
                        });
                    } else {
                        if (page > 0) {
                            $('.load-tip').show().html("没有更多数据了");
                        } else {
                            var liHtml = '';
                            page_state = 0;
                            liHtml += '<div class="none-data"></div>';

                            $('.app-pd-list ul').html(liHtml);
                        }
                    }
                });
            }

        }).catch(function(e) {
            console.log("fetch fail");
        });
        var winH = $(window).height();
        $(window).scroll(function() {
            var pageH = $(document.body).height();
            var scrollT = $(window).scrollTop();
            var rate = (pageH - winH - scrollT) / winH;
            if (page_state == 1) {
                if (rate < 0.01) {
                    page++;
                    page_state = 0;
                    _this.sendAjax();
                    $('.load-tip').show().html('<i class="r-gif"></i><span>正在载入</span>');
                }
            }
        });
    }
    render() {
        return (
            <div className="w result-wp">
        <div className="result-sort">
            <li className="cur">综合</li>
        <li className="volume">兑换排行</li>
            <li className="arrow price">香蕉</li>
            <li className="icons-list ver-icon"></li>
        </div>
        <div className="app-pd-list hor-list">
            <ul>
  
            </ul>
        </div>
        <div className="load-tip"></div>
    </div>
        );
    }
}

export {
    Searchhead,
    ResultWrap,
    Goback_up
}