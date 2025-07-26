const math = require("./mathUtil");
const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Math Utility</title>
                <style>
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        background-color: #f9f9f9;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                    }
                    .container {
                        background-color: #fff;
                        padding: 2rem 3rem;
                        border-radius: 8px;
                        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                        max-width: 500px;
                        width: 100%;
                        text-align: center;
                    }
                    h1 {
                        color: #333;
                        margin-bottom: 1rem;
                    }
                    p {
                        color: #555;
                        margin-bottom: 2rem;
                        font-size: 0.95rem;
                    }
                    input[type="number"] {
                        width: 100%;
                        padding: 0.5rem;
                        margin: 0.5rem 0;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        font-size: 1rem;
                    }
                    button {
                        background-color: #007BFF;
                        color: #fff;
                        border: none;
                        padding: 0.6rem 1.2rem;
                        font-size: 1rem;
                        border-radius: 4px;
                        cursor: pointer;
                        margin-top: 1rem;
                    }
                    button:hover {
                        background-color: #0056b3;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Basic Math Operations</h1>
                    <p>This page uses a custom module <strong>mathUtil.js</strong> with <code>add</code> and <code>subtract</code> functions.</p>
                    <form method="POST" action="/parse">
                        <input type="number" name="A" placeholder="Enter first number (A)" required />
                        <input type="number" name="B" placeholder="Enter second number (B)" required />
                        <button type="submit">Calculate</button>
                    </form>
                </div>
            </body>
            </html>
        `);
    } else if (req.method === 'POST' && req.url === '/parse') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const params = querystring.parse(body);
            const A = parseInt(params.A);
            const B = parseInt(params.B);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Results</title>
                    <style>
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            background-color: #f4f4f4;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            height: 100vh;
                            margin: 0;
                        }
                        .container {
                            background-color: #fff;
                            padding: 2rem 3rem;
                            border-radius: 8px;
                            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                            text-align: center;
                        }
                        h1 {
                            color: #333;
                        }
                        ul {
                            list-style: none;
                            padding: 0;
                            margin-top: 1rem;
                        }
                        li {
                            background-color: #e9ecef;
                            margin: 0.5rem 0;
                            padding: 0.75rem;
                            border-radius: 4px;
                            font-size: 1.1rem;
                            color: #333;
                        }
                        a {
                            display: inline-block;
                            margin-top: 1.5rem;
                            text-decoration: none;
                            color: #007BFF;
                            font-weight: bold;
                        }
                        a:hover {
                            text-decoration: underline;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Math Results</h1>
                        <ul>
                            <li>Addition of A and B is: ${math.add(A, B)}</li>
                            <li>Subtraction of A and B is: ${math.subtract(A, B)}</li>
                        </ul>
                        <a href="/">&#8592; Back to Calculator</a>
                    </div>
                </body>
                </html>
            `);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Not Found</h1>');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
