const math = require("./mathUtil");
const http = require('http');
const querystring = require('querystring');
const server = http.createServer((req, res) => {
    if(req.method==='GET' && req.url==='/'){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
      <html>
        <body>
          <h1>Basic Math Operations</h1>
          <p>This page uses custom created module named mathUtil.js which contains two functions (add,subtract).</p>
          <form method="POST" action="/parse">
            <label>Enter two numbers:</label><br>
            <input type="number" name="A" placeholder="Enter A" required style="width: 400px;">
            <br>
            <input type="number" name="B" placeholder="Enter B" required style="width: 400px;">
            <br>
            <br>
            <button type="submit">Calculate</button>
          </form>
        </body>
      </html>
    `);
    }
    else if(req.method==='POST' && req.url ==='/parse'){
         let body = '';
        req.on('data', chunk => {
              body += chunk.toString();
        });
        req.on('end', () => {
            const params = querystring.parse(body);
            const A =parseInt(params.A);
            const B =parseInt(params.B);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
      <html>
        <body>
          <h1>Basic Math Operations</h1>
          <ul>
          <li>Addition of A and B is : ${math.add(A,B)}</li>
          <li>Subraction of A and B is : ${math.subtract(A,B)}</li>
          </ul>
        </body>
      </html>
    `);});
    }
    else{
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Not Found</h1>'); 
    }
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});