<template>
  <div class="my-image">
    <!-- 图片按钮 -->
    <div class="img_btn">
      <img :src="value || defaultImage" @click="openDialog" alt />
    </div>
    <!-- 对话框 -->

    <el-dialog title="选择封面" :visible.sync="dialogVisible" width="700px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <el-radio-group v-model="reqParams.collect" size="mini" @change="changeCollect">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img-list">
            <div
              class="img-item"
              :class="{selected:selectedImageUrl === item.url}"
              @click="selectedImage(item.url)"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <el-pagination
            v-if="total > reqParams.per_page"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleSuccess"
            :headers="uploadHeaders"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 问题： 引用
import store from "@/store";
// defaultImage相当数据
import defaultImage from "../assets/images/default.png";
export default {
  name: "my-image",
  props: ['value'],
  data() {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      dialogVisible: false,
      //控制选中的选项卡  选项卡name的值
      activeName: "image",
      //   列表渲染
      images: [],
      total: 0,
      url: null,
      // 记录选中的图片地址
      selectedImageUrl: null,
      // 上传头部
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      //  // 记录上传的图片记录
      uploadImageUrl: null,
      // 封面图片地址
      // 主要通过import导入 webpack进行打包
      // value: defaultImage
      defaultImage
    };
  },
  created() {
    // 获取素材列表
    this.getImages();
  },
  methods: {
    // 确认图片 （点击确认按钮）
    confirmImage() {
      // 判断显示的时那个图片
      // 让图片按钮能够显示你选中的或/上床的图片地址
      if (this.activeName === "image") {
        // 选中的图片
        // this.value = this.selectedImageUrl;
        this.$emit('input',this.selectedImageUrl)
      } else {
        // 上传图
        // this.value = this.uploadImageUrl;
        this.$emit('input',this.uploadImageUrl)
      }
      this.dialogVisible = false;
    },

    // // 成功上传图片
    handleSuccess(res) {
      this.uploadImageUrl = res.data.url;
    },
    // 选中图片
    selectedImage(url) {
      this.selectedImageUrl = url;
    },
    // 分页
    changePager(newPage) {
      this.reqParams.page = newPage;
      this.getImages();
    },
    // 切换收藏
    changeCollect() {
      this.reqParams.page = 1;
      this.getImages();
    },
    openDialog() {
      this.dialogVisible = true;
      // 清空之前选中的或上传图的地址
      this.selectedImageUrl = null;
      this.uploadImageUrl = null;
      //   获取素材数据列表
      this.getImages();
    },
    async getImages() {
      const {
        data: { data }
      } = await this.$http.get("user/images", { params: this.reqParams });
      this.images = data.results;
      this.total = data.total_count;
    }
  }
};
</script>

<style scoped lang="less">
.my-image {
  display:inline-block;
  padding-right: 20px; 
}
.img_btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}
.img-list {
  margin-top: 10px;
}
.img-item {
  position: relative;
  width: 148px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 10px;
  &.selected {
    &::after {
      // .img-item.selected::after{} 伪元素必须要有content:''
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
        no-repeat center / 50px 50px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.el-pagination {
  padding-bottom: 0;
}
</style>
