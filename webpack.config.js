const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
  const IS_DEVELOPMENT = argv.mode === "development"

  return [
    {
      entry: './app/main.js',
      target: "electron-main",
      output: {
        filename: 'main.js',
        path: path.join(__dirname, 'public')
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', {
                modules: false,
                targets: {
                  node: true
                }
              }]]
            }
          }
        ]
      },
      devtool: IS_DEVELOPMENT ? "source-map" : "none"
    },
    {
      entry: "./app/render/src/app.js",
      target: "electron-renderer",
      output:{
        filename: "bundle.js",
        path: path.join(__dirname, "public/render")
      },
      module:{
        rules:[
          {
            test: /\.js$/,
            loaders: 'babel-loader',
            query: {
              presets: ['@babel/preset-react', ['@babel/preset-env', { modules: false }]]
            }
          },
          {
            test: /\.css/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  url: false,
                  sourceMap: true,
                }
              }
            ]
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "./app/render/index.html",
          filename: path.join(__dirname, "public/render/bundle.html")
        })
      ],
      devtool: IS_DEVELOPMENT ? "source-map" : "none",
      resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', '.jsx'],
      }
    }
  ]
}