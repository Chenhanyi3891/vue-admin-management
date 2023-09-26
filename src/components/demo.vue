<script setup>
import { ref } from 'vue';
</script>

<template>
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
    <h3>通用后台管理系统</h3>
    <!-- 1级菜单，if 判断两类型 -->
    <div v-for="item in menuData" :key="item.name">
      <!--无子导航-->
      <el-menu-item @click="clickMenu(item)" v-if="!item.children" :index="item.name">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>

      <!--有子导航-->
      <el-submenu v-else :index="item.name">
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span>{{ item.label }}</span>
        </template>

        <!-- 二级菜单 if 判断两类型 -->
        <el-menu-item-group v-for="subItem in item.children">
          <el-menu-item @click="clickMenu(subItem)" :index="subItem.name">{{ subItem.label }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </div>
  </el-menu>
</template>

<style></style>
