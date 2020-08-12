
<template>
  <div class="body">
      {{msg}}
      <Demo />
      <h1 href="javascript: void(0)" @click="doThis">ggggg</h1>
  </div>
</template>

<script>
import Demo from '@/components/demo-com';
import {createNamespacedHelpers} from 'vuex';
const {mapState, mapActions} = createNamespacedHelpers('demo');

export default {
  name: 'demo',
  data: () => ({
    msg: 'hhhh',
  }),
  components: {
    Demo
  },
  computed: {
    ...mapState({
      a: state => state.a,
      b: state => state.b,
    })
  },
  methods: {
    ...mapActions([
      'foo',
    ]),
    doThis() {
      
      // eslint-disable-next-line no-undef
      console.log(this, this.$abcd, createjs)
    }
  }
}
</script>
<style lang="less" scoped>
  @import './style.less';
</style>