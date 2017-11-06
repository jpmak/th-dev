import React from 'react';
class Loading extends React.Component {
	render() {
		return (
			<div style={{height:'100%',width:'7.5rem',display:'table'}}>
			<div className = 'startLoading' >loading...</div>
			</div>
		)
	}
}



export default Loading;