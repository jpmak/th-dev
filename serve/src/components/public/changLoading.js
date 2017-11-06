import React from 'react';
import '../../styles/changeLoading.css';

class ChangeLoading extends React.Component {

	render() {
		return (

			<div className="main" style={{display:this.props.changeLoading?'block':'none'}}>
	<div className="loading">
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
	</div>
</div>

		)
	}
}



export default ChangeLoading;