<template>
  <div class="layout flex-column flex-between">
    <div class="shrink-0 head flex-between center-items">
      <span>学亦思Ai</span>
      <span>hello, {{user.username}} </span>
      <el-button type="text" class="" @click="logout">退出</el-button>
    </div>
    <div class="flex-between grow-1">
      <el-menu 
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        class="shrink-0"
        :router="true"
        @select="select"
        :default-active="menuMap[$route.name]"
      >
        <template v-if="isAdmin">
          <el-menu-item index="/tag-manage">
            <i class="el-icon-menu"></i>
            <span slot="title">批注审批</span>
          </el-menu-item>
        </template>

        
        <template v-if="isOperator">
          <el-menu-item index="/tag-list">
            <i class="el-icon-menu"></i>
            <span slot="title">批注文件</span>
          </el-menu-item>
        </template>

      </el-menu>

      <div class="grow-1 layout-outer">
        <div class="layout-content">
          <router-view></router-view>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import {logout} from '@/service';

import {menu} from '@/router';

export default {
  name: 'Layout',

  data() {
    return {
      active: 'tag-list',
      menuMap: {},
    }
  },

  created() {
    console.log(this.$route);
    this.menuMap = [{}, ...menu].reduce((map, route) => {
      map[route.name] = route.father || route.path;
      return map;
    });
    console.log(this.menuMap);
  },

  computed: {
    ...mapState({
      // isAdmin: state => state.user.roles && state.user.roles.indexOf('admin') !== -1, // 管理员
      // isOperator: state => state.user.roles && state.user.roles.indexOf('operator') !== -1, // 批注员
      isAdmin: state => !!state, // 管理员
      isOperator: state => !!state, // 批注员
      // user: state => state.user,
    }),
    ...mapGetters(['user'])
  },

  methods: {
    logout() {
      logout();
      this.$message.success('已退出！');
      this.$router.push('/login');

    },

    select(index) {
      console.log(index);
      this.active = index
    }
  }
}
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  .head {
    height: 40px;
    background-color: #545c64;
    color: white;
    font-size: 16px;
    padding: 0 20px;
  }

  .layout-outer {
    padding: 10px;
    background-color: #e6e6e6;
    .layout-content {
      background-color: white;
      width: 100%;
      height: 100%;
      padding: 10px;
      border-radius: 6px;
    }
  }
}
</style>
