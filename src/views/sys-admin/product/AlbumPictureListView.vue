<template>
  <div>
    <!--顶部面包屑标识与导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i> 后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{path: '/sys-admin/product/album'}">相册管理</el-breadcrumb-item>
      <el-breadcrumb-item><span>{{ album.name }}</span></el-breadcrumb-item>
    </el-breadcrumb>

    <!--图片列表-->
    <div class="tips">
      <p>
        <b>提示：</b>
        为保证较好的显示效果：请使用
        <i>宽高比为1：1</i>
        的图片,建议每张图片
        <i>不超过1MB</i>
        ,图片数量
        <i>不超过6张</i>.
      </p>
    </div>

    <div class="picture-list">
      <el-upload
          v-if="pictureList.length < 6"
          class="picture-uploader"
          action="https://localhost:9082/resources/upload/image/product"
          :show-file-list="false"
          :on-success="handleUploadSuccess"
          list-type="picture">
        <i class="el-icon-upload picture-uploader-icon"></i>
        <div class="picture-uploader-text">仅允许上传 <i>JPG</i> / <i>PNG</i> 格式的图片</div>
        <div class="picture-uploader-text">仅允许上传不超过 <i>5MB</i> 的图片</div>
      </el-upload>

      <div class="picture-item" v-for="picture in pictureList">
        <div class="cover-flag">
          <el-button class="button" @click="openSetCoverConfirm(picture)"
                     :class="picture.isCover==1 ? 'cover' : 'not-cover'" icon="el-icon-s-flag">
          </el-button>
        </div>

        <div class="delete-button" style="display: none">
          <el-button type="danger" size="mini" class="button" icon="el-icon-delete-solid"></el-button>
        </div>

        <el-image class="image"
                  :key="picture.id"
                  :src="picture.url"
                  fit="cover">
        </el-image>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //当前显示图片列表的相册数据
      album: {
        id: 0,
        name: '相册名称'
      },

      //图片列表
      pictureList: []
    }
  },

  methods: {
    //上传成功后的回调
    handleUploadSuccess(){

    },

    //打开设置封面确认框
    openSetCoverConfirm(){

    },

    //
  },

}
</script>

<style scoped>
.tips {
  background: #fcf6f6;
  border: 1px solid #aaa;
  padding: 10px 20px;
  margin-bottom: 24px;
  font-size: 12px;
}

.tips i {
  color: #F56C6C;
  font-style: normal;
}

.picture-list .picture-item {
  width: 230px;
  height: 230px;
  margin-right: 20px;
  margin-bottom: 20px;
  border: 1px solid #e8e6e6;
  border-radius: 6px;
  float: left;
  display: inline;
  position: relative;
}

.picture-list .picture-item .cover-flag {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  border-top-left-radius: 6px;
}

.picture-list .picture-item .cover-flag .button {
  background: transparent;
  border: none;
  border-top-left-radius: 6px;
  font-size: 20px;
  padding: 8px;
}

.picture-list .picture-item .cover-flag .button:hover {
  background: #fcefef;
}

.picture-list .picture-item .cover-flag .cover {
  color: #f00;
}

.picture-list .picture-item .cover-flag .not-cover {
  color: #aaa;
}

.picture-list .picture-item .delete-button {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  border-bottom-right-radius: 6px;
}

.picture-list .picture-item .delete-button .button {
  border: none;
  border-bottom-right-radius: 6px;
}

.picture-list .picture-item .image {
  width: 230px;
  height: 230px;
  border-radius: 6px;
}

.picture-list .picture-uploader {
  float: left;
  width: 230px;
  height: 230px;
  margin-right: 20px;
  margin-bottom: 20px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
}

.picture-list .picture-uploader .picture-uploader-icon {
  width: 230px;
  height: 150px;
  font-size: 58px;
  color: #8c939d;
  line-height: 150px;
  text-align: center;
}

.picture-list .picture-uploader .picture-uploader-text {
  width: 230px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  font-size: 12px;
  color: #8c939d;
}

.picture-list .picture-uploader .picture-uploader-text i {
  font-size: 12px;
  font-weight: bold;
  font-style: normal;
  color: #F56C6C;
}
</style>