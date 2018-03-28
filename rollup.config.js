import babel from 'rollup-plugin-babel'

export default {
	input: 'module/index.js',
	plugins: [
		babel({
			babelrc: false,
			presets: [
				[
					"env",
					{ "modules": false }
				],
				"react"
			],
			plugins: ["external-helpers"]
		})
	],
	output: {
		file: 'build/react-thumbor-img.es2015.js',
		format: 'es'
	},
	external: ['react']
}