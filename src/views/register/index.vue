<template>
  <div class="login flex-center center-items">
    <div class="login-bg">
      <div class="line">注册</div>
      <el-form :inline="false" :model="formValue" ref="numberValidateForm" class="" :rules="rules">
        <el-form-item label="" prop="account">
          <el-input v-model="formValue.account" placeholder="帐号"></el-input>
        </el-form-item>
        <el-form-item label="" prop="username">
          <el-input v-model="formValue.username" placeholder="用户名                                                                      ········"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="formValue.password" placeholder="密码" :show-password="true"></el-input>
        </el-form-item>
        <div class="text-right line">还有帐号? <a href="/login">去登录</a></div>
        <div class="flex-center">
          <el-button
            type="primary"
            class="grow-1"
            @click="submitForm('numberValidateForm')"
            >注册</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {register} from '@/service';

export default {
  name: 'Register',

  data() {
    return {
      formValue: {
        account: '',
        username: '',
        password: '',
      },

      rules: {
        account: [{ required: true, message: '请输入帐号', trigger: 'blur' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
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
          register(this.formValue).then((res) => {
            console.log(res);
            this.$router.push('/login');
            this.$message.success('注册成功！');
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
