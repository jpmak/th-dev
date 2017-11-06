require('normalize.css/normalize.css');

require('styles/App.css');
import React from 'react';
class AppComponent extends React.Component {
    render() {
        return (

            <div className="index">
        <img  alt="Yeoman Generator" />
        <div className="notice"> <code>11/Main.js</code> to get started!</div>
      </div>
        );
    }
}



AppComponent.defaultProps = {};

export default AppComponent;