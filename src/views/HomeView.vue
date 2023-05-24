<template>
  <div>
    <!-- 整个容器 -->
    <el-container>
      <!-- 上半部分：顶栏 -->
      <el-header class="layout-header">
        <!-- 显示当前登录的用户信息 -->
        <div class="login-user">
          <span class="welcome">欢迎回来，root！</span>
          <el-dropdown>
            <el-avatar src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                       size="small"></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus">修改资料</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus">修改头像</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus-outline">修改密码</el-dropdown-item>
              <el-dropdown-item icon="el-icon-check" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 左侧的标题文字 -->
        <h1>二手手机回收运营平台</h1>
      </el-header>
      <!-- 下半部分 -->
      <el-container class="layout-body">
        <!-- 下半部分的左侧：侧边栏 -->
        <el-aside class="layout-aside">
          <el-menu
              router
              :default-active="activeMenuItemPath"
              class="el-menu-vertical-demo"
              background-color="#222"
              text-color="#fff"
              active-text-color="#fff">
            <!-- 首页 -->
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <!-- 商品管理 -->
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item index="2-1">
                <i class="el-icon-menu"></i>
                <span slot="title">SPU台账</span>
              </el-menu-item>
              <el-menu-item index="2-2">
                <i class="el-icon-menu"></i>
                <span slot="title">新增SPU</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/product/album">
                <i class="el-icon-menu"></i>
                <span slot="title">相册管理</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/product/category">
                <i class="el-icon-menu"></i>
                <span slot="title">商品类别</span>
              </el-menu-item>
              <el-menu-item index="2-5">
                <i class="el-icon-menu"></i>
                <span slot="title">属性模板</span>
              </el-menu-item>
              <el-menu-item index="2-6">
                <i class="el-icon-menu"></i>
                <span slot="title">属性管理</span>
              </el-menu-item>
              <el-menu-item index="2-7">
                <i class="el-icon-menu"></i>
                <span slot="title">品牌管理</span>
              </el-menu-item>
            </el-submenu>
            <!-- 订单管理 -->
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item index="3-1" disabled>
                <i class="el-icon-menu"></i>
                <span slot="title">暂无内容</span>
              </el-menu-item>
            </el-submenu>
            <!-- 权限管理 -->
            <el-submenu index="53">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item index="/sys-admin/permission/admin">
                <i class="el-icon-menu"></i>
                <span slot="title">管理员管理</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 下半部分的右侧：主体 -->
        <el-main class="layout-main">
          <!-- 将由其它视图组件来显示 -->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeMenuItemPath: ''
    };
  },
  methods: {
    handleActiveMenuItem() {
      let currentPath = this.$router.currentRoute.path;
      if (currentPath.startsWith('/sys-admin/product/album')) {
        currentPath = '/sys-admin/product/album';
      }
      if (currentPath.startsWith('/sys-admin/permission/admin')) {
        currentPath = '/sys-admin/permission/admin';
      }
      this.activeMenuItemPath = currentPath;
    }
  },
  created() {//类似于 AlbumController controller = new AlbumController(); 界面vue对象已经创建好了
  },
  mounted() {//类似于 controller.setService(albumService) 相关的数据已经准备好了
    this.handleActiveMenuItem();
  }
}
</script>

<style>
.layout-header {
  background: #2c3e50;
  margin-left: -3px;
  margin-right: -5px;
}

.layout-header h1 {
  line-height: 20px;
  margin-left: -50%;
  color: #fff;
}

.layout-header .login-user {
  float: right;
  display: flex;
  margin-top: 10px;
}

.layout-header .login-user .welcome {
  line-height: 25px;
  color: #fff;
}

.layout-body {
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
}

.layout-aside {
  background: #222;
  margin-left: 5px;
  text-align: left;
}

.layout-aside .el-menu {
  border: 0;
}

.layout-aside i {
  color: #fff !important;
}

.el-menu-item.is-active {
  background: #2c3e50 !important;
}

.layout-main {

}
</style>