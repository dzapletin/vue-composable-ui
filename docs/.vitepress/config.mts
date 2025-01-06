import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue Composable UI",
  description: "A truly headless UI framework",
  base: "/vue-composable-ui/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Home", link: "/" }],

    sidebar: [
      {
        text: "Introduction",
        items: [{ text: "Getting Started", link: "/intro" }],
      },
      {
        text: "Composables",
        items: [
          { text: "useList", link: "/composables/list" },
          { text: "useListOption", link: "/composables/list-option" },
          { text: "usePopover", link: "/composables/popover" },
          { text: "useFormControl", link: "/composables/form-control" },
        ],
      },
      {
        text: "Components",
        items: [
          { text: "Listbox", link: "/components/listbox" },
          { text: "Tabs", link: "/components/tabs" },
          { text: "Popover", link: "/components/popover" },
          { text: "Tooltip", link: "/components/tooltip" },
          { text: "Menu", link: "/components/menu" },
          { text: "Combobox", link: "/components/combobox" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/dzapletin/vue-composable-ui",
      },
    ],

    outline: {
      level: [2, 3],
    },

    search: {
      provider: "local",
    },
  },
  lastUpdated: true,
});
