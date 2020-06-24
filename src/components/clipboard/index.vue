<template>
<div>
  <el-button id="btn" :class='styleName' @click='success' :data-clipboard-text="content">
      {{name}}
  </el-button>
</div>
</template>
<script>
import ClipboardJS from './clipboard'
export default {
  name: 'ClipBoard',
  props: {
    content: {
      type: String,
      default: '复制的文本'
    },
    name: {
      type: String,
      default: '复制'
    },
    styleName: {
      type: Object,
      default: ()=>{}
    }
  },
  data () {
    return {
      counter: {}
    }
  },
  methods: {
    success () {
      // const h = this.$createElement
      this.$notify({
        title: '信息已复制!',
        dangerouslyUseHTMLString: true,
        message: `<div>${this.content.replace(/\n/g,"<br/>")}</div>`,
        duration: 2000
      })
    }
  },
  mounted () {
    this.counter = new ClipboardJS('#btn')
  }
}
</script>
