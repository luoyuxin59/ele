const webpack = require("webpack");
module.exports = {
    pluginOptions: new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery"
    }),
    publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/' // 加入这行就可以了
};