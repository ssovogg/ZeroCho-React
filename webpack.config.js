// webpack 설정

const { appendFile } = require('fs');
const path = require('path'); // node에서 경로조작

module.exports = {
  name: 'word-relay-setting',
  mode: 'development', //개발용: development, 실서비스: production
  devtool: 'eval', // 빠르게
  // webpack이 알아서 해당 확장자를 찾음
  resolve: {
    extensions: ['.js', 'jsx']
  }
  // entry(입력), output(출력) => 젤 중요!
  // entry의 파일을 합쳐서 output의 app.js로 만들어줌
  entry: {
    app: ['./client', './WordRelay'],
  },
  output: {
    // path.join(현재폴더, 안에있는폴더) => 경로를 알아서 합쳐줌
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },
};

// 이렇게 세팅하고 나서 터미널에 webpack 치면 됨
// webpack 명령어 등록해주거나 package.json에 script로 적으면 됨
// 또는 npx webpack 치면 됨
// https://www.youtube.com/watch?v=PTz9z_n_UpY&list=PLcqDmjxt30RtqbStQqk-eYMK8N-1SYIFn&index=16
// 2분 50초