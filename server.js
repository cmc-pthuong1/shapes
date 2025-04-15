const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;
const server = http.createServer((req, res) => {
 let filePath = req.url === '/' ? '/index.html' : req.url;
 const extname = path.extname(filePath);
 // Chỉ cho phép file .html
 if (extname !== '.html' && filePath !== '/index.html') {
   res.writeHead(403, { 'Content-Type': 'text/plain' });
   return res.end('Access denied');
 }
 filePath = path.join(__dirname, filePath);
 fs.readFile(filePath, (err, content) => {
   if (err) {
     res.writeHead(404, { 'Content-Type': 'text/plain' });
     res.end('404 - File not found');
   } else {
     res.writeHead(200, { 'Content-Type': 'text/html' });
     res.end(content);
   }
 });
});
server.listen(PORT, () => {
 console.log(`Server is running at http://localhost:${PORT}`);
});