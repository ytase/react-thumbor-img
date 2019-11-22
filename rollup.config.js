import ts from "@wessberg/rollup-plugin-ts"

export default {
	input: 'module/index.ts',
	plugins: [
		ts({
			transpiler: 'typescript',
			include: "./module/**/*"
		})
	],
	output: {
		file: 'build/react-thumbor-img.js',
		format: 'es'
	},
	external: ['react']
}