<template>
  <div id="common-aside">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse()"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <h3>{{ isCollapse() ? '后台' : '通用后台管理系统' }}</h3>

      <!--无子导航-->
      <el-menu-item @click="clickMenu(item)" v-for="item in noChildren()" :index="item.name">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>

      <!--有子导航-->
      <el-submenu v-for="item in hasChildren()" :index="item.name">
        <template slot="title">
          <i class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </template>

        <el-menu-item-group v-for="child in item.children">
          <el-menu-item :index="child.name">{{ child.label }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu {
  border: none;
  height: 100vh;
  h3 {
    color: white;
    text-align: center;
    margin-top: 10px;
    font-size: 16px;
    font-weight: 400px;
    height: 40px;
    line-height: 40px;
  }
}
</style>

<script>
export default {
  name: 'CommonAside',
  data() {
    return {
      menuData: [
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home',
        },
        {
          path: '/mall',
          name: 'mall',
          label: '商品管理',
          icon: 'video-play',
          url: 'MallManage/MallManage',
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user',
          url: 'UserManage/UserManage',
        },
        {
          label: '其他',
          name: 'other',
          icon: 'location',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '其他1',
              icon: 'setting',
              url: 'Other/PageOne',
            },
            {
              path: '/page2',
              name: 'page2',
              label: '其他2',
              icon: 'setting',
              url: 'Other/PageTwo',
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    //点击跳转页面
    clickMenu(item) {
      console.log(this.$route.path);
      //使用router
      if (this.$route.path == item.path || (this.$route.path == '/home' && item.path == '/')) {
        return;
      }
      this.$router.push(item.path);
    },
    isCollapse() {
      //console.log(this.$store.state.Tab.isCollapse);
      return this.$store.state.Tab.isCollapse;
    },
  },
};
</script>
