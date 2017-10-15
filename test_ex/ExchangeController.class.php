<?php
/**兑换商城控制器
 * User:thc
 */
class ExchangeController extends BaseController
{
    function __construct(){
        parent::__construct();
    }
    //首页页面
    public function index(){
        if( isset($_COOKIE['search_history']) && !empty($_COOKIE['search_history']) ){
            $history_arr = unserialize(base64_decode($_COOKIE['search_history']));
        }else{
            $history_arr = [];
        }
        krsort($history_arr);
        $this->assign('search_history',$history_arr);
        $this->display();
    }

    //获取首页banner
    public function get_index_Banner(){
        $adv_model = new AdvModel();
        $t = time();
        //获取兑换商城首页顶部banner
        $w = ' is_allow = 1 and is_pay = 1 and adv_start_date < '.$t.' and adv_end_date >'.$t;
        $where = $w.' and ap_id = 1077';
        $banner_adv = $adv_model->getAll(array('field'=>'adv_title,adv_img,adv_url','where'=>$where,'order'=>'slide_sort asc'));
        $json['status'] = 0;
        $where = $w.' and ap_id = 1078';
        $banner_foo1 = $adv_model->getAll(array('field'=>'adv_title,adv_img,adv_url','where'=>$where,'order'=>'slide_sort asc','limit'=>'1'));
        $where = $w.' and ap_id = 1079';
        $banner_foo2 = $adv_model->getAll(array('field'=>'adv_title,adv_img,adv_url','where'=>$where,'order'=>'slide_sort asc','limit'=>'1'));
        if($banner_adv){
            $json['status']  = 1;
            $json['bann_top']['advList'] = $banner_adv;
            $json['bann_foo1']['advList'] = $banner_foo1;
            $json['bann_foo2']['advList'] = $banner_foo2;
        }
        exit(json_encode($json));
        // $this->assign();
    }

    public function search_cache(){
        $keywork = empty($_POST['kd']) ? '' : trim($_POST['kd']);
        if( !empty($keywork) ){
            if( isset($_COOKIE['search_history']) && !empty($_COOKIE['search_history']) ){
                $history_arr = unserialize(base64_decode($_COOKIE['search_history']));
                if( !in_array($keywork,$history_arr) ){
                    $history_arr[] = $keywork;
                    setCookie('search_history',base64_encode(serialize($history_arr)),time()+86400*30);
                }
                setCookie('search',$keywork,time()+5);
            }else{
                $history_arr[] = $keywork;
                setCookie('search',$keywork,time()+5);
                setCookie('search_history',base64_encode(serialize($history_arr)),time()+86400*30);
            }
            $json['status'] = 1;
        }else{
            $json['status'] = 0;
            $json['msg'] = '请填写关键词';
        }
        exit(json_encode($json));
    }

