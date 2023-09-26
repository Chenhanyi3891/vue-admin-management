<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleMenu() {
      console.log(this.$store);
      this.$store.commit('collapseMenu');
      console.log(this.$store);
    },
  },
};
</script>

<template>
  <div class="header-content">
    <div class="l-content">
      <!--控制aside区的展开收起-->
      <el-button @click="handleMenu" icon="el-icon-menu" size="small"></el-button>
      <!--面包屑-->
      <span>首页</span>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link"> 用户信息<i class="el-icon-arrow-down el-icon--right"></i> </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>客服</el-dropdown-item>
          <el-dropdown-item>会员</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header-content {
  background-color: #545c64;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  span {
    font-size: 14px;
    color: white;
    margin: 0 20px;
  }

  .el-dropdown-link {
    cursor: pointer;
  }
}
</style>
