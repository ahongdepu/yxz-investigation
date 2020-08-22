<template>
  <div class="tag-examine">
    <div class="options-bg">
      <el-upload
        :multiple="false"
        name="file"
        :action="uploadUrl"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :headers="{Authorization}"
      >
        <el-button :loading="loading" size="small" type="primary">文件上传</el-button>
      </el-upload>
    </div>

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
          <a :href="`/tag-examine/${scope.row.id}`" type="text" size="small">审核</a>
          <a href="javascript: void(0);" class="export" @click="exportFile(scope.row.id)" type="text" size="small">导出</a>
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
import {fileList, exportFile} from '@/service';
import {baseUrl} from '@/utils/ajax';
import { mapGetters } from 'vuex';
export default {
  name: 'TagManage',

  data() {
    return {
      list: [],
      condition: {
        page: 1,
        pageSize: 20,
      },
      total: 0,
      uploadUrl: `${baseUrl}/data/entry/file/upload`,

      loading: false,
    }
  },

  created() {
    this.search({page: 1});
  },

  computed: mapGetters({
    Authorization: 'token',
  }),

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

    handleCurrentChange(page) {
      this.search({page})
    },

    beforeUpload(file) {
      console.log(file);
      const {name} = file;
      const suffix = name.substring(name.lastIndexOf('.') + 1);
      console.log(suffix);
      if (suffix !== 'excel' && suffix !== 'xlsx') {
        this.$message.warning('请选择 excel 或 xlsx 格式的文件！');
        return false;
      }
      this.loading = true;
    },

    uploadSuccess(res, file) {
      console.log(res, file);
      this.$message.success('文件上传成功！');
      this.loading = false;
      this.search({page: 1});
    },

    uploadError(err) {
      console.log(err);
      this.$message.error('文件上传失败');
      this.loading = false;
      // this.$message.error(err)
    },

    // 导出结果
    exportFile(fileId) {
      if (!fileId) {return;}
      this.exportLoad = true;
      exportFile(fileId).then((res) => {
        console.log(0, res);
        this.$message.success('导出成功！')
      }).finally(() => {
        this.exportLoad = false;
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
