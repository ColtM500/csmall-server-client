<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i> 后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/sys-admin/product/album' }">相册管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加相册</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="description">
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="排序序号" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="warning" @click="$router.push('/sys-admin/product/album')">返回列表</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {},
      rules: {
        name: [],
        description: [],

      },
      sort: []
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = 'http://localhost:9180/album/add-new';
          console.log('url = ' + url);

          // let formData = 'name=' + this.ruleForm.name
          //    + '&description=' + this.ruleForm.description
          //    + '&sort=' + this.ruleForm.sort;
          let formData = this.qs.stringify(this.ruleForm);
          console.log('formData = ' + formData);

          this.axios.post(url, this.ruleForm).then((response) => {
            let jsonResult = response.data;
            console.log(response)
            if (jsonResult.state == 20000) {
              this.$message({
                message: '添加相册成功！',
                type: 'success'
              });
              this.resetForm(formName);
            } else {
              this.$alert(jsonResult.message, '错误', {
                confirmButtonText: '确定',
                callback: action => {
                }
              });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>

</style>