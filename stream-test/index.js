// const http = require('http');

// const server = http.createServer((req, res) => {
//     if (req.method === 'GET') {
//         req.pipe(res);
//     }
// })
// server.listen(8001);


// 文件流
// const fs = require('fs');
// const path = require('path');

// const fileName1 = path.resolve(__dirname, 'data.txt');
// const fileName2 = path.resolve(__dirname, 'data-bak.txt');

// const readStream = fs.createReadStream(fileName1);
// const writeStream = fs.createWriteStream(fileName2);

// readStream.pipe(writeStream);

// readStream.on('data', chunk => {
//     console.log(chunk.toString());
// })

// readStream.on('end', () => console.log('copy end'));


const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        const fileName1 = path.resolve(__dirname, 'data.txt');
        const readStream = fs.createReadStream(fileName1);
        readStream.pipe(res);
    }
})
server.listen(8001);