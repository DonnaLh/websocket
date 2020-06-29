const inquirer = require('inquirer');

const promptList = [{
    type: 'input',
    message: '设置一个用户名:',
    name: 'name',
    default: "test_user" // 默认值
},{
    type: "confirm",
    message: "是否使用监听？",
    name: "watch",
    prefix: "前缀"
},{
    type: "confirm",
    message: "是否进行文件过滤？",
    name: "filter",
    suffix: "后缀",
    when: function(answers) { // 当watch为true的时候才会提问当前问题
        return answers.watch
    }
},{
    type: 'list',
    message: '请选择一种水果:',
    name: 'fruit',
    choices: [
        "Apple",
        "Pear",
        "Banana"
    ],
    filter: function (val) { // 使用filter将回答变为小写
        return val.toLowerCase();
    }
},{
    type: 'rawlist',
    message: '请选择一种水果:',
    name: 'fruit',
    choices: [
        "Apple",
        "Pear",
        "Banana"
    ]
}];

inquirer.prompt(promptList).then(answers => {
    console.log(answers); // 返回的结果
})
