import path from 'path';
import webpack from 'webpack';
import * as dotenv from 'dotenv';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

const dotEnvToParse = dotenv.config();
const libraryName = process.env.LIBRARY_NAME ? process.env.LIBRARY_NAME : "ui-library"
const externalCss = process.env.EXTERNAL_CSS === 'true' ? true : false
const externalCssName = process.env.EXTERNAL_CSS_NAME ? process.env.EXTERNAL_CSS_NAME : 'index.css'

export default {
  entry: './src/components/index.tsx',
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js', '.jsx','.ts','.tsx', '.json'],
    alias: {
			'@components': path.resolve(__dirname, 'src/components/'),
		}
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
			test: /\.(tsx|ts)$/, 
			loader: "ts-loader", 
			exclude: /node_modules/,
			options: { reportFiles: ['src/**/*.{ts,tsx}', '!src/**/*.stories.{ts,tsx}'] } 
		},
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
				'css-loader',
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