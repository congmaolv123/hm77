<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="btn_box">
        <el-radio-group v-model="reaParams.collect" size="small" @change="changeCollect">
          <el-radio-button label="false">全部</el-radio-button>
          <el-radio-button label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="small" style="float:right;" @click="openDialog()">添加素材</el-button>
      </div>
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="foot" v-show="!reaParams.collect">
            <span
              class="el-icon-star-off"
              @click="toggleCollect(item)"
              :class="{selected:item.is_collected}"
            ></span>
            <span class="el-icon-delete" @click="deleteImage(item.id)"></span>
          </div>
        </div>
      </div>
      <el-pagination
        v-if="total > reaParams.per_page"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reaParams.per_page"
        :current-page="reaParams.page"
        @current-change="changePager"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleSuccess"
        :headers="uploadHeaders"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from "@/store";
export default {
  data() {
    return {
      reaParams: {
        // 默认值 全部
        collect: false,
        page: 1,
        per_page: 10
      },
      //   图片列表数据
      images: [],
      // 总条数
      total: 0,
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 上传成功后的图片地址 默认为空null
      imageUrl: null,
      // 上传组件的头部信息
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    };
  },
  created() {
    //   获取素材列表
    this.getImages();
  },
  methods: {
    // 删除
    deleteImage(id) {
      this.$confirm("老铁，此操作将永久删除该素材, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`user/images/${id}`);
          this.$message.success("删除成功");
          this.getImages();
        })
        .catch(() => {});
    },
    // // 添加收藏 取消收藏
    async toggleCollect(item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      });
      // 1.提示
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      // 2.更新当前图片状态
      item.is_collected = data.collect
    },
    // 上传成功的函数
    handleSuccess(res) {
      // 1.获取图片地址img显示标签
      // console.log(res)
      this.imageUrl = res.data.url;
      // 2.提示上传成功
      this.$message.success("上传成功");
      // 3.过2秒关闭对话框 ，更新列表
      // 定时器
      window.setTimeout(() => {
        this.dialogVisible = false;
        this.reaParams.page = 1;
        this.getImages();
      }, 2000);
    },
    // 打开对话框
    openDialog() {
      // 打开前要清空
      this.images = null;
      this.dialogVisible = true;
    },
        changeCollect () {
          this.reaParams.page = 1
          this.getImages()
        },
      changePager(newPage) {
        this.reaParams.page = newPage;
        this.getImages();
      },
    async getImages() {
      const {
        data: { data }
      } = await this.$http.get("user/images", { params: this.reaParams });
      this.images = data.results;
    },
  }
};
</script>

<style scoped lang='less'>
.img_list {
  margin-top: 20px;
  .img_item {
    width: 155px;
    height: 155px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 15px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .foot {
      position: absolute;
      width: 100%;
      height: 30px;
      line-height: 30px;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      text-align: center;
      span {
        margin: 0 20px;
        &.selected {
          color: red;
        }
      }
    }
  }
}
</style>
