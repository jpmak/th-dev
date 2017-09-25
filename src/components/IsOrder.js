import React from 'react';
import $ from 'jquery';
import TopNav from './TopNav';
import Goback from './public/Goback';
import IsOrderAddress from './isorder/IsOrderAddress';
import IsOrderLi from './isorder/IsOrderLi';
import OrderFoot from './isorder/OrderFoot';






class IsOrder extends React.Component {
 
    renderPage() {
        return (
            <div >
        <TopNav titleName = "确认订单" />

               <div className='w'>
        <IsOrderAddress />
        <IsOrderLi/>
<OrderFoot/>
   </div>

</div>)


    }
    render() {
    
        let renderHtml = [];
        renderHtml = this.renderPage();
        return (
            <div>
        {
            renderHtml
        }
        </div>
        );


    }
}




export default IsOrder;


