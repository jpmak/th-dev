    require('styles/iscroll.css');
    // import style from "src/styles/iscroll.css";

    import React from 'react';
    import Goback from '../public/Goback';
    import $ from 'jquery';
    // import ReactIScroll from 'react-iscroll';

    // import iScroll from "react-iscroll/node_modules/iscroll/build/iscroll-probe";

    import iScroll from 'iscroll/build/iscroll-probe'
    // import style from 'iscroll/build/iscroll.css'

    import LazyLoad from 'react-lazyload';
    // import SearchInput from './SearchInput';
    import {
        BrowserRouter as Router,
        Route,
        Link
    } from 'react-router-dom';
    // const urlRoot = 'http://dev.thgo8.com/';
    const urlRoot = '';

    const _this = this;

    let lis = [];

    let sVal = '';
    let keyword = '';
    let page_state = 1;
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
       <Goback/>
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

            $('.delbtn').on('click', function() {
                if (confirm("确定要清空吗？")) {
                    localStorage.removeItem("searchhistory");
                    $('.search-wrap').remove();
                    arrval = [];

                }

            });
        }
        componentDidUpdate() {
            $('.search-keywords-list li a').on('click', function() {
                var sVal = $('#searchInput').val();
                var hVal = $(this).html();
                $('#searchInput').val(hVal);
                _this.funStoreHistory();

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
            // this.refs.getload.fetch();
        }

        componentDidMount() {
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
            this.funloadHistory();


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
        { /**/ }
        <div className= {'th-search-container th-nav-list pr on-focus'} >
         
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
<SearchResult ref="getarr"/>

        </div>
       {/**/}
<ResultWrap ref="getload"/>
            </div>
            );
        }
    }
    class ResultWrap extends React.Component {
        constructor(props, context) {
            super(props, context);
            this.state = {
                items: [],
                pullDownStatus: 3,
                pullUpStatus: 5,
                pageStatus: 1,
                goodsHtml: [],
                goodsList: [],
                opacity: true,
                rs_once: '',
                ScrollVal: ''
            };

            this.page = 1;
        this.itemsChanged = false;

            this.pullDownTips = {
                // 下拉状态
                0: '下拉发起刷新',
                1: '继续下拉刷新',
                2: '松手即可刷新',
                3: '<i class="r-gif"></i>正在刷新',
                4: '刷新成功',
                5: ' '
            };

            this.pullUpTips = {
                // 上拉状态
                0: '上拉发起加载',
                1: '松手即可加载',
                2: '<i class="r-gif"></i>正在加载',
                3: '加载成功',
                4: '没有更多数据',
                5: ' '

            };
            this.isToDown = true
            this.isTouching = false;
            // this.onItemClicked = this.onItemClicked.bind(this);
            this.onScroll = this.onScroll.bind(this);
            this.onScrollEnd = this.onScrollEnd.bind(this);
            this.onTouchStart = this.onTouchStart.bind(this);
            this.onTouchEnd = this.onTouchEnd.bind(this);
        }

        PreventDefault(e) {
            e.preventDefault();
        }
        componentDidMount() {
            const _this = this;

            let rs_once = parseInt($('.result-sort').css('top'))
            this.setState({
                rs_once: rs_once
            });

            document.addEventListener('touchmove', this.PreventDefault, false);
            // document.addEventListener('touchmove', function(e) {

            //     e.preventDefault();
            // }, false);
            // 
            // var proxyurl = 'https://www.thgo8.com/?g=WapSite&c=Exchange&a=get_index_Banner';
            // fetch('/wap/?g=WapSite&c=Exchange&a=search_goods', {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/x-www-form-urlencoded"
            //         },
            //         body: 'keyword=' + '2' + '&page=' + 0 + '&volume=' + volume + '&by=' + price + '&cate_id=' + cate_id
            //     })
            //     .then((res) => res.json())
            //     .then(data => {
            //         console.log(data);
            //     });


            // $(function() {
            //     // https://www.thgo8.com/wap/?g=WapSite&c=Index&a=homebody
            //     $.get("wap/?g=WapSite&c=Index&a=homebody", {}, function(result) {
            //         console.log(result);
            //     })
            // })

            // axios.get(`http://dev.thgo8.com/?g=WapSite&c=Exchange&a=get_index_Banner`)
            //     .then(res => {
            //         console.log(res);
            //     });

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
                // _this.sendAjax();
            });

            $('.result-sort li.icons-list').on('click', function() {
                _this.iScrollInstance.refresh();
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
            const options = {
                // 默认iscroll会拦截元素的默认事件处理函数，我们需要响应onClick，因此要配置
                preventDefault: false,
                // 禁止缩放
                zoom: false,
                //滚动条可以拖动  
                interactiveScrollbars: true,
                // 支持鼠标事件，因为我开发是PC鼠标模拟的
                mouseWheel: true,
                // 滚动事件的探测灵敏度，1-3，越高越灵敏，兼容性越好，性能越差
                probeType: 3,
                // 拖拽超过上下界后出现弹射动画效果，用于实现下拉/上拉刷新
                bounce: true,
                // 展示滚动条
                scrollbars: true
            };
            this.iScrollInstance = new iScroll('#ListOutsite', options);
            this.iScrollInstance.on('scroll', this.onScroll);
            this.iScrollInstance.on('scrollEnd', this.onScrollEnd);
            this.fetch(true);
        }
        funStoreUpItem(upItem) {
            window.localStorage.upItem = upItem;
        }

        fetch(isRefresh) {

            if (isRefresh) {
                this.page = 0;
            }
            $.ajax({
                url: urlRoot + 'wap/?g=WapSite&c=Exchange&a=search_goods',
                data: {
                    page: this.page,
                    keyword: '1'


                },
                type: 'POST',
                dataType: 'json',
                success: (data) => {
                    if (data.goods_list) {
                        if (isRefresh) { // 刷新操作
                            if (this.state.pullDownStatus == 3) {
                                this.setState({
                                    pullDownStatus: 4,
                                    page_state: 1,
                                    items: data.goods_list,
                                    page: data.status
                                });

                                this.iScrollInstance.scrollTo(0, -1 * $(this.refs.PullDown).height(), 500);
                                if (this.state.pullUpStatus == 5) {
                                    this.setState({
                                        pullUpStatus: 0, //
                                        opacity: false
                                    });
                                }
                            }
                        } else { // 加载操作
                            if (this.state.pullUpStatus == 2) {
                                this.setState({
                                    pullUpStatus: 0, //

                                    items: this.state.items.concat(data.goods_list)
                                });
                            }
                        }
                        ++this.page;
                    } else if (this.page == 0) {
                        this.setState({
                            pullDownStatus: 5,
                            pullUpStatus: 5,

                            pageStatus: 0
                        })
                        var liHtml = '';
                        liHtml += '<div class="none-data"></div>';

                        $('#ListInside').html(liHtml);
                    } else if (this.page > 0) {

                        this.setState({
                            pullUpStatus: 4,
                            pageStatus: 0
                        });

                    }
                }
            });
        }


        onTouchStart(ev) {
            this.isTouching = true;
            this.onTouch = true;
        }
        onTouchEnd(ev) {
            this.isTouching = false;
            this.onTouch = false;


        }
        onPullDown() {
            // 手势
            // 


            if (this.isTouching) {
                console.log(this.iScrollInstance.y);
                if (this.iScrollInstance.y > 5) {
                    this.state.pullDownStatus != 2 && this.setState({
                        pullDownStatus: 2
                    });
                } else {
                    this.state.pullDownStatus != 1 && this.setState({
                        pullDownStatus: 1
                    });
                }
            }
        }

        onPullUp() {
            // 手势
            if (this.isTouching) {
                if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY - 5) {
                    this.state.pullUpStatus != 1 && this.setState({
                        pullUpStatus: 1
                    });
                }
            }
        }

        onScroll() {
            const rs_once = this.state.rs_once;
            let isy = this.iScrollInstance.y;
            if (this.onTouch) {
                this.setState({
                    ScrollVal: isy
                });
            }

            let pullDown = $(this.refs.PullDown);
            // 上拉区域
            if (this.iScrollInstance.y > -1 * pullDown.height()) {
                this.onPullDown();
            } else {
                this.state.pullDownStatus != 0 && this.setState({
                    pullDownStatus: 0
                });
            }


            if (this.onTouch && this.isToDown && this.iScrollInstance.y <= -200) {
                $('.result-sort').stop().animate({
                    top: $('.result-sort').height() - rs_once + 'px'
                }, 500, function() {
                    this.onTouch = false;
                });
                $('.th-search-container').stop().animate({
                    top: -rs_once + 'px'
                }, 500);
                this.isToDown = false
            }


            if (this.onTouch && this.isToUp) {
                $('.result-sort').stop().animate({
                    top: rs_once + 'px'
                }, 500, function() {
                    this.onTouch = false;
                });
                $('.th-search-container').stop().animate({
                    top: 0 + 'px'
                }, 500);

            }
            // 下拉区域
            if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY + 5 && this.state.pageStatus != 0) {
                this.onPullUp();
            }
        }
        onRefresh() {

            () => {
                this.iScrollInstance.refresh()
            }
        }
        onScrollEnd() {


            let pullDown = $(this.refs.PullDown);

            // 滑动结束后，停在刷新区域
            if (this.iScrollInstance.y > -1 * pullDown.height()) {
                if (this.state.pullDownStatus <= 1) { // 没有发起刷新,那么弹回去
                    this.iScrollInstance.scrollTo(0, -1 * $(this.refs.PullDown).height(), 200);
                    this.setState({
                        opacity: true

                    })
                } else if (this.state.pullDownStatus == 2) { // 发起了刷新,那么更新状态
                    this.setState({
                        pullDownStatus: 3,
                        pageStatus: 1,
                        opacity: false
                    });
                    this.fetch(true);
                }
            }
            // 滑动结束后，停在加载区域
            if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY) {
                if (this.state.pullUpStatus == 1 && this.state.pageStatus == 1) { // 发起了加载，那么更新状态
                    this.setState({
                        pullUpStatus: 2

                    });
                    this.fetch(false);
                } else if (this.state.pageStatus == 0) {
                    this.setState({
                        pullUpStatus: 4
                    });
                }
            }
        }

        shouldComponentUpdate(nextProps, nextState) {
            // 列表发生了变化, 那么应该在componentDidUpdate时调用iscroll进行refresh
            this.itemsChanged = nextState.items !== this.state.items;
            this.isToDown = nextState.ScrollVal <= this.state.ScrollVal;
            this.isToUp = nextState.ScrollVal > this.state.ScrollVal;

            return true;
        }

        componentDidUpdate() {
            const _this = this;
            // document.addEventListener('touchmove', function(e) {
            //     e.preventDefault();
            // }, false);
            $('.result-sort li.icons-list').on('click', function() {
                _this.iScrollInstance.refresh();
            });
            if (this.state.pullDownStatus == 4) {
                this.setState({
                    pullDownStatus: 5

                });
            }
            // 仅当列表发生了变更，才调用iscroll的refresh重新计算滚动条信息
            if (this.itemsChanged) {

                this.iScrollInstance.refresh();


            }
            return true;
        }

        componentWillUnmount() {


            document.removeEventListener('touchmove', this.PreventDefault, false);


        }
        render() {

            let lis = [];
            this.state.items.forEach((goods, index) => {
                lis.push(
                    <li key={index}><Link  to={'/r_search.html/R_det/'+goods.item_id} className='upItem' data-id={goods.item_id}><div className="info-img">{/*<LazyLoad offset={100} once>*/}<img alt="" className="lazy" src={goods.list_image}/>{/*</LazyLoad>*/}</div><div className="info-bar"><div className="pro-title">{goods.goods_name}</div><div className="e-numb"><span className="e-price"><em>{goods.item_price}</em>积分</span></div></div></Link>      </li>
                );
            })
            return (
                <div className="w result-wp" >
        <div className="result-sort">
            <li className="cur">综合</li>
        <li className="volume">兑换排行</li>
            <li className="arrow price">香蕉</li>
            <li className="icons-list ver-icon"></li>
        </div>

                <div id = "ScrollContainer" >

                <div id = "ListOutsite" style ={{height: window.innerHeight}}
                     onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>
            <ul id="ListInside"  className="app-pd-list hor-list">
               <p ref="PullDown" id="PullDown" dangerouslySetInnerHTML={{__html:this.pullDownTips[this.state.pullDownStatus]}} />

        {
            lis
        }
                        <p ref="PullUp" id="PullUp" dangerouslySetInnerHTML={{__html:this.pullUpTips[this.state.pullUpStatus]}} />

            </ul>
         </div>
         </div>
         </div>
            );
        }
    }



    export {
        Searchhead,
        ResultWrap,
        Goback_up
    }