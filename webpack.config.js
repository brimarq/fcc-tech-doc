const path = require('path');
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackDashboard = require('webpack-dashboard/plugin');
const codePenPostCssUseModules = [
  'lost',
  'postcss-apply',
  'postcss-color-function',
  'postcss-conditionals',
  'postcss-custom-media',
  'postcss-discard-comments',
  'postcss-each',
  'postcss-extend',
  'postcss-flexbox',
  'postcss-for',
  'postcss-media-minmax',
  'postcss-mixins',
  'postcss-nested',
  'postcss-nested-ancestors',
  'postcss-preset-env',
  'postcss-reverse-media',
  'postcss-simple-vars',
  'postcss-triangle'
];

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
  },
  devServer: { 
    port: 3000,
    contentBase: './dist',
    hot: true,
    inline: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ['@babel/preset-env', { modules: false }]
            ]
          }
        }
      },
      {
        test: /\.pug$/,
        include: path.resolve(__dirname, 'src'),
        use: ['pug-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 
          { loader: 'css-loader', options: { importLoaders: 1 } }, 
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-use')({ modules: codePenPostCssUseModules }),
                require('autoprefixer')()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpackDashboard(),
    new CleanWebpackPlugin(),
    new MiniHtmlWebpackPlugin({
      context: {
        lang: 'en',
        title: 'Technical Documentation Page | fCC Responsive Web Design Projects',
        container: 'root',
        head: {
          links: [
            // { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/themes/prism-dark.min.css" },
            // { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/plugins/diff-highlight/prism-diff-highlight.css" }
          ]
        },
        body: {
          scripts: [ 
            // { src: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/prism.min.js"},
            // { src: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/components/prism-pug.js"},
            // { src: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/components/prism-bash.min.js"},
            // { src: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/components/prism-diff.min.js"},
            // { src: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/plugins/diff-highlight/prism-diff-highlight.min.js"},
            { src: 'https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js' }
          ]
        },
        trimWhitespace: true
      },
      template: require('@vxna/mini-html-webpack-template')
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};

