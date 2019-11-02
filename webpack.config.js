const path = require('path');
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin');
const miniHtmlWebpackPluginTemplate = require('@vxna/mini-html-webpack-template');
const postCssUse = require('postcss-use');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackDashboard = require('webpack-dashboard/plugin');

const cdn = {
  fccTestSuite: { script: { src: "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js" } },
  normalize: { link: { rel: "stylesheet", href: "https://unpkg.com/normalize.css@8.0.1/normalize.css"} },
  bulma: { link: { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css" } },
  fontAwesome: { script: { defer: true, src: "https://use.fontawesome.com/releases/v5.3.1/js/all.js" } },
  prismjs: {
    link: {
      themes: {
        dark: { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/themes/prism-dark.min.css" },
        prism: { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/themes/prism.min.css" }
      }
    },
    script: {
      prism: { src: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/prism.min.js"},
      languages: {
        pug: { src: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/components/prism-pug.min.js"},
        json: { src: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/components/prism-json.min.js"},
        bash: { src: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/components/prism-bash.min.js"},
        scss: { src: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/components/prism-scss.min.js"}
      }
    },
  }
};

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
    hot: true
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
              plugins: () => [
                postCssUse({ modules: codePenPostCssUseModules }),
                autoprefixer()
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
            // cdn.normalize.link,
            // cdn.prismjs.link.themes.prism
          ],
          scripts: []
        },
        body: {
          scripts: [ 
            // cdn.prismjs.script.prism,
            // cdn.prismjs.script.languages.pug,
            // cdn.prismjs.script.languages.json,
            // cdn.prismjs.script.languages.bash,
            // cdn.prismjs.script.languages.scss,
            cdn.fccTestSuite.script
          ]
        },
        trimWhitespace: true
      },
      template: miniHtmlWebpackPluginTemplate
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};

