<template>
  <!-- clearable 清空功能 -->
  <el-select clearable :value="value" @change="fn" placeholder="请选择">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
// 子组件
// 计算机属性监听
// watch: {
//   // 计算机属性使用场景：当你需要一个新数据，需要依赖data中的数据
//   // 侦听器使用场景：watch当需要监听一个属性的变化，去做一些开销较大的操作（异步操作）向后台发送请求
//   'reqParams.channel_id': function (newVal, oldVal) {
//     if(newVal === '') {
//       reqParams.channel_id = null
//     }
//   }
// },
// 注意事项：当清空内容时，值为空字符，处理为null
export default {
name: 'my-channel',
props: [ 'value' ],
  // 申明数据 （没有数据）
  data() {
    return {
      // 组件内部的值 为null
    //   myValue: null,
      channelOptions: []
    };
  },
  // 钩子函数
  created() {
    // 获取下拉选项数据
    this.getChannelOptions();
  },
  methods: {
    async getChannelOptions() {
      const {
        data: { data }
      } = await this.$http.get("channels");
      // 重新赋值
      this.channelOptions = data.channels;
    },
    fn (val) {
        // 空字符处理为null
        if(val === '') val = null
        // 数据提交给父组件使用
        this.$emit('input', val)
    }
  }
};
// 对频道功能进行封装 集体整理
</script>

<style csoped lang='less'>
</style>