    //获取用户积分信息
    public function user_info(){
        if( empty($_SESSION['user']) ){
            $json['status'] = 0;
        }else{
            $id = $_SESSION['user']['user_id'];
            //获取个人信息
            $user_info = new UsersInfoModel();
            $json['status'] = 1;
            $json['info']['banana'] = $user_info->get_banana_count($id);
        }
        exit(json_encode($json));
    }
    public function search(){
        if( isset($_COOKIE['search']) && !empty($_COOKIE['search']) ){
            $keyword = $_COOKIE['search'];
        }else{
            $keyword = '';
        }
        if( isset($_COOKIE['search_history']) && !empty($_COOKIE['search_history']) ){
            $history_arr = unserialize(base64_decode($_COOKIE['search_history']));
        }else{
            $history_arr = [];
        }
        krsort($history_arr);
        $this->assign('search_history',$history_arr);
        $this->assign('keyword',$keyword);
        $this->display();
    }
    public function categoryList(){
        if( isset($_GET['id']) && !empty($_GET['id']) ){
            $cate_id = trim($_GET['id']);
        }else{
            header('location:Exchange-category.html');
        }
        if( isset($_COOKIE['search']) && !empty($_COOKIE['search']) ){
            $keyword = $_COOKIE['search'];
        }else{
            $keyword = '';
        }
        if( isset($_COOKIE['search_history']) && !empty($_COOKIE['search_history']) ){
            $history_arr = unserialize(base64_decode($_COOKIE['search_history']));
        }else{
            $history_arr = [];
        }
        krsort($history_arr);
        $this->assign('search_history',$history_arr);
        $this->assign('keyword',$keyword);
        $this->assign('cate_id',$cate_id);
        $this->display('WapSite/Exchange/search');
    }
    //搜索页面 默认综合排序
    public function search_goods(){
        //关键词
        $keyword = isset($_POST['keyword']) ? $_POST['keyword'] : '';
        $keysql = '';
        if( !empty($keyword) ){
            $keysql = "AND g.goods_name like '%{$keyword}%'";
        }
        $orderBy = 'ORDER BY ';
        if( empty($_POST['volume']) && empty($_POST['by']) ){
            $orderBy .= 'g.up_time desc';
        }
        //兑换排行
        if( isset($_POST['volume']) && !empty($_POST['volume']) ){
            $orderBy .= 'g.sales_volume '.trim($_POST['volume']);
        }
        //积分价格排序
        if( isset($_POST['by']) && !empty($_POST['by']) ){
            $orderBy .= 'i.item_price '.trim($_POST['by']);
        }
        if( isset($_POST['cate_id']) && !empty($_POST['cate_id']) ){
            $keysql .= ' AND g.cate_id = '.trim($_POST['cate_id']);
        }
        $size = 10;
        $page = empty($_POST['page']) ? '0' : $_POST['page'];
        $dao = Dao::instance();
        $sql = 'SELECT g.goods_id,g.goods_name,i.item_id,i.item_price,i.exchange_points,img.list_image FROM '.$dao->table('exchange_goods').' AS g LEFT JOIN '.$dao->table('exchange_goods_item').' AS i ON g.goods_id = i.goods_id LEFT JOIN '.$dao->table('exchange_goods_images').' AS img ON img.goods_id = g.goods_id WHERE g.verify = 1 AND g.state = 1 AND g.deleted = 0 AND i.item_offsale = 0 AND i.deleted = 0 '.$keysql.' GROUP BY g.goods_id '.$orderBy.' LIMIT '.$page*$size.','.$size;
        $goods_all = $dao->queryAll($sql);
        if( empty($goods_all) ){
            $json['status'] = 0;
        }else{
            $json['status'] = 1;
            $json['goods_list'] = $goods_all;
        }
        exit(json_encode($json));
    }

    //获取兑换商品排行榜
    public function sales_volume(){
        $dao = Dao::instance();
        //获取排行榜显示数量
        // $sql = 'SELECT * FROM '.$dao->table('site_setting').' WHERE name = \'exchange_Leaderboard_sum\'';
        // $board_sum = $dao->queryOne($sql);
        $sql = 'SELECT g.goods_name,g.sales_volume,i.item_id,i.item_price,i.exchange_points,img.list_image FROM '.$dao->table('exchange_goods').' AS g ';
        $sql .= 'LEFT JOIN '.$dao->table('exchange_goods_item').' AS i ON g.goods_id = i.goods_id ';
        $sql .= 'LEFT JOIN '.$dao->table('exchange_goods_images').' AS img ON g.goods_id = img.goods_id ';
        $sql .= 'WHERE g.verify = 1 AND g.state = 1 AND g.deleted = 0 AND i.item_offsale = 0 AND i.deleted = 0 group by g.goods_id ';
        $sql .= 'ORDER BY g.sales_volume desc,g.goods_id asc LIMIT 20';
        // $sql .= 'ORDER BY g.sales_volume desc,g.goods_id asc LIMIT '.$board_sum['value'];
        $goods_list = $dao->queryAll($sql);
        if(empty($goods_list)){
            $json['status'] = 0;
        }else{
            $json['status'] = 1;
            $json['goods_list'] = $goods_list;
        }
        exit(json_encode($json));
    }

    //获取商品分类列表
    public function get_cate_list(){
        $cate_model = new ExchangeGoodsCateModel();
        $cate_all = $cate_model->getAll(array('field'=>'cate_id,cate_name,cate_thumb','where'=>'pid = 0 and cate_show = 1','order'=>'sort desc'));
        if(empty($cate_all)){
            $json['status'] = 0;
        }else{
            $json['status'] = 1;
            $json['cate_list'] = $cate_all;
        }
        exit(json_encode($json));
    }

