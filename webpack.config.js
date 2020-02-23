const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // The file that is the main point of access for the SPA
  entry: path.join(__dirname, "src/client.js"),
  // Where you want to output the file
  output: {
    // The output file's name
    filename: "bundle.js",
    // Where the output JavaScript bundle will go
    path: path.join(__dirname, "build")
  },
  // The mode to determine what optimizations to make
  mode: "development",
  // The source map tool to see where errors occur in your editor
  devtool: "cheap-module-source-map",
  // The loaders which handle how to compile which files
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    // Plugin to clean the build folder on every build
    new CleanWebpackPlugin(),
    // Plugin to create the index.html file and inject the script which
    // points to the JavaScript bundle
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.html"),
      filename: "index.html"
    })
  ],
  // The development server
  devServer: {
    // The path to the output folder to serve
    contentBase: path.join(__dirname, "../dist"),
    // Fallback to index.html on 404s
    historyApiFallback: true,
    // Enable gzip compression
    compress: true,
    // Declare the port to serve the files
    port: 3000
  }
};
