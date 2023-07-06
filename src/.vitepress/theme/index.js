// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import Theme from "vitepress/theme";
import "./style.css";

import LifecycleMethodsChart from "../components/LifecycleMethodsChart.vue";

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    // https://vitepress.vuejs.org/guide/using-vue.html#app-level-enhancements
    app.component("LifecycleMethodsChart", LifecycleMethodsChart);
  },
};
