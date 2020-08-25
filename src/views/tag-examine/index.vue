<template>
  <div class="tag-examine flex-column">
    <div class="options-bg shrink-0">
      <el-button type="primary" :loading="loading" @click="openModal" :disabled="!idList.length">批量审核</el-button>
      <el-button type="primary" :loading="exportLoad" @click="exportFile">导出结果</el-button>
    </div>
    <div class="table-bg grow-1">
      <el-table
        :data="list"
        ref="table"
        border
        row-key="id"
        @selection-change="handleSelectionChange">
        class="123"
      >
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="content"
          label="问题"
          align="center"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          prop="answer"
          label="答案"
          align="center"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          prop="label"
          label="标签"
          align="center"
          width="160"
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
    <el-dialog
      title="批量审核"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>是否通过审核？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button :loading="loading" @click="batch(1)" type="danger">不通过</el-button>
        <el-button :loading="loading" type="primary" @click="batch(2)">通 过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {examineList, batch, exportFile} from '@/service';
export default {
  name: 'TagExamine',

  data() {
    return {
      list: [{
        "answer": "string",
        "content": "string",
        "id": 0,
        "label": "string"
      }],
      condition: {
        page: 1,
        pageSize: 20,
      },
      total: 0,

      idList: [], // 选中项

      loading: false,
      exportLoad: false, // 导出loading

      dialogVisible: false,
    }
  },

  created() {
    this.search({page: 1});
  },

  methods: {

    search(payload = {}) {
      const { projectId } = this.$route.params;
      if (!projectId) {this.$router.goBack();}
      return examineList({...this.condition, ...payload, projectId}).then((res) => {
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

    handleSelectionChange(val) {
      this.idList = val.map(e => e.id);
    },

    // 批量审核
    batch(result) {
      const { projectId: fileId } = this.$route.params;
      const {idList} = this;
      if (!idList || !idList.length) {
        return this.$message.warning('请先选择要审核问题');
      }
      batch({result, fileId, idList}).then(() => {
        this.$message.success('提交成功！');
        this.search();
        this.$refs.table && this.$refs.table.clearSelection && this.$refs.table.clearSelection();
      }).finally(() => {
        this.loading = false;
        this.dialogVisible = false;
      })
    },

    // 打开modal
    openModal() {
      const {idList} = this;
      if (!idList || !idList.length) {
        return this.$message.warning('请先选择需要审批的问题！')
      }
      this.dialogVisible = true;
    },

    // 导出结果
    exportFile() {
      const { projectId: fileId } = this.$route.params;
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
    height: 100%;
    .pagination-bg {
      padding-top: 10px;
    }

    .options-bg {
      padding-bottom: 10px;
    }

    .table-bg {
      overflow-y: auto;
      padding-bottom: 40px;
    }
  }
</style>
