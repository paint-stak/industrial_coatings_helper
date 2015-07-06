//This is the http server

var dispatcher = required('httpdispatcher');

//require/import the http module
var http = require('http'); 

//define a port to listen to 
const PORT=8080;

//function to handle requests and send responses
function handleRequest(request, response) {
	try{
		//log the request on console
		console.log(request.url);
		//dispatch
		dispatcher.dispatch(request, response);
	} catch(err) {
		console.log(err);

	}

	//for all your static (js/css/images/etc) set the directory name (relative path.)
		dispatcher.onGet("/page1", function(req,res) {
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('Page One')

		});

		//A sample POST request
		dispather.onPost("/post1", function(req,res) {
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('Got Post Data');
		});

//response.end('Server successful. Path hit: ' + request.url);


//create server
var server = http.createServer(handleRequest);

//start the server
server.listen(PORT, function() {
	//callback triggered when server is successfully listening. 
	console.log("Server is listening on: http://localhost:%s", PORT);
});


