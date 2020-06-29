// todo 对文件进行解压

const fs = require('fs');
const zlib = require('zlib');

const gunzip = zlib.createGunzip();

const inGzipFile = fs.createReadStream('./Inquirer.js.gz');
const outFile = fs.createWriteStream('./Inquirer1.js');

inGzipFile.pipe(gunzip)
    .on('error', () => {
        console.log('错误处理');
    })
    .pipe(outFile)
    .on('error', ()=> {
        console.log('错误处理')
    });