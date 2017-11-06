import 'core-js/fn/object/assign';
import React from 'react';
import TopNav from '../components/TopNav';
import DetBody from '../components/detail/DetBody';

const R_det = ({
	match
}) => (
	<div className="th-block">
        <header id="headnav"><TopNav titleName = "产品详情"	icon = "jf-record-icon"	dis = "none" /></header>
<div id="detwrap"><DetBody paramsId={match.params.id}/></div>
    </div>
)

export default R_det;