const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    getJSON(res);
  })
  .listen(3000, "127.0.0.1");

//Reads JSON and shifts control to getTemplate
function getJSON(res) {
  fs.readFile("./titles.json", (err, data) => {
    if (err) errorHandler(err, res);

    getTemplate(JSON.parse(data.toString()), res);
  });
}

//Reads HTML file
function getTemplate(titles, res) {
  fs.readFile("./index.html", (err, data) => {
    if (err) errorHandler(err, res);
    formatHTML(titles, data.toString(), res);
  });
}

//Takes JSON and template to render a response back to client

function formatHTML(titles, template, res) {
  const html = template.replace("*", titles.join("<li></li>"));
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
}

// Error Handler
function errorHandler(err, res) {
  console.error(err);
  res.end("Server Error");
}
