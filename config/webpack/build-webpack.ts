import webpack from "webpack";
import { buildDevServer } from "./build-dev-server";
import { buildLoaders } from "./build-loaders";
import { buildPlugins } from "./build-plugins";
import { buildResolvers } from "./build-resolvers";
import { BuildOptions } from "./types/types";


export const buildWebpack = (options: BuildOptions): webpack.Configuration => {
    const { mode, paths } = options;

    const isDevMode = mode === 'development';
    const isProdMode = mode === 'production';

    return {
        mode: options.mode ?? 'development',
        entry: paths.entry,
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(),
        output: {
            path: paths.output,
            filename: '[name].[contenthash].js',
            clean: true
        },
        devServer: isDevMode ? buildDevServer(options) : undefined,
        devtool: isDevMode && 'inline-source-map'
    }
}
