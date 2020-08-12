<template>
  <div class="tag-list">
    <el-table
      :data="list"
      border
    >
      <el-table-column
        prop="id"
        label="文件ID"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="文件名"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="id"
        label="操作"
        align="center"
        width="180"
      >
        <template slot-scope="scope">
          <a :href="`/tag-detail/${scope.row.id}`" type="text" size="small">标注</a>
        </template>
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
import {fileList} from '@/service';
export default {
  data() {
    return {
      list: [],
      condition: {
        page: 1,
        pageSize: 20,
      },
      total: 0,
    }
  },

  created() {
    this.search({page: 1});
  },

  methods: {

    search(payload = {}) {
      return fileList({...this.condition, ...payload}).then((res) => {
        console.log(2, res);
        const {dataList, page, pageSize, total} = res.data;
        this.list = dataList;
        this.total = total;
        this.condition.page = page;
        this.condition.pageSize = pageSize;
      })
    },

    handleSizeChange(pageSize) {
      this.search({page: 1, pageSize})
    },

    handleCurrentChange(...e) {
      console.log(e)
    }
  }
}
</script>

<style lang="less" scope>
  .tag-list {
    .pagination-bg {
      padding-top: 10px;
    }
  }
</style>
