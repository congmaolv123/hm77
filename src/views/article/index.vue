<template>
  <div class="container">
    <!-- 筛选条件 -->
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- 使用自己的组件 -->
          <!-- v-model 后边 :value @input -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeData"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到{{ total }}条结果</div>
      <!-- 表格组件 -->
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" fit="cover" style="width:120px;height:80px">
              <div slot="error">
                <img src="../../assets/images/error.gif" style="width:120px;height:80px" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button plain type="primary" @click="edit(scope.row.id)" icon="el-icon-edit" circle></el-button>
            <el-button plain type="danger" @click="del(scope.row.id)" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div style="text-align:center;margin-top:30px">
        <!-- :total="1000" 指定总条数  默认一行显示10条  page-size设置每行默认显示条数-->
        <!-- @current-change="changePager"页面改变事件
         当更新数据后，当前页面页需要修改，然后选中跳转到对应的按钮 
        解决方法： :current-page="reqParams.page"-->
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          :total="total"
          @current-change="changePager"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// 父组件 
export default {
  // components: { MyTest , Bread },
  data() {
    return {
      // 筛选项表单数据  提交给后台参数
      // axios 提交的数据 值为null是不会携带参数
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 频道下拉选项数据 申明数据
      // channelOptions: [],
      // 日期数据
      dateArr: [],
      // 文章列表
      articles: [],
      // 总条数
      total: 0
    };
  },

  // 钩子函数
  created() {
    // 获取文章列表数据
    this.getArticles();
  },
  methods: {
    // 编辑函数
    edit (id) {
      // 只做跳转
      this.$router.push('/publish?id=' + id)
    },
    // 删除函数
    del (id) {
      // 弹出确认框 /点击确认后 发删除请求 响应成功更新列表即可
       this.$confirm('此操作将永久删除该文件, 是否继续?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
       }).then(async () => {
        //  点击确认
         await thsi.$http.delete(`articles/${id}`)
         this.$message.success('删除文章成功！')
         this.getArticles()
       }).catch(() => {})
    },
    //日期选择后的事件
     changeData (dateArr) {
      //  如果dateArr不为null
      if (dateArr) {
        // 有值设置两个值，，没值清空
        this.reqParams. begin_pubdate = dateArr[0]
        this.reqParams. end_pubdate = dateArr[1]
      } else {
        // 清空数据
          this.reqParams. begin_pubdate = null
          this.reqParams. end_pubdate = null
      }
     },

    // 点击筛选函数
    search () {
      // 筛选项都是双向绑定 拿对应的数据发送请求即可  注意事项：重新筛选后页码第一页
      this.reqParams.page = 1
      this.getArticles();
    },
    // 点击分页对应函数
    changePager (newpage) {
      // 修改最新的页数
      this.reqParams.page = newpage
      this.getArticles();
    },
    async getArticles() {
      // 获取文章列表数据
      // axios get传参 第二传参是对象 {params:指定传参对象} 发送请求时会自动拼接地址栏后  this.reqParams请求传参
      const {
        data: { data }
      } = await this.$http.get("articles", { params: this.reqParams });
      // 列表数据
      this.articles = data.results;
      // 总条数据
      this.total = data.total_count;
    }
  }
};
</script>

<style scoped lang='less'>
.el-card {
  margin-bottom: 20px;
}
</style>
