import React from 'react';
class Goback extends React.Component {
	go() {
		let go = this.props.go ? this.props.go : '-1'

		window.history.go(go)
	}
	render() {
		let isNone = this.props.isNone ? 'none' : 'block'

		return (

			<a className="class th-nav-back" onClick={this.go.bind(this)} style={{display:isNone}}></a>
		)


	}
}

export default Goback;