    //获取分类商品
    public function get_cate_goods(){
        if(!isset($_POST['cate_id']) || empty($_POST['cate_id'])){
            $json['status'] = 0;
            $json['msg'] = '缺少参数';
            exit(json_encode($json));
        }
        $cate_id = $_POST['cate_id'];
        $cate_model = new ExchangeGoodsCateModel();
        $dao = Dao::instance();
        $size = 4;
        $page = isset($_POST['page']) ? $_POST['page'] : 0;
        $sql = 'SELECT g.goods_name,i.item_id,i.item_price,i.exchange_points,img.list_image FROM '.$dao->table('exchange_goods').' AS g LEFT JOIN '.$dao->table('exchange_goods_item').' AS i ON g.goods_id = i.goods_id LEFT JOIN '.$dao->table('exchange_goods_images').' AS img ON img.goods_id = g.goods_id WHERE g.verify = 1 and g.state = 1 and i.item_offsale = 0 and i.deleted = 0 and g.cate_id in ('.$cate_model->CategoryIDALL($cate_id).') group by g.goods_id order by g.goods_id desc LIMIT '.$page*$size.','.$size;
        $goods_all = $dao->queryAll($sql);
        if(empty($goods_all)){
            $json['status'] = 0;
        }else{
            $json['status'] = 1;
            $json['goods_list'] = $goods_all;
        }
        exit(json_encode($json));
    }

    //兑换记录
    public function exchangeLog(){
        //检查登录过期
        $this->loginState(0);
        $this->display();
    }

    //获取兑换记录
    public function get_exchange_log(){
        $user = $this->checkLogin();
        $user_id = $user['user_id'];
        $dao = Dao::instance();
        $size = 10;
        $page = empty($_POST['page']) ? '0' : $_POST['page'];
        $where = " user_id = ${user_id} ";
        $where .= " AND paid = 1 AND ems_status = 1 AND status = 1 AND finished = 1";

        $model_exchange_order = new ExchangeOrderModel();
        $log_list = $model_exchange_order->getAll(array(
            'field' => '*',
            'where' => $where,
            'order' => "created DESC",
            'limit' => $size*$page.','.$size,
        ));
        foreach($log_list as $k => $v){
            $v['created'] = date('Y-d-m',$v['created']);
            $log_list[$k] = $v;
        }
        if( empty($log_list) ){
            $json['status'] = 0;
        }else{
            $json['status'] = 1;
            $json['log_list'] = $log_list;
        }
        exit(json_encode($json));
    }

    //商品详情 图片/价格/名字/属性
    public function goods(){
        if( isset($_GET['id']) && !empty($_GET['id'])){
            $item_id = $_GET['id'];
            $dao = Dao::instance();
            $Exchange = new ExchangeModel();
            //获取商品信息
            $itemInfo = $Exchange->getItemInfo($item_id);
            $saleProp = $Exchange->getItemSaleProp($itemInfo['goods_id'], $itemInfo['cate_id']);
            if(!empty($saleProp)) {
                //print_r($saleProp);
                $this->assign('saleProp', $saleProp);
                //print_r($saleProp);exit;
                $item = $Exchange->getItemValue($item_id);
                $this->assign('item', $item);
                $itemUrl = $Exchange->getItemUrl($itemInfo['goods_id'], $item, $saleProp);
                $this->assign('itemUrl', $itemUrl);
                //属性小图片
                $propImage = $Exchange->salePropSmallImage($itemInfo['goods_id']);
                $this->assign('propImage', $propImage);
                //SKU库存
                $itemStock = $Exchange->itemStockAll($itemInfo['goods_id']);
                $this->assign('itemStock', $itemStock);
            }
            $this->assign('item_id',$item_id);
            $this->assign('goods',$itemInfo);
            $this->display();
        }else{
            header('location:Index-index.html');
        }
    }

