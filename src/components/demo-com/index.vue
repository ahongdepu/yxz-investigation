<template>
  <div class="demo">
    <img alt="Vue logo" :src="img">
  </div>
</template>

<script>
import img from '@/assets/logo.png'

export default {
  name: 'Home',
  data: () => ({
    img
  }),
  components: {
    
  }
}
</script>
<style lang="less" scoped>
  .demo {
    font-size: 0.26rem;
    img {
      width: 1rem;
      height: auto;
    }
  }
</style>