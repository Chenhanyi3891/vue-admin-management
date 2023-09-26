export default {
  state: {
    isCollapse: false, //用于控制aside的展开收起
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
  },
};
