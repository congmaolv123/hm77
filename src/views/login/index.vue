<template>
  <div class="container">
    <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- element-ui  组件--表单   :rules="loginRules 绑定数据-->
      <el-form ref="loginForm" :model="loginform" :rules="loginRules" status-icon>
        <!-- 表单项 el-form-item  ☞指一个属性 prop：字段名称-->
        <el-form-item prop="mobile">
          <el-input v-model="loginform.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginform.code"
            placeholder="请输验证码"
            style="width:188px;margin-right:10px;"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <!-- :value="true" 设置选中 -->
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data() {
    // 申明自定义校验函数
    const checkMobile = (rule, value, callback) => {
      // 校验手机号 1开头 第二位3-9 9为数字
      if (/^1[3-9]\{9}$/.test(value))
        return callback(new Error("手机格式不对"));
      callback();
    };
    return {
      // 表单对象数据
      loginform: {
        mobile: "13911111111",
        code: "246810"
      },
      // 表单校验规则数据
      loginRules: {
        mobile: [
          //               提示信息            失去焦点后校验
          { required: true, message: "请输入手机号", trigger: "blur" },
          // 自定义
          { validator: checkMobile, trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { len: 6, message: "长度为6位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      // 对整个表单进行验证
      this.$refs.loginForm.validate( async valid => {
        if (valid) {
            console.log(this.loginform);
            
          // // 请求登录接口
          // this.$http
          //   .post(
          //     "http://ttapi.research.itcast.cn/mp/v1_0/authorizations",
          //     this.loginform
          //   )
          //   .then(res => {
          //     // res 响应对象   包含响应主体
          //     // 存储用户信息sessionStorage
          //     store.setUser(res.data.data)
          //     console.log(res.data);
          //     // 跳转去首页
          //     this.$router.push("/");
          //   })
          //   .catch(() => {
          //     // 错误提示提示
          //     this.$message.error("手机号或验证码错误");
          //   });
          
          // 使用async与await写法  处理错误try{}catch(e){} js写法 捕获异常
          try{
          const { data: { data }} = await this.$http.post('authorizations', this.loginform)
          // 存储用户信息
          store.setUser(data)
          this.$router.push("/");
          }catch(e) {
            this.$message.error('手机号或者验证码错误')
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="less" >
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  /* cover 上下水平居中 */
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
}
.my-card {
  width: 400px;
  height: 350px;
  border-radius: 5%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);
  img {
    display: block;
    width: 180px;
    margin: 0 auto 30px;
  }
}
</style>
