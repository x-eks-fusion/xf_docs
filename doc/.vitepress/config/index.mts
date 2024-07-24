import { defineConfig } from "vitepress";
import { zh_CN } from "./zh_CN.mts";
import { en } from "./en.mts";

export default defineConfig({
  locales: {
    root: { label: "简体中文", ...zh_CN },
    en: { label: "English", ...en },
  },
});
