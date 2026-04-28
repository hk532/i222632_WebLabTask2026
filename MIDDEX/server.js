const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8080;
const root = path.resolve(__dirname);

const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

http.createServer((req, res) => {
  let urlPath = req.url === '/' ? '/index.html' : req.url;
  let filePath = path.join(root, urlPath.split('?')[0]);

  if (!filePath.startsWith(root)) {
    res.statusCode = 400;
    res.end('Bad request');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.end('Not Found');
      return;
    }

    let ext = path.extname(filePath).toLowerCase();
    let contentType = mime[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
}).listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
