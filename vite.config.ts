import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ tsconfigPath: "./tsconfig.build.json" })],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/zod-prop-types.ts"),
      name: "zod-prop-types",
      // the proper extensions will be added
      fileName: "zod-prop-types",
    },
    rollupOptions: {
      input: resolve(__dirname, "src/zod-prop-types.ts"),
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "zod"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
        },
      },
    },
  },
});
