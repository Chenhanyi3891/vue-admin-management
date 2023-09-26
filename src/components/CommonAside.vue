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
          <el-menu-item @click="clickMenu(child)" :index="child.name">{{ child.label }}</el-menu-item>
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
import tab from '@/store/tab';

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
          path: '/other',
          children: [
            {
              path: '/other/page1',
              name: 'page1',
              label: '其他1',
              icon: 'setting',
              url: 'Other/PageOne',
            },
            {
              path: '/other/page2',
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
    getCurrentBreadcrumbData(currentPath) {
      //这里将当前路径进行切分
      //如“/other/otherPage1” 转换成数组["other","otherPage1"]
      const currentPathSplit = currentPath.path.split('/').filter((c) => !!c);
      //二次转换，把除了一级节点之后的节点都拼接上之前的节点
      //["other","otherPage1"] 转成 ["other","other/otherPage1"]
      currentPathSplit.forEach((c, i) => {
        if (i) {
          currentPathSplit[i] = currentPathSplit[i - 1] + '/' + c;
        } else {
          currentPathSplit[i] = '/' + currentPathSplit[i];
        }
      });

      //初始化一个面包屑列表，默认包含首页tab
      const newBreadTabs = [
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home',
        },
      ];
      //导航栏menuData可以看成一棵树，每个数据可以看作一个节点
      let Tree = this.menuData;
      currentPathSplit.forEach((c) => {
        console.log(c);
        //匹配path，获取menu tab
        const findItem = Tree.find((tab) => tab.path == c);
        if (findItem) {
          //放进面包屑列表中
          newBreadTabs.push(findItem);
          //匹配到导航栏的节点之后，如果有chilren节点，则把这个chilren节点赋值给Tree，下次遍历就是去新的Tree里匹配
          if (findItem.children) {
            Tree = findItem.children;
          }
        }
      });
      //console.log('newBreadTabs', newBreadTabs);
      return newBreadTabs;
    },

    //点击跳转页面
    clickMenu(item) {
      //console.log(item);
      //console.log(this.$route);
      //使用router
      if (this.$route.path == item.path || (this.$route.path == '/home' && item.path == '/')) {
        return;
      }
      this.$router.push(item.path);
      //更新面包屑list全局数据-这样面包屑数据才能被面包屑导航栏读取到展示和更新
      const newBreadTabs = this.getCurrentBreadcrumbData(item);
      this.$store.commit('addBreadTabs', newBreadTabs);
    },
    isCollapse() {
      return this.$store.state.Tab.isCollapse;
    },
  },
};
</script>
