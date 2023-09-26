export default {
  state: {
    //用于控制aside的展开收起
    isCollapse: false,
    //面包屑
    tabsBreadList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home',
      },
    ],
  },
  mutations: {
    //控制aside的展开收起
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    //点击菜单，往面包屑增加tab
    addBreadTabs(state, item) {
      console.log('router item', item);
      state.tabsBreadList = item;
      console.log(state.tabsBreadList);
    },
  },
};
