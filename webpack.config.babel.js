import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import AssetsPlugin from 'assets-webpack-plugin';
import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin';

const isProd = process.env.NODE_ENV === 'production';

const commonPlugins = [
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: isProd
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  })
];

const commonResolves = {
  extensions: ['.jsx', '.js'],
  modules: [
    path.resolve(__dirname, 'node_modules'),
    'node_modules'
  ]
};

const commonModules = {
  rules: [
    {
      test: /\.jsx?$/,
      exclude: [
        path.resolve(__dirname, 'src')
      ],
      enforce: 'pre',
      use: 'source-map-loader'
    },
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }
  ]
};

module.exports = [
  {
    target: 'web',
    context: path.resolve(__dirname, 'src'),
    entry: {
      index: './client/index.js'
    },
    output: {
      publicPath: '/',
      path: path.resolve(__dirname, 'dist', 'client'),
      chunkFilename: '[name].[chunkhash].js',
      filename: '[name].[chunkhash].js'
    },
    resolve: commonResolves,
    module: commonModules,
    plugins: commonPlugins
      .concat([
        new AssetsPlugin({
          prettyPrint: true,
          filename: 'assets-manifest.json',
          path: path.resolve(__dirname, 'dist', 'client')
        }),
        new ChunkManifestPlugin({
          filename: 'chunk-manifest.json',
          manifestVariable: 'webpackManifest'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.NamedChunksPlugin((chunk) => {
          if (chunk.name) {
            return chunk.name;
          }
          return chunk
            .mapModules((m) => path.relative('./', m.userRequest))
            .join('_');
        }),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: !isProd
        })
      ])
  },
  {
    target: 'node',
    context: path.resolve(__dirname, 'src'),
    entry: { index: './server/index.js' },
    output: {
      path: path.resolve(__dirname, 'dist', 'server'),
      chunkFilename: '[name].js',
      filename: '[name].js'
    },
    resolve: commonResolves,
    module: commonModules,
    plugins: commonPlugins,
    externals: nodeExternals({
      whitelist: /\.css$/
    })
  }
];
