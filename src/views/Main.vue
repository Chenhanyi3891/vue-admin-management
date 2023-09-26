<template>
  <div id="main">
    <el-container>
      <el-aside width="auto">
        <CommonAside />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <!--子路由-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '../components/CommonAside.vue';
import Header from '../components/Header.vue';

export default {
  data() {
    return {};
  },
  components: {
    CommonAside,
    Header,
  },
};
</script>

<style>
.el-header {
  padding: 0 0;
}
</style>
