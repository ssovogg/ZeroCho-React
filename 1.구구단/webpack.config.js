const path = require('path');

module.exports = {
  mode: 'development', 
  devtool: 'eval', // mode가 배포용일때는 hidden-source-map
  resolve: { // 확장자를 설정해주면 entry-app에서 확장자 생략 가능하다.
    extensions: ['.jsx', '.js']
  },

  entry: {
    app: '.client',
  },
  module:{
    rules:[{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: [],
      },
    }],
  },
  output:{
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
  },
}


/**
 * preset : plugin 모음
 * preset에 설정을 적용하고 싶다면?
 * ['preset 이름', '{설정 내용}']
 */