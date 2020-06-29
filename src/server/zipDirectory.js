// todo 对文件夹进行压缩
/*
* 需要安装compressing模块 yarn add compressing
* */

const compressing = require('compressing');

compressing.zip.compressDir('../api', '../api.zip')
    .then(() => {
        console.log('success');
    })
    .catch(err => {
        console.error(err);
    });