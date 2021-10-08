const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports ={
    mode:'development',
    entry:{
        main: path.resolve(__dirname,'src/index.js')
    },
    module:{
        rules:[
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/i,
                exclude:/node_modules/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
              }
        ]
    },
    output:{
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js',
        clean: true
    },
    plugins:[
        new HTMLWebpackPlugin({
            title: 'Welcome',
            template: 'src/index.html'
        })
    ],
    devServer:{
       
        port: 3000
    }



}