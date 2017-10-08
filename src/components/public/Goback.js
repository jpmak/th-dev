import React from 'react';
class Goback extends React.Component {
	go(){
window.history.go(this.props.go)
	}
	render() {
let go=this.props.go?this.props.go:'-1'
		return (

			<a className="class th-nav-back" onClick={this.go.bind(this)}></a>
		)


	}
}

export default Goback;