var express = require('express');
var app = express();

var React = require('react'),
	ReactDOMServer = require('react-dom/server');

var App = React.createFactory(require('./App'));

app.get('/', function(req, res) {
	var html = ReactDOMServer.renderToStaticMarkup(
		React.DOM.body(
			null,
			React.DOM.div({
				id: 'root',
				dangerouslySetInnerHTML: {
					__html: ReactDOMServer.renderToStaticMarkup(App())
				}
			})
		)
	);

	res.end(html);
});

app.listen(3000, function() {
	console.log('running on port ' + 3001);
});