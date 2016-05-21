/*
 * 简单Node.js服务器实现（无封装）
 */
const http = require("http");
const querystring = require("querystring");
//echo
http.createServer((request, response) => {
  //GET请求处理
  if (request.method === 'GET') {
    //提取GET请求中的URL
    var url = request.url.split("?")[0];
    //提取GET请求中URL的参数
    var parameter = request.url.split("?")[1];
    //判断URL是否等于echo，否则返回404
    if (url === '/echo') {
      request.on('data', () => {
      }).on('end', () => {
        //把参数转成Object
        var data = querystring.parse(parameter);
        response.on('error', (err) => {
          console.error(err);
        });
        response.writeHead(200, {
          'Content-Type': 'application/json'
        });
        response.write(JSON.stringify(data));
        response.end();
      })
    } else {
      response.statusCode = 404;
      response.end();
    }

  }
  if (request.method === 'POST') {
    if (request.url === '/echo') {
      var body = [];
      request.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();
          var data = querystring.parse(body);
        response.on('error', (err) => {
          console.error(err);
        });
        response.writeHead(200, {
          'Content-Type': 'application/json'
        });
        response.write(JSON.stringify(data));
        response.end();
      })
    } else {
      response.statusCode = 404;
      response.end();
    }

  }
}).listen(8181);
