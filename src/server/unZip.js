const fs = require('fs')

const unzip = require('unzip')

fs.createReadStream('../api.zip')
    .pipe(unzip.Extract({ path: 'aaa' }))

console.log('文件解压完成')