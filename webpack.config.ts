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
const libraryName = process.env.LIBRARY_NAME

export default {
  entry: './src/Components/index.tsx',
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js', '.jsx','.ts','.tsx', '.json'],
    alias: {
			'@Components': path.resolve(__dirname, 'src/Components/'),
		}
  },
  mode: 'development',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
	library: libraryName,
    libraryTarget: 'umd',
	umdNamedDefine: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
		filename: 'app.css',
	}),
	new webpack.DefinePlugin({
		'process.env': JSON.stringify(dotEnvToParse.parsed),
	}),
    new ESLintPlugin(),
  ],
  module: {
    rules: [
		{ 
			test: /\.(tsx|ts)$/, loader: "ts-loader", 
			exclude: /node_modules/ 
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
				MiniCssExtractPlugin.loader,
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
  /*optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin(),
			new TerserPlugin(),
		],
		splitChunks: {
			chunks: 'async',
			cacheGroups: {
				vendors: {
					name: 'vendors',
					chunks: 'all',
					reuseExistingChunk: true,
					priority: 1,
					filename: 'assets/vendor-[name]-[fullhash].js',
					enforce: true,
					test (module, chunks){
						const name = module.nameForCondition && module.nameForCondition();
						return chunks.name !== 'vendors' && /[\\/]node_modules[\\/]/.test(name);  
					},
				},
			},
		},
	},*/
}