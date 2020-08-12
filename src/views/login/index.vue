<template>
  <div class="login flex-center center-items">
    <div class="login-bg">
      <div class="line">登录</div>
      <el-form :inline="false" :model="formValue" ref="numberValidateForm" class="" :rules="rules">
        <el-form-item label="" prop="account">
          <el-input v-model="formValue.account" placeholder="帐号"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="formValue.password" placeholder="密码" :show-password="true"></el-input>
        </el-form-item>
        <div class="text-right line">还没帐号? <a href="/register">去注册</a></div>
        <div class="flex-center">
          <el-button
            type="primary"
            class="grow-1"
            @click="submitForm('numberValidateForm')"
            >登录</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {login} from '@/service';

export default {
  name: 'Login',

  data() {
    return {
      formValue: {
        account: '',
        password: '',
      },

      rules: {
        account: [{ required: true, message: '请输入帐号', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '长度在至少 6 个字符', trigger: 'blur' },
        ],
      },
    };
  },

  components: {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.formValue).then((res) => {
            console.log(res);
            if (res.state === 200) {
              this.$router.push('/tag-list');
            }
          })
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  background-color: #0080ff;
  font-size: 14px;
  .login-bg {
    width: 100%;
    max-width: 280px;
    background-color: white;
    border-radius: 6px;
    padding: 24px;
    box-sizing: border-box;
    // text-align: center;

    .line {
      margin-bottom: 20px;
    }
  }
}
</style>