    //选择属性更新商品信息
    public function get_goods_prop(){
        if(empty($_POST['id'])){
            exit(json_encode('非法操作'));
        }
        $item_id = $_POST['id'];
        $Exchange = new ExchangeModel();
        //获取商品信息
        $itemInfo = $Exchange->getItemInfo($item_id);
        $saleProp = $Exchange->getItemSaleProp($itemInfo['goods_id'], $itemInfo['cate_id']);
        if(!empty($saleProp)) {
            $item = $Exchange->getItemValue($item_id);
            $itemUrl = $Exchange->getItemUrl($itemInfo['goods_id'], $item, $saleProp);
            //属性小图片
            $propImage = $Exchange->salePropSmallImage($itemInfo['goods_id']);
            //SKU库存
            $itemStock = $Exchange->itemStockAll($itemInfo['goods_id']);
        }
        $salePropHtml = '';
        foreach($saleProp as $sale){
            $salePropHtml .= '<li>
                <h2>'.$sale['prop_name'].'</h2>
                <div class="items">';
            foreach($sale['props'] as $itemId => $v){
                if( !empty($itemStock[$itemUrl[$itemId]]) && empty($itemStock[$itemUrl[$itemId]]['offsale']) ){
                    $salePropHtml .= '<a href="javascript:void(0);" class="'.(empty($itemStock[$itemUrl[$itemId]]['stock'])?'':'value-a').' '.(in_array($itemId,$item)?'cur':'').'" onclick="update_value('.$itemUrl[$itemId].')">'.$v.'</a>';
                }
            }
            $salePropHtml .= '</li>';
        }
        $json = array(
            'propHtml' => $salePropHtml,
            'saleProp' => $saleProp,
            'item'	=> $item,
            'itemUrl'	=> $itemUrl,
            'propImage'	=> $propImage,
            'itemStock'	=> $itemStock,
            'goods'	=> $itemInfo
        );
        exit(json_encode($json));
    }

    //获取商品详情图
    public function get_goods_mess(){
        if( !isset($_POST['id']) || empty($_POST['id']) ){
            exit('非法操作');
        }
        $goods_id = $_POST['id'];
        $goods_model = new ExchangeGoodsModel();
        $goods_mess = $goods_model->getOne(array('field'=>'goods_mobile_body','where'=>'goods_id = '.$goods_id));
        if( !empty($goods_mess) ){
            $json = array(
                'status' => 1,
                'mess'	=> stripslashes(str_replace('src=\"','class=\"lazy\" data-original=\"',$goods_mess))
            );
        }else{
            $json['status'] = 0;
        }
        exit(json_encode($json));
    }

    //兑换商分类列表
    public function category(){
        if( isset($_COOKIE['search_history']) && !empty($_COOKIE['search_history']) ){
            $history_arr = unserialize(base64_decode($_COOKIE['search_history']));
        }else{
            $history_arr = [];
        }
        krsort($history_arr);
        $this->assign('search_history',$history_arr);
        $this->display();
    }

    //获取二级/三级分类列表
    public function get_cate_child(){
        if( !isset($_POST['cate_id']) || empty($_POST['cate_id']) ){
            exit(json_encode('缺少参数'));
        }
        $cate_fid = $_POST['cate_id'];
        $cate_model = new ExchangeGoodsCateModel();
        //获取二级
        $scate_all = $cate_model->getAll(array('field'=>'cate_id,cate_name','where'=>'pid = '.$cate_fid,'order'=>'nav_sort asc'));
        foreach($scate_all as $k => $cate){
            $cate['thcate'] = $cate_model->getAll(array('field'=>'cate_id,cate_name,cate_thumb','where'=>'pid = '.$cate['cate_id'],'order'=>'nav_sort asc'));
            $scate_all[$k] = $cate;
        }
        if(empty($scate_all)){
            $json['status'] = 0;
        }else{
            $json['status'] = 1;
            $json['fcate_id'] = $cate_fid;
            $json['cate_list'] = $scate_all;
        }
        exit(json_encode($json));
    }

