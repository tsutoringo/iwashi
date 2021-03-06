const path = require('path');
const webpack = require('webpack');
const cssnano = require('cssnano');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = (env, argv = {}) => {
	const browsers = [
		'last 2 chrome versions',
		...(argv.mode === 'production'
			? ['last 2 firefox versions', 'safari >= 9', 'last 2 edge versions']
			: []),
	];

	const envConfig = {
		targets: {
			browsers,
		},
		useBuiltIns: 'entry',
		shippedProposals: true,
		debug: true,
		modules: 'commonjs',
		corejs: 3,
	};

	return {
		entry: './index.babel.js',
		mode: argv.mode || 'development',
		output: {
			path: __dirname,
			filename: 'index.js',
		},
		devtool:
			argv.mode === 'production'
				? false // https://github.com/webpack-contrib/babel-minify-webpack-plugin/issues/68
				: 'cheap-module-eval-source-map',
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								['@babel/preset-env', envConfig],
								'@babel/preset-react',
							],
							plugins: [
								[
									'react-css-modules',
									{
										filetypes: {
											'.pcss': {
												syntax: 'postcss',
											},
										},
										handleMissingStyleName: 'warn',
										generateScopedName: '[name]__[local]--[hash:base64:5]',
									},
								],
								'@babel/plugin-proposal-class-properties',
								'@babel/plugin-proposal-object-rest-spread',
							],
						},
					},
				},
				{
					test: /\.svg$/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								['@babel/preset-env', envConfig],
								'@babel/preset-react',
							],
							plugins: [
								'@hakatashi/babel-plugin-react-svg',
								'@babel/plugin-proposal-object-rest-spread',
							],
						},
					},
				},
				{
					test: /\.pcss$/,
					exclude: /node_modules/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								modules: true,
								importLoaders: 1,
								localIdentName: '[name]__[local]--[hash:base64:5]',
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								plugins: [
									precss(),
									...(argv.mode === 'production'
										? [
											autoprefixer({
												browsers,
											}),
											cssnano(),
										  ]
										: []),
								],
							},
						},
					],
				},
				{
					test: /\.css$/,
					use: [
						'style-loader',
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								ident: 'css',
								plugins: [...(argv.mode === 'production' ? [cssnano()] : [])],
							},
						},
					],
				},
				{
					test: /\.ttf$/,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: Infinity,
								mimetype: 'application/font-woff',
							},
						},
						{
							loader: './lib/fontmin-loader.js',
							options: {
								text: [
									'♪',
									'イワシがつちからはえてくるんだ',
									'／',
									'ころんば',
									'～原曲不使用音声による音MAD自動演奏～',
									'0123456789% Loaded...',
									'Completed!',
									'音量注意！',
									'なんねん　まえかの　ことでした',
									'だれかが　ハサミで',
									'タイムラインを　ちょんぎった',
									'そして',
									'あしたと　きのうが　つながった',
									'あしたの　ことは　しっている',
									'イワシが　つちから　はえてくるんだ',
									'えきの　ホームに　あながあく',
									'すのこが　きえるんだ',
									'きのうの　きおくは　きえたけど',
									'きえたってことも　よくわからないんだ',
									'そらの　うえから　ビルがたつ',
									'めが　みえなくなってきた',
									'はな は かれず',
									'とり は とばず ねむる',
									'かぜ は とまり つめたく',
									'つき は みちも かけも せず まわる',
									'いままでと　これからが　つながって',
									'いちにちを　とばして　わすれて',
									'すすんでく',
									'ここは',
									'もとには　もどらなくなった',
									'おすすめ',
									'全部',
									'動画ON',
									'動画OFF',
									'かえる',
								].join(''),
							},
						},
					],
				},
				{
					test: /\.txt$/,
					exclude: /node_modules/,
					use: ['raw-loader'],
				},
				{
					test: /\.yml$/,
					exclude: /node_modules/,
					use: ['./lib/yaml-loader.js'],
				},
				{
					test: /\.modernizrrc\.js$/,
					use: ['modernizr-loader'],
				},
			],
		},
		node: {
			fs: 'empty',
			net: 'empty',
			tls: 'empty',
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(argv.mode),
			}),
			...(argv.mode === 'production' ? [new MinifyPlugin()] : []),
		],
		resolve: {
			alias: {
				modernizr$: path.resolve(__dirname, '.modernizrrc.js'),
			},
		},
	};
};
