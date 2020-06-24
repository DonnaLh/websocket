<template>
<i :class="classes"></i>
</template>

<script>
import Vue from 'vue'
import './font/icon-bass.css'
import './iconone/icon-one.css'
const Icon = {
  name: 'Icon',
  props: {
    type: String
  },
  computed: {
    classes: function () {
      return ['ibass', 'ibass-' + this.type, 'one', 'one-' + this.type].join(' ')
    }
  }
}
Vue.component('Icon', Icon)
export default Icon
</script>
