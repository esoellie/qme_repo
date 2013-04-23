var http = require("http");
var url = require("url");
var fs = require("fs");
var index = fs.readFileSync("F:/My Projects/Learning Node/helloworld/test.html");

function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    
    route(pathname);
    
    response.writeHead(200);
    response.write(index, "binary");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;