    //订单列表页面
    public function orderList(){
        $this->loginState(0);
        $user = $this->checkLogin();
        $user_id = $user['user_id'];
        $page_size = 5;
        $where = " user_id = ${user_id} ";
        $page = isset($_POST['page']) ? $_POST['page'] : 1;
        if(empty($page) || $page <= 0){
            $page = 1;
        }
        $limit_start = ($page - 1) * $page_size;
        $q = Request::get('q');
        if(!empty($q)){
            $where .= " AND (exchange_order_number = '${q}' OR goods_name like '%${q}%') ";
        }
        //订单状态
        $state = empty($_POST['state']) ? '' : $_POST['state'];
        $this->assign("state", $state);
        if(!empty($state)){
            switch ($state){
                case 'paid':
                    $where .= " AND paid = 1 AND status = 1 AND ems_status = 0";
                    break;
                case 'ems':
                    $where .= " AND ems_status = 1 AND status = 1 AND finished = 0";
                    break;
                case 'unpaid':
                    $where .= " AND paid = 0 AND status = 1 AND ems_status = 0";
                    break;
                case 'finshed':
                    $where .= " AND ems_status = 1 AND status = 1 AND finished = 1";
                    break;
            }
        }
        //查询订单
        $model_exchange_order = new ExchangeOrderModel();
        $orders = $model_exchange_order->getAll(array(
            'field' => '*',
            'where' => $where,
            'order' => "created DESC",
            'limit' => "${limit_start}, ${page_size}",
        ));
        foreach ($orders as $key => $order){
            // 获取积分名称
            foreach (ExchangeOrderModel::$map_p_type as $p_key => $p_value){
                if($order['point_type'] == $p_value){
                    $orders[$key]['point_name'] = Lang::get($p_key);
                    break;
                }
            }
            // 订单状态
            $orders[$key]['cur_state'] = $model_exchange_order->get_order_status($order);
            $orders[$key]['created'] = date('Y-m-d',$order['created']);
        }
        //订单总数
        $count_orders = $model_exchange_order->getOne(array(
            'field' => 'count(*)',
            'where' => $where,
        ));
        if( isset($_POST) && !empty($_POST) ){
            if(empty($orders)){
                $json['status'] = 0;
            }else{
                $json['status'] = 1;
                $json['list'] = $orders;
            }
            exit(json_encode($json));
        }else{
            $this->assign("orders", $orders);
            $this->display();
        }
    }

    //订单详情页
    public function orderProp(){
        $this->loginState(0);
        $user = session::get('user');
        $user_id = $user['user_id'];
        $order_number = Request::get("orderId");
        if( empty($order_number) ){
            header('location:Exchange-orderList.html');
        }
        $model_ex_order = new ExchangeOrderModel();
        $order = $model_ex_order->getRow(array(
            'field' => "*",
            'where' => "user_id = ${user_id} and exchange_order_number = ${order_number}"
        ));
        $model_consignee = new ExchangeOrderConsigneeModel();
        $consignee = $model_consignee->getRow(array(
            'field' => '*',
            'where' => "exchange_order_id = ${order['exchange_order_id']}"
        ));
        $delivery = [];
        $deliveryModel = new OrderDeliveryModel();
        if(!empty($consignee['waybill'])){
            $delivery['waybill'] = $consignee['waybill'];
            $delivery['express_name'] = $consignee['express_name'];
            $delivery['track'] = $deliveryModel->getWayBillTrack($delivery['waybill']);
        }
        $this->assign("delivery", $delivery);

        $order['cur_status'] = $model_ex_order->get_order_status($order);
        // 获取积分名称
        foreach (ExchangeOrderModel::$map_p_type as $p_key => $p_value){
            if($order['point_type'] == $p_value){
                $order['point_name'] = Lang::get($p_key);
                break;
            }
        }
        $this->assign("order", $order);
        $this->assign("consignee", $consignee);
        $this->display();
    }

    // 提交需要兑换的商品信息
    public function commit_exchange(){
        $json['OK'] = 0;
        $json['url'] = '';
        if( empty(session::get('user')) ){
            $json['msg'] = '请先登录';
            $json['url'] = 'Login-login-1314.html';
        }else{
            $item_id = $_POST['item_id'];
            $p_type = $_POST['p_type'];
            try{
                if(empty($item_id) || empty($p_type)){
                    throw new Exception("系统异常");
                }
                if(!in_array($p_type, array('balance_point', 'travel_point', 'point'))){
                    throw new Exception("系统异常");
                }

                $dao = Dao::instance();
                $sql = "select goods_num AS stock from " . $dao->table('storage_stock') . " AS s";
                $sql .= " INNER JOIN " . $dao->table('storage_info') . " AS si ON si.storage_id=s.storage_id";
                $sql .= " WHERE s.item_id={$item_id} AND (si.storage_type=5)";
                $stock = $dao->queryOne($sql);
                if(empty($stock)){
                    throw new Exception("库存不足,请选择兑换其他产品");
                }

                $json['OK'] = 1;
                Session::set("exchange_item_id", $item_id);
                Session::set("exchange_p_type", $p_type);
            }catch (Exception $e){
                $json['msg'] = $e->getMessage();
            }
        }

        exit(json_encode($json));
    }

