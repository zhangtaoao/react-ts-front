import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { loadEnv } from "vite";
import viteCompression from 'vite-plugin-compression';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      env.VITE_BUILD_COMPRESS === "gzip" &&
        viteCompression({
          verbose: true,
          disable: false,
          threshold: 10240,
          algorithm: "gzip",
          ext: ".gz",
        }),
    ],
    server: {
      host: "0.0.0.0",
      // 设置端口号
      port: 8888,
      // 配置代理，用于开发环境跨域请求
      proxy: {
        "/api": {
          target: "http://127.0.0.1:4523/m1/5997263-5685761-default",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/"),
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`, // 使用 @use 替代 @import
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
