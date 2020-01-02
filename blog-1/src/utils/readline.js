const path = require('path');
const fs = require('fs');
const readline = require('readline');

let filename = path.join(__dirname, '../', '../', 'log', 'access.log');

const readStream = fs.createReadStream(filename);

const rl = readline.createInterface({
    input: readStream
})

let sum = 0;
let chromeNum = 0;
rl.on('line', (lineData) => {
    if (!lineData) {
        return;
    }
    // 计算总数
    sum ++;
    let arr = lineData.split('--');
    if (arr[2] && arr[2].indexOf('Chrome') > 0) {
        chromeNum++;
    }
})

rl.on('close', () => {
    console.log('Chrome 占比：' + chromeNum / sum);
})