export default {
  state: {
    appName: "Mango Platform",
    themeColor: "#14889A",
    oldThemeColor: "#14889A",
    collapse: false,
    menuRouteLoaded: false,
  },
  getters: {
    collapse(state) {
      return state.collapse;
    },
  },
  mutations: {
    onCollapse(state) {
      state.collapse = !state.collapse;
    },
    setThemeColor(state, themeColor) {
      state.themeColor = themeColor;
    },
    menuRouteLoaded(state, menuRouteLoaded) {
      state.menuRouteLoaded = menuRouteLoaded;
    },
  },
  actions: {},
};
