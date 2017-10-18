    $(function() {
        var jstrHtml = '<img class="jstr-btn" src="../images/icon/more.png" style="width:1rem;"><ul class="nav-more-list"id="sub-title"><li><a class="nav-more-icon home-icon"href="Index-index.html">首页</a></li><li><a class="nav-more-icon cart-icon"href="Cart-cartList.html">购物车</a></li><li><a class="nav-more-icon search-icon"href="Category-index.html">全部分类</a></li><li><a class="nav-more-icon cate-icon"href="Search-index.html">搜索</a></li><li><a class="nav-more-icon ebuy-icon"href="">我的通惠</a></li><li><a class="nav-more-icon refresh-icon"href="javascript:location.reload()">刷新</a></li>';
        // if ($isWeixin == null) {
        //     jstrHtml += '<li><a class="nav-more-icon ex-icon"href="javascript:void(0)"onclick="logout()">退出</a></li>';
        // };
        // 
 dialog = '<div class="dialog_overlay"></div>';
  $(".js-tr").parent().append(dialog);
  $(".js-tr").html(jstrHtml);
        $(".jstr-btn,.dialog_overlay").click(function() {
            $("#sub-title,.dialog_overlay").toggle();
        });
    });
