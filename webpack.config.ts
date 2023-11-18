import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

type Mode = 'production' | 'development';

interface EnvVariables {
    mode: Mode,
    port: number
}

module.exports = (env: EnvVariables) => {
    const isDevMode = env.mode === 'development';
    const isProdMode = env.mode === 'production';

    const config = {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html')
            }),
            isProdMode && new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            })
        ].filter(Boolean),
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ],
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true
        },
        devServer: isDevMode ? {
            port: env.port ?? 3000,
            open: true
        } : undefined,
        devtool: isDevMode && 'inline-source-map'
    }
    return config;
};