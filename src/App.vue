<template>
  <div class="app">
    <router-view class="route-bg" />
  </div>
</template>

<script>
export default {
  data: () => ({
    navBar: [
      {label: 'home', href: ''},
      {label: 'console', href: ''},
      {label: 'network', href: ''},
      {label: 'source', href: ''},
    ]
  }),

  beforeCreate() {
    const {token} = this.$store.getters;
    const {pathname} = window.location;
    if (!token && pathname !== '/login' && pathname !== '/register') {
      this.$message.warning('请先登录');
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="less">
@import './resource/css/public.less';
@import './resource/css/global.less';
@import './resource/css/flex.less';
@import './resource/static/css/reset.min.css';

</style>
<style lang="less" scoped>
.app {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  // position: absolute;
  // left: 0;
  // right: 0;
  // top: 0;
  // bottom: 0;

  .route-bg {
    height: 100%;
  }
}
</style>
