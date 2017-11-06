import React from 'react';
var SearchBox = React.createClass({
    render: function() {
        return (
            <div class="th-search-container on-blur" style="display: block;">
            <div class="th-search-box">
                <div class="th-search-shadow"></div>
                <a class="class sorts" href="Exchange-category.html"></a>
                <a class="backbtn"></a>
                <a class="search-btn" style="width:.7rem; display:inline-block;">搜索</a>
                <div class="wbox search-bar pr">
                    <i class="th-search-iconbtn"></i>
                    <div id="del" class="delete" onclick="del()"></div>
                    <div class="wbox-flex">
                        <form class="th-search-form">
                            <input id="searchInput" class="th-search-form" type="text" placeholder="搜索商品关键字" autocomplete="off"/>
                        </form>
                    </div>
                </div>
            </div>
            <div class="search-wrap">
              
                <div class="search-keywords bor-b">
                    <div class="search-keywords-name">
                        <span>历史记录 <i class="delbtn" style="display: none;"></i></span>
                    </div>
                    <div class="search-keywords-list ">
                       
                        <li>
                            <a>
                   
                            </a>
                        </li>
                  
                    </div>
                </div>
                <div class="search-keywords">
                    <div class="search-keywords-name" style="display: none;">
                        <span>热门记录</span>
                    </div>
                    <div class="search-keywords-list ">
                    </div>
                </div>
       
            </div>
        </div>
        );
    }
})


export default SearchBox;