    //兑换商城下单页面
    public function getOrderInfo(){
        $this->loginState(0);
        if( isset($_GET['item_id']) && !empty($_GET['item_id']) ){
            $user = session::get('user');
            $id = $user['user_id'];
            //获取默认地址城市配置
            $model_address = new UsersAddressModel();
            $address_city = $model_address->getOne(array('field' => "city",'where' => "user_id = {$id} and status = 1"));
            //商品SKU
            $item_id = session::get('exchange_item_id');
            if(empty($item_id)){
                header('location:Exchange-index.html');
            }
            //获取商品信息
            $Exchange = new ExchangeModel();
            $goods_info = $Exchange->getItemInfo($item_id);
            $this->assign('goods_info',$goods_info);
            //计算运费
            $fee = 0;
            if( !empty($address_city) ){
                $exchange_model = new ExchangeModel();
                $weight = $goods_info['goods_weight'];
                $fee = $exchange_model->getFreight($address_city, $weight);
            }
            $this->assign('fee',$fee);
            //支付类型
            $p_type = Session::get("exchange_p_type");
            $this->assign("p_type", $p_type);
            $model_user = new UsersInfoModel();
            $available_point = 0;
            switch ($p_type){
                case 'balance_point':
                    $available_point = $model_user->getOne(array(
                        'field' => 'discharge_point',
                        'where' => "user_id={$id}"
                    ));
                    break;
                case 'travel_point':
                    $available_point = $model_user->getOne(array(
                        'field' => 'tourism',
                        'where' => "user_id={$id}"
                    ));
                    break;
                case 'point':
                    $available_point = $model_user->getOne(array(
                        'field' => 'point',
                        'where' => "user_id={$id}"
                    ));
                    break;
                default:
                    throw new HttpException('请重新选择兑换商品');
            }
            // 获取用户惠积分余额
            $money = $model_user->getOne(array(
                'field' => 'user_money',
                'where' => "user_id = {$id}"
            ));
            $this->assign("money", $money);
            $this->assign("available_point", $available_point);

            //生成校验码 提交订单使用 防止多次提交
            if( !isset($_SESSION['getOrderInfo']) || empty($_SESSION['getOrderInfo'])){
                $_SESSION['getOrderInfo'] = md5(time().rand(1000,9999).$_SESSION['user']['user_id']);
            }
            $this->assign('csrf',$_SESSION['getOrderInfo']);
            //获取用户地址
            $address_model = new UsersAddressModel();
            $city_model = new CityModel();
            $address_all = $address_model->getAll(array(
                'field'=>'*',
                'where'=>'user_id = '.$id,
                'order'=>'status desc'
            ));
            if(!empty($address_all)){
                //屏蔽mobile处理
                foreach($address_all as $k => $v){
                    $where = 'id = '.$v['province'];
                    $province = $city_model->getOne(array('field'=>'name','where'=>$where));
                    $where = 'id = '.$v['city'];
                    $city = $city_model->getOne(array('field'=>'name','where'=>$where));
                    $where = 'id = '.$v['area'];
                    $area = $city_model->getOne(array('field'=>'name','where'=>$where));
                    $address_all[$k]['mobile'] = trim($v['mobile']) != ''? substr_replace($v['mobile'], '*******', 3, 4) : '';
                    $address_all[$k]['address'] = $province.$city.$area.$v['address'];
                }
            }
            $this->assign('address_all',$address_all);

            $this->display();
        }else{
            header('location:Exchange-index.html');
        }
    }

    // 兑换商城下订单
    public function exchangeOrder(){
        $user = $this->checkLogin();
        $user_id = $user['user_id'];
        $item_id = Session::get("exchange_item_id");
        $p_type = Session::get('exchange_p_type');
        $consignee_id = $_POST['address_id'];
        $pay_word = $_POST['payPwd'];
        $pay_type = ExchangeOrderModel::PAY_TYPE_BALANCE;
        // 下单
        $order_number = NULL;
        $model_user = new UsersInfoModel();
        $model_exchange_order = new ExchangeOrderModel();
        $user = $model_user->getRow(array(
            'field' => "payword, pay_dynamic_code, user_money",
            'where' => "user_id = ${user_id}"
        ));
        try{
            if($model_user->payPassword($pay_word, $user['pay_dynamic_code']) != $user['payword']){
                throw new Exception("支付密码错误");
            }
            $order_number = $model_exchange_order->createOrder($user_id, $item_id, $consignee_id, ExchangeOrderModel::$map_p_type[$p_type]);
        }catch (Exception $e){
            exit(json_encode(array('error'=>1,'msg'=>$e->getMessage())));
        }
        exit(json_encode($this->pay($order_number, $pay_type)));
    }

