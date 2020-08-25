<template>
  <div class="tag-examine">

    <el-table
      :data="list"
      border
    >

      <el-table-column
        prop="userId"
        label="用户ID"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="count"
        label="标注数"
        align="center"
      >
      </el-table-column>
    </el-table>
    <div class="flex-end pagination-bg">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="total" v-if="total"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="condition.pageSize"
        layout="prev, pager, next, sizes"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {commitCount} from '@/service';
export default {
  name: 'TagCount',

  data() {
    return {
      list: [],
      condition: {
        page: 1,
        pageSize: 20,
      },
      total: 0,

      loading: false,
    }
  },

  created() {
    // this.search({page: 1});
    const {projectIds = ''} = this.$route;
    this.search(projectIds.split(','));
  },

  methods: {

    search(projectIds) {
      return commitCount({projectIds, type: 0}).then((res) => {
        console.log(2, res);
        if (res.state === 200) {
          this.list = res.data || []
        }
      })
    },

  }
}
</script>

<style lang="less" scope>
  .tag-examine {

    .options-bg {
      padding-bottom: 10px;

      .el-upload-list.el-upload-list--text {
        display: none;
      }
    }

    a.export {
      margin-left: 1em;
    }

    .pagination-bg {
      padding-top: 10px;
    }
  }
</style>
