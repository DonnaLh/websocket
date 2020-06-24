<template>
  <el-button
    :type="type"
    :size="size"
    :icon="icon"
    @click="downloadExl">
    <slot name="icon"></slot>
    <span>{{text ? text : '导出'}}</span>
  </el-button>
</template>

<script>
  export default {
    name: 'ExportButton',
    props: {
      size: {
        type: String,
        default: 'small'
      },
      icon: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'primary'
      },
      url: ()=>'',
      text: ()=>'',
      parmas: null
    },
    methods: {
      downloadExl () {
        if (this.url) {
          const token = localStorage.token
          let urlStr = this.url.trim()
          let str = urlStr.slice(0, 1) === '/' ? '' : '/'
          let tail = urlStr.slice(-1, urlStr.length) === '?' ? '' : '?'
          let url = window.location.origin + str + this.url + tail
          let hashs = ''
          for (let item in this.parmas) {
            let key = ''
            let value = ''
            if (this.parmas[item] instanceof Object && !(this.parmas[item] instanceof Array)) {
              for (let x in this.parmas[item]) {
                key = item + '.' + x
                value = this.parmas[item][x]
                hashs += key + '=' + value + '&'
              }
            } else {
              key = item
              value = this.parmas[item] ? this.parmas[item] : ''
              hashs += key + '=' + value + '&'
            }
          }
          hashs += 'token=' + token
          let urls = url + hashs
          const downloadElement = document.createElement('a')
          downloadElement.href = urls
          downloadElement.download = 'excel'
          document.body.appendChild(downloadElement)
          downloadElement.click()
          document.body.removeChild(downloadElement)
        }
      }
    }
  }
</script>

