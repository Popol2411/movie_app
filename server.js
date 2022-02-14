const http = require("http"); //cons(tant) http stating that http protocol is requested

(fs = require("fs")), (url = require("url")); //fs -> file system

http
  .createServer((request, response) => {
    // http request creates the server and a response
    let addr = request.url,
      q = url.parse(addr, true),
      filePath = "";

    fs.appendFile(
      // whenever a URL is opened, the address will be logged in the file log.txt including a timestamp and the date
      "log.txt",
      "URL: " + addr + "\nTimestamp: " + new Date() + "\n\n", // \n -> breakpoint
      err => {
        if (err) {
          console.log(err); // if an error occurs, an "err" (error) will be thrown, otherwise "Added to log" would be display in the console
        } else {
          console.log("Added to log.");
        }
      }
    );

    if (q.pathname.includes("documentation")) {
      filePath = __dirname + "/documentation.html";
    } else {
      filePath = "index.html"; // if the filename includes "documentation", the file documentation.html will open, otherwise the user will be redirected to index.html
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        throw err;
      }

      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(data);
      response.end(); // the file documentation.html is beeing read, otherwise error is thrown
    });
  })
  .listen(8080);
console.log("My test server is running on Port 8080.");
