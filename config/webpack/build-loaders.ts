import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";

export const buildLoaders = ({ mode }: BuildOptions): ModuleOptions['rules'] => {
    const isDevMode = mode === 'development';

    return [
        {
            test: /\.(css|s[ac]ss)$/i,
            use: [
                isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        modules: {
                            localIdentName: isDevMode ? '[path][name]__[local]' : '[hash:base64:8]'
                        },
                    },
                },
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