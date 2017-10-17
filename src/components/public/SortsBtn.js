import React from 'react';
import {
	Link
} from 'react-router-dom'
class SortsBtn extends React.Component {
	render() {
		return (
			<Link to={this.props.baseUrl+'/list/'} className="class sorts" ></Link>
		)
	}
}


export default SortsBtn;