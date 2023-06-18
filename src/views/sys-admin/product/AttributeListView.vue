<template>
  <div>
    <!-- 顶部面包屑标识与导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/sys-admin' }">
        <i class="el-icon-s-promotion"></i> 后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>属性管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <!--操作区域-->
    <div style="margin: 0 0 20px 0;">
      <el-select v-model="templateId" placeholder="请选择属性模板" style="width: 300px;"
                 @change="loadAttributeList()">
        <el-option
            v-for="item in attributeTemplateListOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
      <el-button type="primary" size="medium" style="margin-left:20px;"
                 @click="$router.push('/sys-admin/product/attribute/add-new')">添加属性
      </el-button>
    </div>

    <!-- 数据表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="60" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" width="120" align="center"
                       :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="description" label="简介" align="center"
                       :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="类型" width="100" align="center">
        <template slot-scope="scope">
          <span v-text="typeText[scope.row.type]"></span>
        </template>
      </el-table-column>
      <el-table-column label="输入类型" width="100" align="center">
        <template slot-scope="scope">
          <span v-text="inputTypeText[scope.row.inputType]"></span>
        </template>
      </el-table-column>
      <el-table-column prop="valueList" label="备选值列表" width="180" align="center"
                       :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="unit" label="计量单位" width="80" align="center"></el-table-column>
      <el-table-column prop="sort" label="排序序号" width="80" align="center"></el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" circle
                     @click="openEditDialog(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" circle
                     @click="openDeleteConfirm(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>