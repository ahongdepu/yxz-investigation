<template>
  <div class="tag">
    <div class="question">
      {{ detail.content }}
    </div>
    <el-input
      type="textarea"
      v-model="answer"
      :disabled="!!label"
      :autosize="{ minRows: 2, maxRows: 4 }"
      placeholder="请输入答案"
    ></el-input>
    <el-radio-group v-model="label">
      <el-radio-button label="">空白</el-radio-button>
      <el-radio-button label="不明语义"></el-radio-button>
      <el-radio-button label="不文明"></el-radio-button>
      <el-radio-button label="机器人属性"></el-radio-button>
      <el-radio-button label="baike"></el-radio-button>
    </el-radio-group>
    <div class="submit">
      <el-button
        :loading="loading"
        @click="submit"
        :type="(answer || label) && detail.id ? 'primary' : 'default'"
        :disabled="(!answer && !label) || !detail.id"
        >提交并下一题</el-button
      >
    </div>
  </div>
</template>

<script>
import { fileDetail, entrySubmit } from '@/service';

export default {
  data() {
    return {
      detail: {},
      answer: '', // 答案
      label: '', // 标签
      loading: false,
    };
  },

  created() {
    this.getDetail();
  },

  methods: {
    submit() {
      const { projectId: fileId } = this.$route.params;
      const {
        answer,
        label,
        detail: { id },
      } = this;
      this.loading = true;
      const params = { fileId, answer, label, id };
      if (label) {
        params.answer = '';
      }
      entrySubmit(params).then(() => {
        this.getDetail();
      }).finally(() => {
        this.loading = false;
      });
    },

    getDetail() {
      const { projectId } = this.$route.params;
      this.loading = true;
      fileDetail(projectId)
        .then((res) => {
          this.detail = res.data;
          this.answer = '';
          this.label = '';
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.tag {
  width: 100%;
  max-width: 960px;
  .question {
    font-size: 18px;
    font-weight: bold;
    margin: 20px 0;
    line-height: 1.2;
  }

  .el-textarea {
    display: block;
    margin: 20px 0;
  }

  .submit {
    margin: 20px auto;
    text-align: center;
  }
}
</style>
