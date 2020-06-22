<template>
  <div class="home">
    <socket-io />
  </div>
</template>

<script>
// @ is an alias to /src
import socketIo from '@/components/socketIo.vue'

export default {
  name: 'Home',
  components: {
    socketIo
  }
}
</script>
