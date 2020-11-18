module.exports = {
	presets: [
		['@babel/preset-env'],
		'@babel/preset-react',
		'@babel/preset-typescript'
	],
	plugins: [
		'istanbul',
		'react-hot-loader/babel',
		// [
		// 	'import',
		// 	{
		// 		libraryName: 'antd',
		// 		libraryDirectory: 'lib',
		// 		style: true
		// 	}
		// ],
		'@babel/plugin-syntax-dynamic-import',
		'@babel/transform-runtime',
		['@babel/plugin-proposal-decorators', { legacy: true }],
		['@babel/plugin-proposal-class-properties', { loose: true }],
		[
			'babel-plugin-root-import',
			{
				rootPathSuffix: '.'
			}
		],
		['module-resolver', { alias: { '@': './src' } }]
	]
}
