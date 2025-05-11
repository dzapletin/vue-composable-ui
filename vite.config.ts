import { resolve } from "path";
import { glob } from "glob";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue({ isProduction: true })],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: glob
        .sync("src/**/*.{ts,tsx,vue,scss}", {
          ignore: ["src/**/*.d.ts", "src/stories/*"],
        })
        .map((f) => resolve(__dirname, f)),
      name: "Vue Composable UI",
      // the proper extensions will be added
      fileName: "composable-ui",
      formats: ["es"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
