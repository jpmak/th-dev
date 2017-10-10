import React from 'react';
class DataNone extends React.Component {

	render() {
		let tip=this.props.tip?this.props.tip:'没有相关数据'
		return (
<div className='NoData'>	
			<h3>{tip}</h3>
			</div>
		)


	}
}

export default DataNone;