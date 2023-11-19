import webpack from 'webpack';
import { buildWebpack } from './config/webpack/build-webpack';
import { BuildMode, BuildPaths } from './config/webpack/types/types';
import path from 'path';


interface EnvVariables {
    mode: BuildMode,
    port: number
}

module.exports = (env: EnvVariables) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
    }

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths: paths
    })
    return config;
};