    //订单详情页支付运费
    public function pay_ship_cost(){
        $user = $this->checkLogin();
        $user_id = $user['user_id'];
        $order_number = $_GET['order_number'];
        $pay_type = ExchangeOrderModel::PAY_TYPE_BALANCE;
        $pay_word = $_POST['payPwd'];
        $model_user = new UsersInfoModel();

        $user = $model_user->getRow(array(
            'field' => "payword, pay_dynamic_code, user_money",
            'where' => "user_id = ${user_id}"
        ));
        try{
            if($model_user->payPassword($pay_word, $user['pay_dynamic_code']) != $user['payword']){
                throw new Exception("支付密码错误");
            }
        }catch (Exception $e){
            exit(json_encode(array('error'=>1,'msg'=>$e->getMessage())));
        }
        exit(json_encode($this->pay($order_number, $pay_type)));
    }

    //运费支付
    private function pay($order_number, $pay_type){
        $model_user = new UsersInfoModel();
        $model_exchange_order = new ExchangeOrderModel();
        $order = $model_exchange_order->getRow(array(
            'field' => "*",
            'where' => "exchange_order_number = '${order_number}'"
        ));
        // if($order['paid']){
        // 	$this->assign("order", $order);
        // 	$this->display("exchange_success");
        // }
        $json['error'] = 0;
        if(!empty($order_number)){
            switch($pay_type) {
                // case 'unionpay':
                //     Url::redirect(['Index/Upacp/recharge_pay', 'payment_number'=>$orderId]);
                //     break;
                case ExchangeOrderModel::PAY_TYPE_BALANCE:
                    try{
                        $model_user->begin();

                        if(empty($order)){
                            throw new Exception("找不到兑换订单：${order_number}");
                        }
                        $model_user_money = new UsersMoneyModel();
                        if($model_user_money->change_money($order['user_id'], UsersMoneyModel::OUT, bcadd($order['shipping_cost'],$order['total_price'],2), "支付兑换订单：${order_number}运费") === false){
                            throw new Exception("支付兑换订单：${order_number}运费失败");
                        }
                        if($model_exchange_order->pay_success($order_number, bcadd($order['shipping_cost'],$order['total_price'],2), ExchangeOrderModel::PAY_TYPE_BALANCE) !== true){
                            throw new Exception("兑换订单：${order_number}运费支付失败");
                        }
                        $model_user->commit();
                        $json['msg'] = '支付成功';
                        // Url::redirect(['Index/Exchange/exchange_success', 'order_number' => $order_number]);
                    }catch (Exception $e){
                        $model_user->rollback();
                        $json['error'] = 1;
                        $json['msg'] = $e->getMessage();
                        // Url::redirect(['Index/Exchange/exchange_fail', 'error'=>$e->getMessage(), 'code' => 1, 'order_number' => $order_number]);
                    }
                    break;
                case ExchangeOrderModel::PAY_TYPE_ALIPAY:
                    $json['msg'] = '支付成功';
                    // Url::redirect(['Index/Alipay/exchange_pay', 'payment_number'=>$order_number]);
                    break;
                case ExchangeOrderModel::PAY_TYPE_WEIXINPAY:
                    $json['msg'] = '支付成功';
                    // Url::redirect(['Index/WeiXinPay/exchange_pay', 'payment_number'=>$order_number]);
                    break;
                default:
                    return 123435;
                    break;
            }
        }
        // exit(json_encode($json));
        return $json;
    }

    // 取消订单
    public function cancel_order(){
        $user = $this->checkLogin();
        $user_id = $user['user_id'];
        $json['OK'] = 0;
        $model_exchange_order = new ExchangeOrderModel();
        $order_number = $_POST['order_number'];
        try{
            $model_exchange_order->cancel_order($user_id, $order_number);
            $json['OK'] = 1;
        }catch (Exception $e){
            $json['error'] = $e->getMessage();
        }
        exit(json_encode($json));
    }

    // 完成订单
    public function finish_order(){
        $user = $this->checkLogin();
        $user_id = $user['user_id'];
        $json['OK'] = 0;
        $model_exchange_order = new ExchangeOrderModel();
        $order_number = $_POST['order_number'];
        try{
            $model_exchange_order->finish_order($user_id, $order_number);
            $json['OK'] = 1;
        }catch (Exception $e){
            $json['error'] = $e->getMessage();
        }
        exit(json_encode($json));
    }
}
?>