module.exports = function Route(app,server){
	app.get('/', function(req, res) {
	 	res.render("index");
	});
	var io = require('socket.io').listen(server)
	var counter = 0;
	io.sockets.on('connection', function(socket){

	})
};