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
		['@babel/plugin-proposal-decorators', { legacy: true }],
		'@babel/transform-react-constant-elements',
		'@babel/transform-react-inline-elements',
		'transform-react-remove-prop-types',
		'transform-react-pure-class-to-function',
		'@babel/transform-runtime',
		['@babel/plugin-proposal-class-properties', { loose: true }],
		[
			'babel-plugin-root-import',
			{
				rootPathSuffix: '.'
			}
		],
		['module-resolver', { alias: { '@': './src' } }]
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ]
	]
}
