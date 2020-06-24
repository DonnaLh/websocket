/*
*  对公共组件进行统一处理，注册
* */

import Vue from 'vue'
let contexts = require.context('.', true, /\.vue$/)
contexts.keys().forEach(component => {
    if (!component.includes('index.vue')) return
    let componentEntity = contexts(component).default
    // 使用内置的组件名称 进行全局组件注册
    // console.log(componentEntity, componentEntity.name)
    Vue.component(componentEntity.name, componentEntity)
})
