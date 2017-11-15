var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        './src/index.js',
        './src/style.css'
    ],

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react'],
                    plugins: ["react-hot-loader/babel"]
                }
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"]
    }
    // 위 설정을 추가해주면 React 프로젝트의 루트디렉토리를 설정하여, 
    // 나중에 ./components 혹은 ../components 이렇게 접근해야 되는 디렉토리를 
    // 바로 components 로 접근 할 수 있게 해줍니다.
};