import path from 'path';
import webpack from 'webpack';
import * as dotenv from 'dotenv';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { resolveTsAliases } from 'resolve-ts-aliases';

const dotEnvToParse = dotenv.config();
const libraryName = process.env.LIBRARY_NAME ? process.env.LIBRARY_NAME : "ui-library"
const externalCss = process.env.EXTERNAL_CSS === 'true' ? true : false
const externalCssName = process.env.EXTERNAL_CSS_NAME ? process.env.EXTERNAL_CSS_NAME : 'index.css'
const alias = resolveTsAliases(path.resolve('tsconfig.json'));

export default {
  entry: './src/components/index.tsx',
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js', '.jsx','.ts','.tsx', '.json'],
    alias,
  },
  mode: 'production',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
		library: libraryName,
    libraryTarget: 'umd',
		globalObject: 'this',
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...(externalCss === true ? [
        new MiniCssExtractPlugin({
            filename: externalCssName,
        }),
    ] : []),
	new webpack.DefinePlugin({
		'process.env': JSON.stringify(dotEnvToParse.parsed),
	}),
    new ESLintPlugin(),
  ],
  module: {
    rules: [
		{
			test: /\.(js|jsx|ts|tsx)$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
			},
		},
		{
			test: /\.(css|sass|scss)$/,
			use: [
				externalCss === true ? MiniCssExtractPlugin.loader : 'style-loader',
				{
					'loader': 'css-loader',
					'options': {
						modules: {
							auto: /\.module\.\w+$/i,
						}
					},
				},
				'sass-loader',
			], 
		},
      	{
			test: /\.(ttf|otf|eot|woff|woff2)$/,
			loader: 'url-loader',
			options: {
				name: 'assets/fonts/[name].[ext]',
				esModule: false,
			},
		},
    ]
  },
  optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin(),
			new TerserPlugin(),
		],
	},
}