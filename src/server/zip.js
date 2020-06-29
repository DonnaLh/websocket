// 使用gzip对文件进行压缩（不可压缩文件夹）
const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip();

const inFile = fs.createReadStream('./Inquirer.js');
const outGzip = fs.createWriteStream('./Inquirer.js.gz');

inFile.pipe(gzip)
    .on('error', () => {
        console.log('error');
    })
    .pipe(outGzip)
    .on('error', () => {
        console.log('error')
    });


/*解压*/