appLog = function(msg) {
	debug = true
	if(debug) {
		var timestamp = '[' + new Date().toLocaleTimeString() + '] ';
		$("#info-list").append("<div>" + timestamp + msg + "</div>")
		console.log(timestamp + msg);
	}
}