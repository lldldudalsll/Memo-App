# React-Project <MEMO-APP>

## About
MEMO-APP 는 SPA를 사용한 무한스크롤링형 메모장 application입니다.  
React.js, Redux, Express.js and MongoDB 를 사용했습니다.  
출처: [https://velopert.com/tag/reactcodelab](https://velopert.com/tag/reactcodelab) 

## Features
- 계정인증 (Sign Up / Sign In)
- 메모 작성 및 조작 (edit, delete, star)
- 유저 검색

Preview: [https://whispering-mesa-74285.herokuapp.com/](https://whispering-mesa-74285.herokuapp.com/)

## Stack
- axios
- babel
- express
- bcryptjs
- mongoose
- react
- react-router
- react-addons-css-transition-group
- immutability-helper
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

</br>
</br>

### Step 01 (17.11.14)

#### 작업 내역
- 공부목적이니 create-react-app을 사용하지 않았음
- 기본 디렉토리 설정
- 기본 환경설정 완료 (react, react-dom, webpack, babel, express, mongoose, morgan)
- express 서버 연결 확인, dev 서버 연결 확인 (postman 사용)

</br>

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

</br>
</br>

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

</br>

#### 발견 에러와 해결방법
- webpack.dev.congig.js 에서 플러그인 경고, 
- new webpack.optimize.OccurrenceOrderPlugin() ``r 하나 추가`` stackoverflow 참조

</br>
</br>

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

- Login과 Register 구현 에러

- 비밀번호 input에서 엔터를 눌렀을 때 로그인/회원가입 트리거

</br>

#### 발생 에러와 해결방법

- net::ERR_EMPTY_RESPONSE 에러 발생. 아직 원인을 모르겠음.

- Uncaught (in promise) TypeError: Cannot read property 'data' of undefined 에러

- 어느 부분이 잘못된건지 모르겠다. 많은 시간을 할애했으나 해결하지 못했다. 

- dispatch에 대한 부분이 잘 이해가 가지 않는다. 또 promise에 대한 공부도 해야 할 듯하다.

- 전체적인 흐름을 제대로 파악하지 못했기 때문에 문제 해결이 늦어지고 있는것이라 본다.

- 이론을 다시 공부하는 방법이 돌아가더라도 에러를 해결할 수 있는 방법일것 같다.

- 내일은 해결할수 있을까..

</br>
</br>

### Step 05 (17.11.20)

#### 작업내역

- Login과 Register 구현

- 계정 인증구현이 늦어지는데 bcrypt 오류로 일시 중단 해놓은 상태. 나머지 먼저 구현하고 시간나면 repo읽고 적용하자.

- 로그인 세션 확인 구현
    - 로그인 상태라면 로그아웃 버튼을 보여주자
    - 페이지가 새로고침 될 때 현재 세션이 유효한지 체크하는 기능을 구현
    - getStatusRequest 구현
    - authentication 리듀서 수정
    - initialState 의 status 부분에 valid 키 추가
    - App container 컴포넌트 Redux 연결하기
    - App container 컴포넌트 세션 확인 기능 구현

- 로그아웃 구현
    - Action Type 추가
    - authentication 액션파일 수정
    - authentication 리듀서 수정
    - App 컨테이너 컴포넌트에서 mapDispatchToProps 수정 
    - App 컨테이너 컴포넌트에서 handleLogout 구현 
    - Header 컴포넌트 수정

- 계정인증 완료!

</br>


#### 발견에러 및 해결방법
- net::ERR_EMPTY_RESPONSE 에러 
    - react-addons-update 더이상 사용 x
    - immutability-helper 로 $set 변경.
    - mongoose.connect('mongodb://localhost:27017')로 해결

- bcrypt 오류
    - 시간이 너무 지체되고 있다. 나중에 적용

- App container 컴포넌트 세션 확인 구현 중 에러
    - Uncaught TypeError: (0 , _authentication.getStatusRequest) is not a function
    - The above error occurred in the <App> component
    - 라우터 문제로 파악하고 라우터 구조를 고쳐보았으나 해결되지 않음.
    - componentDidMount 안에서 getStatusRequest가 props지정이 안되있어서 그런줄 알고 const { getStatusRequest } = this.props; 했으나 해결x
    - request를 requset 철자 에러.

- GET /api/account/getInfo 500 발생
    - session 처리중 req, res 오타로 인한 에러. 해결

- api/account/getInfo 포스트맨에서 401에러. 
    - 웹상에서 제대로 나옴. 로그인하고 postman으로 실행하면 {success: true}가 나오지 않음.
    - 로그인도 세션도 유지 되는데 어떤 이유인지 알 수 없다.
    - 값을 넣을 body도 비활성화 되어있어 값을 넣을 수도 없다. 일단 중요한건 아니라고 판단되 구현 먼저하고 나중에 포스트맨 사용법을 깊게 숙지하자.

</br>
</br>

### Step 06 (17.11.23)

#### 작업내역

- Write 컴포넌트 만들기
    - Write 컴포넌트 생성(src/components/Write.js)
    - 컴포넌트 인덱스에 Write 컴포넌트 추가
    - Write 컴포넌트 뷰 만들기
    - Home 컴포넌트에서 현재 로그인상태라면 Write 보여주기, wrapper 스타일 클래스 적용 
    - Write 컴포넌트 textarea 에 state 사용, defaultProps / propTypes 설정
    - Action Type 추가
    - memo 액션파일 만들고 memoPostRequest 구현
    - memo 리듀서 만들기
    - Home 컨테이너 컴포넌트에서 Redux 연결
    - Home 컨테이너 컴포넌트에 handlePost 구현
    - Write 컴포넌트에서 위에서 받은 onPost 사용.

- Memo Creation 완료!

</br>

#### 발견에러 및 해결방법
- Home 컴포넌트 import parsing error
    - 뭔진 몰라도 재부팅 후 사라짐.

- Cannot read property 'then' of undefined 에러
    - post는 잘 실행됨.
    - promise 문법 에러 이유는 아직 모르겠다.
    - memoPostRequest action을 dispatch 하는 함수를 props로 연결 할때 return 값으로 반환을 하지않아 발생
    - 해결

</br>
</br>

### Step 07 (17.11.24)

#### 작업내역

- 읽기 기능 구현하기 01 - Memo 와 MemoList 컴포넌트
    - 메모 컴포넌트는, 자신의 메모라면 수정/삭제 를 할 수 있도록 옵션 버튼을 우측상단에 만들어주자
    - Materializecss 의 Dropdown 기능을 통하여 옵션메뉴를 구현
    - Memo, MemoList 컴포넌트 파일 생성 (src/components/Memo.js)(src/components/MemoList.js)
    - 컴포넌트 인덱스에 추가 (src/components/index.js)
    - Memo 컴포넌트를 위한 스타일 추가 (src/style.css)
    - Memo 컴포넌트 뷰 만들기
    - MemoList 에 Memo 컴포넌트 렌더링하고 Home 컴포넌트에 MemoList 컴포넌트 렌더링
    - Memo 컴포넌트 propTypes, defaultProps 지정  
        - 이 컴포넌트는 Memo에 필요한 값들을 객체형으로 받아오도록 하자.  
        - 나중에 컴포넌트 Mapping 을 할때 이렇게 하는편이 편하기 때문.
    - Memo 컴포넌트 렌더링 할 때 props 값 사용하기 (react-timeago / ES6의 Template Literals 사용)
    - Memo 컴포넌트 memo View 를 따로 분리  
    나중에 Edit 모드일때는 Write 와 비슷한 뷰를 보여주기 위함.
    - Memo 컴포넌트의 Dropdown 메뉴 추가 작업  
        - Dropdown 메뉴가, 자신의 메모일때만 보여주게하고 (ownership 이 true일때)  
        - Dropdown 메뉴 활성화 작업을 componentDidMount 와 componentDidUpdate 에서 하도록 만들자  
        - 해당 컴포넌트가 유동적으로 생성되고 업데이트될 경우에는 저희가 따로 활성화작업을 해야 함.
    - MemoList 컴포넌트 propTypes 와 defaultProps 설정.
    - Home 컨테이너 컴포넌트에서 Mock Data 로 실험. MemoList 컴포넌트 받은 Mock Data배열 컴포넌트 매핑
        - 랜더링 성공.
        - 성공했으니 서버에서 진짜 데이터를 가져오자.
    - ActionType 추가, action파일 수정.
    - memoListRequest 구현, memo 리듀서 수정
    - Home 컨테이너 컴포넌트에서 memoListRequest 사용
    - Home 컨테이너 컴포넌트 서버에서 받은 결과값 MemoList 로 전달.

- MemoList data api로 불러오기 성공!!

</br>

#### 발견에러 및 해결방법

- 딱히 중요한 에러는 없었음.

</br>
</br>

### Step 08 (17.11.25)

#### 작업내역

- 읽기 기능 구현하기 02 – 추가 로딩 (새 메모 / 이전 메모)
    - 새로운 메모 혹은 이전 메모를 읽어와야 함.
        - 현재 페이지에 로딩되어있는 데이터 중에서 (초기로딩 된 데이터) 가장 위에 있는 메모의  
        _id 값보다 높은 _id 를 갖고있는 메모를 쿼리하면 새로운 메모들을 읽을 수 있고  
        가장 아래에 있는 메모의 _id 값보다 낮은 _id 를 갖고있는 메모를 쿼리하면 이전 메모들을 읽을 수 있을 것.

    - 메모 추가 로딩 API 구현

</br>

#### 발견에러 및 해결방법

- 없음

</br>
</br>

### Step 09 (17.11.28)

#### 작업내역

- 읽기 기능 구현하기 02 – 추가 로딩 (새 메모 / 이전 메모)
    - memoListRequest 추가구현
        - 구현한 API 에 맞춰서 파라미터에 따라 URL 을 설정
    - memo 리듀서 MEMO_LIST_SUCCESS 부분 수정
        - unshift 사용으로 앞부분에 데이터를 추가.
    - Home 컨테이너 컴포넌트에서 5초마다 새 메모 로딩
        - mapStateToProps 에서 state.memo.list.status 를 매핑
        - loadNewMemo 는 새 메모를 읽어들일 때 사용
        - 메모 요청 상태가 ‘WAITING’ 일 때는 로딩을 하지 않도록 
        - 비어있는 Promise 를 리턴한 이유는 Write 에서 해당 메소드를 입력하고 .then 을 사용 할 수 있게 만들기 위함
        - 페이지가 비어있을 경우에는 초기로딩을 시도
        - componentDidMount 에서, timeout 기능을 통하여 이 작업을 5초마다 반복하도록 설정
    - 작성 시, 새 메모를 읽도록 트리거하기
    ```js
    (src/containers/Home.js)
    handlePost(contents) {
        return this.props.memoPostRequest(contents).then(
            () => {
                if(this.props.postStatus.status === "SUCCESS") {
                    // TRIGGER LOAD NEW MEMO
                    this.loadNewMemo().then(
                        () => {
                            Materialize.toast('Success!', 2000);
                        }
                    );
                }
    /* CODES */
    ```
        - 메모가 작성되면 새 메모를 읽어오도록 명령하고, 해당 작업이 끝나면 성공했다고 알림을 띄움.

- 무한스크롤링 구현
    - Home 컨테이너 컴포넌트 스크롤 리스너 작성
    ```js
    componentDidMount() {
        /* CODES */

        $(window).scroll(() => {
            // WHEN HEIGHT UNDER SCROLLBOTTOM IS LESS THEN 250
            if ($(document).height() <= $(window).scrollTop() + $(window).height()) {
                console.log('LOAD NOW');
            }
        })
    }
    ```
    - 구간에 들어갔을때 처음에만 한번 코드를 실행하게 해야한다.
    - 이 문제는 state 를 사용하여 해결
    ```js
    constructor(props) {
        super(props);

        this.loadNewMemo = this.loadNewMemo.bind(this);
        this.handlePost = this.handlePost.bind(this);

        this.state = {
            loadingState: false
        };
    }

    componentDidMount() {
        /* CODES */
        $(window).scroll(() => {
            // WHEN HEIGHT UNDER SCROLLBOTTOM IS LESS THEN 250
            if ($(document).height() - $(window).height() - $(window).scrollTop() < 250) {
                if(!this.state.loadingState){
                    console.log("LOAD NOW");
                    this.setState({
                        loadingState: true
                    });
                }
            } else {
                if(this.state.loadingState){
                    this.setState({
                        loadingState: false
                    });
                }
            }
        });
                  
    }
    ```
    - Home 컨테이너 컴포넌트에 실제 로딩 구현
        - mapStateToProps 부분에 state.memo.list.isLast 를 연결 (마지막 페이지에 도달 했을 시, 요청을 취소하기 위함)
        - loadOldMemo 메소드 만듦
        - 만약에 현재 읽고 있는 페이지가 마지막 페이지라면 요청이 취소되도록.
        - 나중에 이 메소드를 사용하고 .then() 을 사용 할 수 있도록 취소 할 땐 비어있는 Promise 를 리턴 (이 부분 이해가 잘 안감)
        - 이전 메모들을 불러오기위하여 페이지에 로드된 메모 중 최하단 메모의 id 를 API로 전해주기
        - API 를 실행 후, 만약에 방금 읽어들인 페이지가 마지막페이지라면 알림을 띄우도록
        - componentWillUnmount 에는 스크롤 리스너를 제거하는 unbind 코드 추가.

    - 사용자 화면의 해상도가 무척 높다면 처음에 스크롤바가 생기지 않을것.
        - 초기 로딩을 한다음에 스크롤바가 만약에 안생겼다면 이전 메모로딩을 스크롤바가 생길 때 까지 반복
        - 스크롤바가 있는지 없는지 체크
        ```js
        componentDidMount() {
        /* CODES */

            const loadUntilScrollable = () => {
                // IF THE SCROLLBAR DOES NOT EXIST,
                if($("body").height() < $(window).height()) {
                    this.loadOldMemo().then(
                        () => {
                            // DO THIS RECURSIVELY UNLESS IT'S LAST PAGE
                            if(!this.props.isLast) {
                                loadUntilScrollable();
                            }
                        }
                    );
                }
            };

            this.props.memoListRequest(true).then(
                () => {
                    // BEGIN NEW MEMO LOADING LOOP
                    loadUntilScrollable();
                    loadMemoLoop();
                }
            );


            /* CODES */


        }
        ```

</br>

#### 발견에러 및 해결방법
- server/routes/memo 에서 memos 철자 에러 해결.
- 스크롤시 oldmemo 불러오지 못하는 에러. 
    - reducer 에서 data $push 를 하지 않음.
    - 해결
- 지난 post를 불러오는 GET이 너무 느리다 어떻게 해결해야 할지 잘 모르겠다.
- memoloop사용시 스크롤링으로 예전 메모를 로드하면 5초가 지난뒤 화면엔 최근 메모로 다시 돌아가는 문제.
    ```js
    loadNewMemo() {
        /* code */

        return this.props.memoListRequest(true, 'new', this.props.memoData[0]._id);
        // 이 부분 true도 false여야 하는데 false로 하면 새메모가 트리거 되지도 않고
        // 같은 키를 가진 차일드가 두개가 있다고 에러가 나는데 뭔지 모르겠음..
    }
    ```
    - reducer에서 return을 두번함으로 인한 오류같음 해결됨.


</br>
</br>

### Step 10 (17.11.29)

#### 작업내역
- 삭제기능 구현하기
    - Action Types 추가
    - memo action 파일 수정
    - memoRemoveRequest 구현
    - memo 리듀서 파일 수정
    - Home 컨테이너 컴포넌트에서 삭제를 위한 state/dispatch 매핑
    - handleRemove 구현
    - MemoList 컴포넌트에서 위에서 받은 값 Memo 로 전달
    - Memo 컴포넌트 삭제기능 구현

- 수정기능 구현하기  
    메모 수정의 경우, 메모 수정이 성공하면, 수정된 메모 객체를 반환
    전달받은 객체를 리스트에 있던 데이터가 있던 자리에 갈아끼워주자.
    - Memo 컴포넌트 수정기능 토글
    - Memo 컴포넌트 editView 완성하기
    - Action Type 추가, memo 액션파일 수정 
    - memoEditRequest 구현
    - memo 리듀서 수정
    - Home 컨테이너 컴포넌트에서 memoEditRequest, editStatus 매핑 
    - handleEdit 구현
    - MemoList 컴포넌트에서 onEdit 함수 Memo로 전달
    - Memo 컴포넌트 수정기능 구현

</br>

#### 발견에러 및 해결방법
- Encountered two children with the same key error 
    - reducer에서 listsuccess시에 if, else문과 return에서 문제발생하는 걸로 보여 수정. 해결
- handleRemove method 에서 500(Internal Server Error) 에러.
    - server/routes/memo.js 에서 req를 res로 철자오류
        ```js
        Memo.findById(req.params.id, (err, memo) => {
            // codes..
        }
        ```
- 맨 위에 있는 메모들은 delete시에 없어지지만 다른 아이디가 생성한 메모 밑에 있는 어떤 메모들은   
  delete api는 적용되지만 새로고침하지 않는 이상 뷰에서 사라지지 않는 문제
- put 요청은 되는데 Cannot read property 'writer' of undefined,  
  he above error occurred in the <MemoList> component: 에러 발생.
  - actions/memo.js에서 ``dispatch(memoEditSuccess(index, response.data.memo));`` 부분 뒤 memo를 contents 로 오타 

</br>
</br>

### Step 11 (17.12.01)

#### 작업내역

- 로딩, 삭제시 애니메이션  
    ReactCSSTransitionGroup 라이브러리 사용  
    특정 컴포넌트가 로딩 될 때 지정한 CSS 클래스를 적용시켜주고, 언로딩 될 때   
    언로딩을 지정한 시간만큼 지연시킨후 CSS 클래스를 적용시킨다음에 애니메이션이 끝나면 언로딩시킴.
    - memo-enter스타일 클래스 추가
    - MemoList 컴포넌트에서 ReactCSSTransitionGroup 사용 
    - 새메모 작성시 fade-in 되고 삭제시 fade-out 되면서 오른쪽으로 Slide 되도록.(바로 사라지면 부자연스럽기때문에, height 를 서서히 0으로 조절)
    - 메모가 삭제될때 가로 스크롤바가 페이지에 만들어지지 않도록 style의 최상단에 overflow-x 를 hidden으로 설정

- 별점 주기 기능
    - 별점 API 구현
    - Action Types 추가
    - memo 액션파일 수정
    - memoStarRequest 구현
    - memo 리듀서 파일 수정
    - Home 컨테이너 컴포넌트 memoStarRequest, starStatus 매핑하기 
    - handleStar 구현
    - MemoList 컴포넌트 수정
    - Memo 컴포넌트 handleStar 구현

- 성능 최적화
    - Memo 컴포넌트의 render() 메소드의 최상단에 console.log(this.props.data) 를 입력하고 개발자도구를 켜보면   
    렌더링이 엄청나게 많이 진행되고있다는 사실을 파악 할 수 있을겁니다.  
    변경되지 않은 이미 렌더링 한 컴포넌트에서 render() 메소드가 실행되고있다.  
    이 문제가 발생하는 이유는, redux store 에 API 관련 status 가 업데이트 될 때도 컴포넌트가 업데이트되기 때문  
    (컴포넌트가 다시 렌더링 되지는 않지만, render 메소드가 실행 되고, 변화가 있나 없나 계산을 하기 때문)  
    이 문제를 해결하기 위해서 먼저 MemoList 컴포넌트를 수정
    </br>
    ``문제점 1``: 5초마다 새 게시물 불러오기 시도를 할 때, 새로운 게시물이 없더라도 렌더링 메소드가 실행 된다, 그것도 두번.  
    ``이유``: Home 컴포넌트의 listStatus.status 가 ‘WAITING’ 로 변한다음, ‘SUCCESS’ 로 변하면서 두번
    </br>
    ``문제점 2``: 스크롤 해서 이전 게시물을 불러오려고 시도 할 때, 렌더링 메소드가 4번이나 실행 된다.  
    ``이유``: Home 컴포넌트의 무한스크롤링을 위한 state.loadingStatus 이 토글 되면서 한번, listStatus 때문에 두번,   
    마지막으로 Home 컴포넌트에서 새 데이터를 갖다줘서 한번

    - MemoList 컴포넌트가 전달 받은 props 가 변경 될 때 render 메소드가 트리거 됨.  
    그리고 전달받은 props에 변화가 없더라도 패런트 컴포넌트 (Home) 에서 render 메소드가 실행 될 때도 render 메소드가 트리거  
    이를 막아주려면 LifeCycle API 인 shouldComponentUpdate 를 사용해야 함.

    - MemoList 컴포넌트에 shouldComponentUpdate 메소드 추가
    ```js
    shouldComponentUpdate(nextProps, nextState) {
        let update = JSON.stringify(this.props) !== JSON.stringify(nextProps);
        return update;
    }
    ```
    위와 같이 전달받은 props 값이 달라질때만 render() 메소드를 실행하도록 설정하면 위 문제들이 완화됨.

    - Memo 컴포넌트에 shouldComponentUpdate 메소드 추가 
        - 이렇게 추가해주면 CPU 자원이 낭비되는 문제를 해결.

- 유저 검색기능 구현하기
    - 특정유저의 메모 불러오는 API 만들기
    - Wall 컨테이너 컴포넌트 만들기
    - 컨테이너 인덱스에 Wall 추가
    - Index에서 /wall/:username 라우트 추가

</br>

#### 발견에러 및 해결방법
- 별점시 404에러. memoStarRequest 요청시에 /api/memo/star/ 에서 star 뒤 / 빼먹음으로 인한 에러. 

</br>
</br>

### Step 12 (17.12.02)

#### 작업내역

- 유저 검색기능 구현하기 이어서
    - 기존에 작성한 actions/memo.js의 memoListRequest 에서 특정 유저의 메모를 불러올 수 있도록 수정
        - 이제 username 이 주어진다면 요청 할 URL이 다르게 설정 될것.
    - Home 컴포넌트에서 memoListRequest 를 사용 할 때, username 을 parameter 로 전달
    - Wall 컨테이너 컴포넌트에서 Home 컴포넌트 불러와서 렌더링
        - 여기까지하면 /wall/:username 으로 직접 링크를 쳐서 들어갔을때, 초기 로딩은 잘 되지만  
        그 상태에서 나중에 다른사람을 검색해서 또 들어갔을때 (Link 컴포넌트를 통하여 라우팅 했을 경우)  
        컴포넌트가 unmount 되고 다시 mount 되는게 아니라 update 되기 때문에 원하는대로 작동하지 않는다.  
        따라서 componentDidUpdate LifeCycle API 를 통하여 username 이 변한것을 감지하고 변했을 시  
        componentWillUnmount 와 componentDidMount 메소드를 임의로 실행한다. 이렇게 한다고 다시 Mount 되는것은 아니지만  
        unmount 될 때와 mount 될 때 실행하도록 지정한 코드들을 실행 할 수 있다.

        - Home 컨테이너 컴포넌트 오류 미리 해결하기  
        componentDidMount 부분에 loadUntilScrollable 메소드를 메모 초기 로딩 후 1초뒤 실행시키도록 함  
        (나중에 담벼락의 유저가 변경되면서 메모가 사라질 때도 애니메이션이 적용된다.  
        애니메이션이 1초 걸리기때문에 1초뒤에 스크롤바가 있는지 없는지 확인하고 추가로딩 여부를 정하도록)  
        이 부분을 해결해놓지 않으면 나중에 메모를 처음 로딩 하는 부분에서 최종적으론 스크롤바가 없어도 스크롤바가 있는것으로 인식 할 가능성.

    - 담벼락 헤더를 위한 스타일 추가
        - 담벼락 헤더 랜더링  
        이제 헤더가 보이긴 하지만 로딩 하는 과정에서 배열의 크기가 0이기 때문에 아주 짧은 시간동안 메모가 없다는 메시지가 뜰 수 있음.  
        이 부분을 고치려면 state 를 통하여 initiallyLoaded 라는 값을 만들어서 이 값이 true 일때만 해당 메시지를 보여주도록 설정  
        컴포넌트가 생성 되었을 때 값은 false 이고 첫 불러오기 요청이 끝났을때 값을 true로 설정.  
        그리고 component가 unmount 될 때는 false로 다시 초기화

    - initiallyLoaded state 만들기 

    - Memo 컴포넌트 유저네임 클릭시 담벼락으로 이동

    - 검색창 구현하기


#### 발견오류 및 해결방법

- 라우터 설정문제로 wall에서 계속된 404에러. historyApiFallback: true 설정도 되어있는데 에러가 남
    - index.html 파일이 bundle.js 하나에서만 로드 될 수 있기 때문에 브라우저는 경로가 주소 표시 줄의 경로와 관련 있다고 간주. 
    - 서버의 실제 파일 구조가 무엇인지 전혀 알 수 없으므로 이 경우 루트 상대 경로를 사용해야 한다.
    ```html
    <script src="bundle.js"></script>  // x
    <script src="/bundle.js"></script> // o
    // 출처: https://teamtreehouse.com/community/encountering-a-neterraborted-error-and-404-error-when-refreshing-page-within-3-nested-routes
    ```

</br>
</br>

### Step 12 (17.12.02)

#### 작업내역

- 유저 검색 구현하기 이어서
    - 검색창 구현하기
        - 유저 검색 API 만들기
        - Search 컴포넌트 생성
            - 4가지 Method 설정  
            1. onClose 를 사용하는 handleClose 메소드  
            2. onSearch 를 사용하는 handleSearch 메소드  
            3. input 박스 내용이 수정되면 실행될 handleChange 메소드    
            4. input 박스에서 enter 키가 눌려지면 맨 위에있는 유저네임의 ‘담벼락’ 이동을 위한 handleKeyDown 메소드
            - esc 이벤트 리스너 추가
            - mapDataToLinks 구현 ( Link Router로 검색된 아이디 enter시에 '/wall/:username'으로 이동 )
            - browserHistory가 이제 적용되지 않아 다르게 구현했는데 제대로 작동할지 모르겠다.
        - Search 컴포넌트 스타일 추가
        - 컴포넌트 인덱스에 Search 컴포넌트 추가
        - Header 에서 Search 컴포넌트 로딩 및 검색버튼 누르면 보여지도록 설정 
            ```js
            <ReactCSSTransitionGroup transitionName="search" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                {this.state.search ? <Search onClose={this.toggleSearch} 
                                             onSearch={this.props.onSearch}
                                             usernames={this.props.usernames}/> : undefined}
            </ReactCSSTransitionGroup>
            ```
            - toggleSearch 는 state.search 값을 true, false로 토글하는 메소드
        - 검색창 애니메이션 스타일 구현
            - 검색시 위에서 내려오고 닫을 시 위로 올라가도록.

        - ActionTypes 생성
        - search actionCreate 구현
        - search reducer 구현
        - search props and dispatch mapping in containers/App.js
        - handleSearch method 구현
        - Header.js에 전달받은 onSearch 와 searchStatus 를 Search 컴포넌트로 전달
        - Search.js 전달받은 onSearch 와 usernames 를 사용하여 Search 컴포넌트 완성 (handleSearch 구현)

- 빌드
    - webpack.config.js 수정
        ```js
        var webpack = require('webpack');

        module.exports = {
            /* CODES */
            
            plugins:[
                new webpack.DefinePlugin({
                'process.env':{
                    'NODE_ENV': JSON.stringify('production')
                }
                }),
                new webpack.optimize.UglifyJsPlugin({
                compress:{
                    warnings: true
                }
                })
            ]
        };
        // webpack 을 require 하고 plugins: 부분에 위 처럼 설정을 하면 
        // 코드가 production 환경으로 컴파일 된다 (일부 경고 출력 사라짐)
        // 또한 코드가 Uglify 되어 (불필요한 공백 제거) 코드의 용량이 줄어듦
        ```
    - 빌드 스크립트 실행
    ```
    npm run build
    npm run start # run the server in production mode
    ```

- IE 호환하기
    - Promise 는 구버전의 브라우저에서 지원하지 않으므로 babel-polyfill을 통하여 호환
    ```
    npm install --save babel-polyfill
    ```
    - webpack.config.js / webpack.dev.config.js 수정

    ```js
    module.exports = {

    entry: [
        'babel-polyfill'
    ]
    // entry에 추가해주면 된다.
    ```

- Express API Cache-Control 설정
    - 크롬에선 문제가 없는데 IE에선 캐시 컨트롤을 이상하게 하게 되면서 새 메모를 불러오지 못하는 버그가 있다.
    ```js
    // (server/routes/index.js)
    import express from 'express';
    import account from './account';
    import memo from './memo';

    const router = express.Router();

    router.use('/*', (req, res, next) => {
        res.setHeader("Expires", "-1");
        res.setHeader("Cache-Control", "must-revalidate, private");
        next();
    });

    router.use('/account', account);
    router.use('/memo', memo);

    export default router;
    ```

</br>

#### 발견에러와 해결방법
- 큰 문제는 없었다


