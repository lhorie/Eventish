var SOCKET_SERVER = 'localhost'
var SOCKET_PORT = 3100

var Subscription = Backbone.Model.extend({
	defaults: {
		tags: [],
		socket: undefined
	},
	initialize: function() {
		this.socket();
		this.bind("change:tags", this.update_tags(), this);
	},
	socket: function() {
		// establish a socket connection
		var socket = io.connect('http://'+SOCKET_SERVER+':'+SOCKET_PORT);
		socket.on('event', function(data) {
			console.log(data);
			this.trigger('event', data);
		})
		this.set({ socket: socket });
	},
	update_tags: function() {
		// keep the connection alive
		this.get('socket').emit('tags', this.get('tags'));
	}
})