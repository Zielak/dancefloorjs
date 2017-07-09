var nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [

    ]
  },
  devtool: 'source-map',
}
