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

#### 발견 에러와 해결방법
- webpack.dev.congig.js 에서 플러그인 경고, 
- new webpack.optimize.OccurrenceOrderPlugin() ``r 하나 추가`` stackoverflow 참조

### Step 03 (17.11.16)

#### 작업내역

- webpack 설정추가
    ```js
    var path = require('path');
    /* .. 코드 생략 .. */
    ,

    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"]
    }
    // 위 설정을 추가해주면 React 프로젝트의 루트디렉토리를 설정하여, 
    // 나중에 ./components 혹은 ../components 이렇게 접근해야 되는 디렉토리를 
    // 바로 components 로 접근 할 수 있게 해줌.
    ```
- 클라이언트사이드에서 필요한 모듈 설치
    ```
    npm install --save axios react-addons-update react-router react-timeago redux react-redux redux-thunk
    ```
    - axios: HTTP 클라이언트

    - react-addons-update: Immutability Helper (Redux 의 store 값을 변경 할 때 사용됨)

    - react-router: 클라이언트사이드 라우터

    - react-timeago: 3 seconds ago, 3 minutes ago 이런식으로 시간을 계산해서 몇분전인지 나타내주는 React 컴포넌트

    - redux, react-redux; FLUX 구현체, 그리고 뷰 레이어 바인딩

    - redux-thunk: redux의 action creator에서 함수를 반환 할 수 있게 해주는 redux 미들웨어, 비동기작업을 처리 할 때 사용.

- webpack css-loader 와 style-loader 설치
    ```
    npm install --save-dev style-loader css-loader
    // 이 로더들을 통하여 프로젝트에서 css 파일을 require (import) 해서 사용 할 수 있음.
    ```

- webpack 에 로더 적용
    ```js
    module: {
        loaders: [
            {
               /* ... */
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
                // loader: 'style!css-loader' 사용 x
            }
        ]
    },
    ```
    - webpack 설정파일이 바뀌고나면 서버를 재시작해야 적용됨.

- CSS 프레임워크 Materializecss 적용.
    - index.html 에 materializecss 관련 파일들 불러오기

- Materializecss 적용한 Header 만들기
    - Header 컴포넌트 PropTypes 및 defaultProps 설정하기
    - 로그인 여부에 따라 다른 버튼 보여주기

- react-router 사용하기
    - react-router 사용법:[https://github.com/reactjs/react-router]
    - 라우터를 사용 할때는, 우선 루트컴포넌트가 필요 여기선 App.js (x)
    - App,js 에서 라우터의 각 ‘페이지’들이 렌더링 될 자리를 만들어줘야 함 (x)
    - {this.props.children}을 사용 (x)
    - react-router 를 사용하면 이 부분에 우리가 지정한 라우트가 표시 (x)

    - v4로 업데이트 되면서 react-router를 공부해야 할 것 같다.
    - v4를 공부한뒤 v4를 적용해서 프로젝트를 이어가기로 하자.
    - router 내부에 있는 child는 단 하나!
    - react-router v4 를 사용하여 구현 성공! (express서버 라우팅 호환을 안하는 바람에 라우팅이 적용안되는줄 알고 시간낭비가 심했다.)

- 라우트 컴포넌트 – Home, Login, Register 만들기    

- express 서버에서 클라이언트사이드 라우팅을 호환하도록 수정하기 
    ```js
    // server/main.js 안 API 하단부에 작성하자!
    app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
    });
    ```

- 헤더에서 로고 클릭하면 메인 페이지로 이동
    - react-router 의 Link components 사용! 편하다
    - 이 컴포넌트는 페이지를 새로 로딩하는것을 막고, 라우트에 보여지는 내용만 변하게 해준다.

- 로그인 / 회원가입 페이지에서는 헤더 보이지 않게 하기    



</br>
</br>

#### 발견에러 및 해결방법
- WebpackOptionsValidationError 발생

- configuration.resolve has an unknown property 'root'.

- webpack2부터 resolve.root가 없어진 듯.
    ```js
    resolve: {
        root: path.resolve('./src')
    }
    // 더이상 적용 안됨.
    ```

    ```js
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"]
    }
    ```    
    - 이렇게 바꿔줘서 해결.

- router 에러 버전이 바뀌면서 많이 변했다 하여 공부를 하고 적용하였다.    

- Switch 사용시 왜 App 컴포넌트는 밖으로 빼야만 다른 컴포넌트들이 보여지는 걸까. 같이 넣는 방법은 없을까?

- 또 404페이지를 만들면 기본 App 컴포넌트에도 404메세지가 뜨는데 어떻게 해결해야할지..

- express 서버에서 클라이언트사이드 라우팅을 호환하도록 수정하기 에서
    ```
    /* support client-side routing */
    app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,    './../public/index.html'));
    });
    ```
    - 이부분이 모든 요청에 대해서 public/index.html을 response 해주는 것 같음. (host:3000 unexpected error)

    - 일단 임시방편으로 이렇게 해결
        ```
        app.get('*', (req, res, next) => {
        const regExp = /bundle.js$/;
            if(!regExp.test(req.url)) {
                res.sendFile(path.resolve(__dirname, './../public/index.html'));
            } else {
                next();
            }
        });
        ```

- router v4 적용에 시간을 너무 많이 소비했다. 좀 더 집중해서 할 수 있도록 해야지

</br>
</br>

### Step 04 (17.11.17)

#### 작업내역

- Authentication components 생성하고 설정.
    - Login 과 Register 라우트는 상당히 비슷하기 때문에 Authentication에서 같이 사용.
    - 자바스크립트의 값을 전달할땐 항상 ``{braket}`` 으로 감싸주자.

- Header 컴포넌트에서 열쇠 아이콘 누르면 로그인 페이지로 이동 

- loginView 와 registerView 설정하기 (components/Authentication.js)

- input 의 값을 state 로 설정하기 / 변경시 state 업데이트

- Authentication 컴포넌트의 기본적인 뷰 완성

- redux 초기 설정 및 적용
    - actions, reducers 생성
    - action, store, reducer 등 기억이 flux, redux 패턴의 작동방식이 기억이 잘안남..일단 다시 한번 보고오자
    
- 로그인 기능 구현하기
    - HTTP client axios 적용.

- loginRequest 구현하기 
    - loginRequest 는 다른 action creator 랑 다름. 이 함수는 또 다른 함수를 리턴한다. (thunk)
    - thunk 는 특정 작업의 처리를 미루기위해서 함수로 wrapping 하는것을 의미.
    - loginRequest 는 dispatch 를 파라미터로 갖는 thunk 를 리턴.
    ```js
    export function loginRequest(username, password) {
        return (dispatch) => {
            /* do stuffs.. */
        }
    }
    ```
    - 그리고 나중에 컴포넌트에서 dispatch(loginRequest(username, pssword)) 를 하게 되면
    - 미들웨어를 통하여 loginRequest 가 반환한 thunk 를 처리.

- authentication 리듀서 – 로그인 기능 완성하기 
    - thunk 를 리턴하는 loginRequest는 리듀서에서 따로 case를 지정해주지 않아도 됨.

- Login 컨테이너 컴포넌트를 Redux 에 연결
    - react-redux 를 통하여 컴포넌트를 Redux에 연결.
    - 로그인요청을하는 loginRequest 와 로그인 요청 상태인 status 를 authentication 컴포넌트에 매핑.

- Login 컨테이너 컴포넌트에 handleLogin 구현하기 

#### 발생 에러와 해결방법

-  net::ERR_EMPTY_RESPONSE 에러 발생. 아직 원인을 모르겠음.

