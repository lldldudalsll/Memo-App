# React-Codelab-Project MEMO-APP

## About

MEMO-APP 는 SPA를 사용한 무한스크롤링형 메모장 application입니다. React.js, Redux, Express.js and MongoDB 를 사용했습니다.

## Features
- Authentication (Sign Up / Sign In)
- Memo Creation / Manipulation (edit, delete, star)
- User Search

Preview: 

## Stack
- axios
- babel
- express
- bcryptjs
- mongoose
- react
- react-router
- react-addons-css-transition-group
- react-addons-update
- redux
- redux-thunk
- materializecss
- react-hot-loader
- webpack
- webpack-dev-server
- style-loader
- css-loader


## Prerequisites
MongoDB and NodeJS should be installed

```
npm install -g webpack babel nodemon cross-env
npm install
```

## Scripts

- `npm run clean` Deletes Build files of Server and Client
- `npm run build` Builds Server and Client
- `npm run start` Start server in production environment
- `npm run dev` Start server in development environment

Express server runs on port 3000, and dev server runs on port 4000.

### Step 01 (17.11.14)

#### 작업 내역
- 출처: [https://velopert.com/tag/reactcodelab](https://velopert.com/tag/reactcodelab) 
- 공부목적이니 create-react-app을 사용하지 않았음
- 기본 디렉토리 설정
- 기본 환경설정 완료 (react, react-dom, webpack, babel, express, mongoose, morgan)
- express 서버 연결 확인, dev 서버 연결 확인 (postman 사용)

#### 발견 에러와 해결 방법
1. 구 버전 webpack.config.js module에서 컴파일 에러 발생
- ```
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
            }
        ]
    }
    ```
    으로 loader와 react-hot-loader 에러 해결. (stackoverflow 참고)


2. mongodb connection error (stackoverflow 참고)
- 예전 버전에서 사용하던 mongoose.Connect()에러. mongoose.createConnection() 을 사용하여 해결
- 마찬가지로 예전 버전에서 사용된 ('mongodb://localhost/codelab');만 사용시 에러. {useMongoClient: true} 코드추가로 해결('mongodb://localhost/codelab', {useMongoClient: true});

### Step 02 (17.11.15)

#### 작업내역
1. Backend 계정인증 구현하기
- account router 생성
- API root router 생성 (server/routes/index.js)
- API 라우터 불러와서 사용 (server/main.js)
- mongoose 를 통한 account 모델링
    - account Schema 를 만들고 model 로 만들어서 export
    - Schema 는 그냥 데이터의 ‘틀’ 일 뿐
    - Model 은, 실제 데이터베이스에 접근 할 수 있게 해주는 클래스
- 보안상 허술함 보완위해 bcryptjs 해쉬 모듈 설치 및 적용
    - 여기서는 arrow 메소드를 사용하시면 제대로 작동하지 않기 때문에 그냥 일반 함수형으로 작성. (this binding 오류)
- 회원가입 구현: POST /api/signup
- 로그인 구현: POST /api/signin
- 세션확인 구현: GET /api/getInfo
    - 세션확인이 필요한 이유는, 클라이언트에서 로그인 시, 로그인 데이터를 쿠키에 담고 사용을 하고 있다가,
    - 만약에 새로고침을 해서 어플리케이션을 처음부터 다시 렌더링 하게 될 때, 지금 갖고 있는 쿠키가 유효한건지 체크를 해야 하기 때문
- 로그아웃 구현: POST /api/logout 
- Express 에러처리

2. Backend – 메모 작성 / 수정 / 삭제 / 읽기 구현하기
- Memo model(constructor), router 만들기
- API 라우터에 Memo 라우터 추가 
- Memo 라우터 만들기 (server/routes/memo.js)
    - 작성기능 구현하기: POST /api/memo 
    - 읽기기능 구현하기: GET /api/memo
    - 삭제 기능 구현하기: DELETE /api/memo/:id 
    - 수정 기능 구현하기: PUT /api/memo/:id

