<script>
import { mapState } from 'vuex';

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
  computed: {
    //由于在vue中导航栏和面包屑在不同组件中，使用vuex进行状态存储
    //这里this.$store.state.Tab.breadcrumbList可以理解为获取一个全局变量breadcrumbList用于存储面
    getTabsBreadList() {
      return this.$store.state.Tab.tabsBreadList;
    },
    //vuex提供这个方法可以获取一次性获取多个状态放进一个对象，了解一下
    // ...mapState({
    //   tabs: (state) => state.tab.tabsBreadList,
    // }),
  },
};
</script>

<template>
  <div class="header-content">
    <div class="l-content">
      <!--控制aside区的展开收起-->
      <el-button @click="handleMenu" icon="el-icon-menu" size="small"></el-button>
      <!--面包屑-->
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item v-for="tab in getTabsBreadList" :key="tab.name" :to="{ path: tab.path }">{{ tab.label }}</el-breadcrumb-item>
      </el-breadcrumb>
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

  .l-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .breadcrumb {
      margin-left: 20px;
      color: white;

      /deep/.el-breadcrumb__item {
        .is-link {
          font-weight: 400px;
          color: white;
        }
        &:last-child {
          .el-breadcrumb__inner {
            color: antiquewhite;
            font-weight: 800px;
          }
        }
      }
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    color: white;
    margin: 0 20px;
    font-size: 14px;
  }
}
</style>
