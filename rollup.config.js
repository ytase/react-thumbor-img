import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";

const extensions = [".js", ".ts", ".tsx"];

export default {
  input: "module/index.ts",
  plugins: [resolve({ extensions }), babel({ extensions })],
  output: [
    {
      file: "build/react-thumbor-img.js",
      format: "es"
    },
    {
      file: "build/react-thumbor-img.cjs.js",
      format: "cjs"
    }
  ],
  external: ["react"]
};
