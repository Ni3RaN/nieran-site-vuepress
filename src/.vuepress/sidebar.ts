import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "博客",
      icon: "laptop-code",
      prefix: "Tutorial/",
      children: "structure",
    },
    {
      text: "Narcissus",
      icon: "laptop-code",
      prefix: "Narcissus/",
      children: "structure",
    },
  ],
});
