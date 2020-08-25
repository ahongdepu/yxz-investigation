<template>
  <div class="layout flex-column flex-between">
    <div class="shrink-0 head flex-between center-items">
      <span @click="fn">学亦思Ai</span>
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
        <div class="layout-inner">
          <div class="layout-content">
            <router-view></router-view>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
    console.log();
    this.menuMap = [{}, ...menu].reduce((map, route) => {
      map[route.name] = route.father || route.path;
      return map;
    });
    console.log(1,this.menuMap);
    const {name} = this.$route;
    if (!(name in this.menuMap)) {
      this.$router.push(this.isOperator ? '/tag-list' : '/tag-manage');
    }
  },

  computed: {
    ...mapGetters(['user']),

    // 管理员
    isAdmin() { 
      const {user} = this;
      return user.roles && user.roles.indexOf('admin') !== -1;
    },

    // 批注员
    isOperator() { 
      const {user} = this;
      return user.roles && user.roles.indexOf('operator') !== -1;
    },

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
    },

    fn() {
      console.log(this.hh, this.user)
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
    .layout-inner {
      position: relative;
      background-color: white;
      width: 100%;
      height: 100%;
      position: relative;
      border-radius: 6px;
      overflow: hidden;
    }
    .layout-content {
      position: absolute;
      // padding: 10px;
      top: 10px;
      right: 10px;
      bottom: 10px;
      left: 10px;
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>
