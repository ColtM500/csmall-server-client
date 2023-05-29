<template>
  <div>
    <!-- 顶部面包屑标识与导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i> 后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <!-- 操作区域 -->
    <div style="margin: 0 0 20px 0;">
      <el-button type="primary" size="medium" style="float: left"
                 @click="$router.push('/sys-admin/permission/admin/add-new')">添加管理员
      </el-button>
    </div>

    <!-- 数据表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="60" align="center"></el-table-column>
      <el-table-column label="头像" width="60" align="center">
        <template slot-scope="scope">
          <el-avatar :size="30" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="120" header-align="center"
                       :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="100" header-align="center"
                       :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="phone" label="手机号码" width="120" align="center"
                       :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="email" label="电子邮箱" width="150" header-align="center"
                       :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="description" label="简介" header-align="center"
                       :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="是否启用" width="120" align="center">
        <template slot-scope="scope">
          <el-switch
              @change="toggleEnable(scope.row)"
              v-model="scope.row.enable"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#999">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle size="mini"
                     @click="openEditDialog(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini"
                     @click="openDeleteConfirm(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页控件 -->
    <div style="text-align: right; margin: 10px auto;">
      <el-pagination
          @current-change="changePage"
          layout="total, prev, pager, next"
          :total="total"
          :current-page="currentPage"
          :page-size="pageSize">
      </el-pagination>
    </div>

  </div>

</template>

<script>
export default {
  data(){
    return {
      //表格数据
      tableData:[],
      //分页相关数据
      total: 0,
      pageSize: 20,
      pageCount: 1,
      currentPage: this.$router.currentRoute.query.page ? parseInt(this.$router.currentRoute.query.page) : 1,
    }
  },
  methods:{
    toggleEnable(){

    },
    openEditDialog(){

    },
    openDeleteConfirm(){

    },
    // 切换分页
    changePage(page) {
      this.$router.replace('?page=' + page);
      this.loadAdminList();
    },
    //加载管理员列表
    loadAdminList() {
      let page = this.$router.currentRoute.query.page;
      if (!page) {
        page = 1;
      }

      let url = 'http://localhost:9181/admin/list?page=' + page;
      console.log('url = ' + url);

      //携带JWT
      let localJwt = localStorage.getItem('localJwt')

      this.axios
          //在请求里将localJwt带出去 为了带特殊的请求头参数 要创建一个新的axios对象 故用create()其返回值还是axios
          .create({
            'headers':{//因为加了这个复杂请求头 浏览器中预检不会通过 所以要在后端配置文件中增加跨域的
              'Authorization': localJwt
            }
          })
          .get(url)
          .then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.tableData = jsonResult.data.list;
          this.currentPage = jsonResult.data.currentPage;
          this.pageSize = jsonResult.data.pageSize;
          this.total = jsonResult.data.total;
        }
      });
    }
  },

  mounted() {
    this.loadAdminList();
  }

}
</script>

<style scoped>

</style>