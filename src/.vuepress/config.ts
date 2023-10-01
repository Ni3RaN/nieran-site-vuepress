import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "NieRaN",
  description: "NieRaN的主页",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
