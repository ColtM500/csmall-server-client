<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i> 后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/sys-admin/permission/admin' }">管理员管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加管理员</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="ruleForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-input v-model="ruleForm.avatar"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="description">
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="enable">
        <el-switch style="float: left;margin-top: 10px"
            v-model="ruleForm.enable"
            :active-value = "1"
            :inactive-value = "0"
            active-color="#13ce66"
            inactive-color="#ccc">
        </el-switch>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="ruleForm.roleIds" multiple placeholder="请选择" style="float: left">
          <el-option
              v-for="item in roleListOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="float: left">
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="warning" @click="$router.push('/sys-admin/permission/admin')">返回列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 角色的下拉菜单的选项数据
      roleListOptions: [ {
        "id": 1,
        "name": "系统管理员"
      },
        {
          "id": 2,
          "name": "超级管理员"
        },
        {
          "id": 3,
          "name": "商品管理员"
        },
        {
          "id": 4,
          "name": "品牌管理员"
        },
        {
          "id": 5,
          "name": "分类管理员"
        },
        {
          "id": 6,
          "name": "相册管理员"
        }
      ],
      //角色的下拉表单
      ruleForm: {
        username: 'sb1',
        password: 'wswsy',
        nickname: 'wswsy',
        avatar: 'wswsy',
        phone: '132',
        email: '123',
        description: '123',
        enable: 1,
        roleIds: '123'
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 4, max: 25, message: '长度在 4 到 25 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 4, max: 25, message: '长度在 4 到 25 个字符', trigger: 'blur'}
        ],
        nickname: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
          {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
        ],
        avatar: [
          {required: true, message: '请输入头像的URL', trigger: 'blur'},
          {min: 10, max: 255, message: '长度在 10 到 255 个字符', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {min: 8, max: 15, message: '长度在 8 到 15 个字符', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入电子邮箱', trigger: 'blur'},
          {min: 8, max: 35, message: '长度在 8 到 35 个字符', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入相册简介', trigger: 'blur'},
          {min: 2, max: 35, message: '长度在 4 到 35 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = 'http://localhost:9181/admin/add-new';
          console.log('url = ' + url);

          let formData = this.qs.stringify(this.ruleForm);
          console.log('formData = ' + formData);

          this.axios.post(url, formData).then((response) => {
            let jsonResult = response.data;
            if (jsonResult.state == 20000) {
              this.$message({
                message: '添加管理员成功！',
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
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //加载角色列表
    LoadRoleList(){
      let url = 'http://localhost:9081/roles';
      console.log('url = ' + url);

      this.axios.get(url).then((response)=>{
          let jsonResult = response.data;
          this.roleListOptions = jsonResult.data.list;
      })
    },
    //生命周期中的钩子 页加载渲染完成，自动执行的方法 进行数据初始化操作
    mounted(){
      this.LoadRoleList();
    }
  }
}
</script>

<style scoped>

</style>