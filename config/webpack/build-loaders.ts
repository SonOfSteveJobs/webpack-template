import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";

export const buildLoaders = ({ mode }: BuildOptions): ModuleOptions['rules'] => {
    const isDevMode = mode === 'development';

    return [
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
    ]
}