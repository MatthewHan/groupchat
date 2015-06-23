module.exports = function Route(app,server){
	app.get('/', function(req, res) {
	 	res.render("index");
	});
	var users = [];
	var messages = [];
	var user_exists = function(user){
		var count = users.length;
		for(index in users){
			if(users[index].name == user){
				return true;
			}
		}
		return false;
	}
	var io = require('socket.io').listen(server)
	io.sockets.on('connection', function(socket){
		socket.on('new_user', function(user){
			if(user_exists(user.name)){
				console.log('user exists');
				socket.emit("user_exists",{error: "Name taken"})
			} else {
				user.socket_id = socket.id;
				console.log(user);
				users.push(user);
				console.log(users);
				io.emit('load_users', {users: users});
				io.emit('load_messages',{messages: messages});
			}
		})
		socket.on('new_message', function(message){
			messages.push(message)
			console.log(messages);
			io.emit('load_messages',{messages: messages});
		})

		socket.on('disconnect', function(){
			user_index = 0;
			for(var i = 0, len = users.legnth; i< len; i++){
				if(users[i].socket_id == socket.id){
					user_index = i;
					break;
				}
			}
			users.splice(user_index,1);
			io.emit('load_users', {users: users});
		})
	})
};