<template>
  <div>
    <!-- <h1>我是Home</h1> -->
    <el-row>
      <el-col :span="8" style="padding-right: 10px">
        <el-card class="box-card" shadow="hover">
          <div class="user">
            <img src="../assets/images/2020022708453463508.jpg" alt="头像" />
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登陆时间:<span>2023-09-25</span></p>
            <p>上次登陆地点:<span>北京</span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 20px" shadow="hover">
          <!--总览table-->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column v-for="(value, key) in tableLabel" :prop="key" :label="value"> </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="padding-left: 10px">
        <!--订单数总览-->
        <div class="num">
          <el-card class="box-card2" v-for="item in orders" :key="item.name" shadow="hover" :body-style="{ display: 'flex', padding: 0 }">
            <i :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
            <div class="detail">
              <p class="price">¥{{ item.value }}</p>
              <p>{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 280px" shadow="hover">
          <!--折线图-->
          <div ref="echarts1" id="echarts1" style="width: 600px; height: 300px"></div>
        </el-card>
        <div class="graphs">
          <el-card style="height: 240px" shadow="hover">
            <div ref="echarts2" style="height: 260px"></div>
          </el-card>
          <el-card style="height: 240px" shadow="hover">
            <div ref="echarts3" style="height: 200px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from '../api';
import * as echarts from 'echarts';

export default {
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: '品牌',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买',
      },
      orderData: [],
      orders: [
        {
          name: '今日支付订单',
          value: 100,
          icon: 'success',
          color: '#C7EDCC',
        },
        {
          name: '今日收藏订单',
          value: 300,
          icon: 'star-on',
          color: '#FAF9DE',
        },
        {
          name: '今日未支付订单',
          value: 500,
          icon: 's-goods',
          color: '#DCE2F1',
        },
        {
          name: '本月支付订单',
          value: 180,
          icon: 'success',
          color: '#C7EDCC',
        },
        {
          name: '本月收藏订单',
          value: 1000,
          icon: 'star-on',
          color: '#FAF9DE',
        },
        {
          name: '本月未支付订单',
          value: 800,
          icon: 's-goods',
          color: '#DCE2F1',
        },
      ],
    };
  },
  mounted() {
    getData().then(({ data }) => {
      //列表数据
      const { tableData } = data.data;
      //console.log(data.data);
      this.tableData = tableData;
      const { orderData, userData, userData2, videoData } = data.data;

      //折线图数据
      console.log(orderData);
      console.log(userData2);
      console.log(videoData);

      const xAxis = Object.keys(orderData.data[0]); // ['苹果', 'vivo', 'oppo', '魅族', '三星', '小米']
      //获取DOM在生命周期mounted之后
      const echarts1 = echarts.init(this.$refs.echarts1);
      var lineEchartOption = {};
      lineEchartOption.xAxis = {
        data: orderData.date,
      };
      lineEchartOption.yAxis = {};
      lineEchartOption.legend = {
        data: xAxis,
      };
      lineEchartOption.series = [];
      xAxis.forEach((key) => {
        lineEchartOption.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: 'line',
        });
      });
      //显示图表
      echarts1.setOption(lineEchartOption);

      //柱状图
      const echarts2 = echarts.init(this.$refs.echarts2);
      var barEchartOption = {
        xAxis: {
          data: [],
        },
        yAxis: {},
        series: userData2,
      };
      barEchartOption.xAxis = {
        data: userData.map((item) => item['date']),
      };
      echarts2.setOption(barEchartOption);

      //饼状图
      const echarts3 = echarts.init(this.$refs.echarts3);
      const pieOption = {
        series: [
          {
            type: 'pie',
            data: videoData,
          },
        ],
      };
      echarts3.setOption(pieOption);
    });
  },
};
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.user {
  display: flex;
  justify-content: space-evenly;
  height: 200px;
  align-items: center;
  .el-card {
    width: 32%;
    margin: 20px;
  }
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }
  .name {
    font-size: 32px;
    margin-bottom: 10px;
  }
  .access {
    color: #99a9bf;
  }
}
.login-info {
  border-top: 1px solid #ccc;
  padding: 10px;
  p {
    font-size: 14px;
    color: #999;
    line-height: 28px;
    span {
      padding-left: 30px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .box-card2 {
    margin-bottom: 10px;
    width: 30%;
  }
  i {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    background-color: #fff;
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    .price {
      margin-bottom: 10px;
      font-size: 28px;
      line-height: 28px;
      height: 28px;
    }
  }
}
.graphs {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  .el-card {
    width: 48%;
  }
}
</style>
