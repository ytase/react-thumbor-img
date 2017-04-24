import babel from 'rollup-plugin-babel'

export default {
	entry: 'module/index.js',
	format: 'es',
	plugins: [
		babel({
			babelrc: false,
			presets: [
				[
					"latest", 
					{"es2015": 
						{"modules": false}
					}
				],
				"react"
			
			],
			plugins: ["external-helpers"]
		})
	],
	dest: 'build/react-thumbor-img.es2015.js'
}