'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _account = require('../models/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 회원가입 / 로그인 / 현재세션체크 / 유저검색 API 를 담당할 account 라우터 */

var router = _express2.default.Router();

/*
    1. 회원가입 구현
    ACCOUNT SIGNUP: POST /api/account/signup
    BODY SAMPLE: { "username": "test", "password": "test" }
    ERROR CODES:
        1: BAD USERNAME
        2: BAD PASSWORD
        3: USERNAM EXISTS
*/
router.post('/signup', function (req, res) {
    // CHECK USERNAME FORMAT
    var usernameRegex = /^[a-z0-9]+$/;

    if (!usernameRegex.test(req.body.username)) {
        return res.status(400).json({
            error: 'BAD USERNAME',
            code: 1
        });
    }

    // CHECK PASS LENGTH
    if (req.body.password.length < 4 || typeof req.body.password !== "string") {
        return res.status(400).json({
            error: 'BAD PASSWORD',
            code: 2
        });
    }

    // CHECK USER EXISTANCE
    _account2.default.findOne({ username: req.body.username }, function (err, exists) {
        if (err) throw err;
        if (exists) {
            return res.status(400).json({
                error: 'USERNAME EXISTS',
                code: 3
            });
        }

        // CREATE ACCOUNT
        var account = new _account2.default({
            username: req.body.username,
            password: req.body.password
        });

        // account.password = generateHash(account.password);

        // SAVE IN THE DATABASE
        account.save(function (err) {
            if (err) throw err;
            return res.json({ success: true });
            // mongoose 의 사용법은, mongodb 의 명령어와 매우 비슷합니다.
            // 새 모델을 만들때는, 객체를 생성해주고, save 메소드를 통하여 값을 저장합니다.
        });
    });
});

/*
    2. 로그인 구현
    ACCOUNT SIGNIN: POST /api/account/signin
    BODY SAMPLE: { "username": "test", "password": "test" }
    ERROR CODES:
        1: LOGIN FAILED
*/
router.post('/signin', function (req, res) {
    if (typeof req.body.password !== "string") {
        return res.status(401).json({
            error: "password must be string",
            code: 1
        });
    }

    // FIND THE USER BY USERNAME
    _account2.default.findOne({ username: req.body.username }, function (err, account) {
        if (err) throw err;

        // CHECK ACCOUNT EXISTANCY
        if (!account) {
            return res.status(401).json({
                error: "please signup",
                code: 1
            });
        }

        // CHECK WHETHER THE PASSWORD IS VALID
        // if(!account.validateHash(res.body.password)){
        //     return res.status(401).json({
        //         error: "password is invaild, please check the password",
        //         code: 1
        //     });
        // }

        // ALTER SESSION
        // express session 을 다루는건 매우 간단합니다.
        // 따로 해야 할 건 없고, req.session 을 사용해서 그냥 객체 다루듯이 하면 됩니다
        var session = req.session;
        session.loginInfo = {
            _id: account._id,
            username: account.username
        };

        // RETURN SUCCESS
        return res.json({ success: true });
    });
});

/*
    3. 세션확인 구현
    GET CURRENT USER INFO GET /api/account/getInfo
*/
router.get('/getinfo', function (req, res) {
    if (typeof req.session.loginInfo === "undefined") {
        return res.status(401).json({
            error: 1
        });
    }

    res.json({ info: req.session.loginInfo });
    // 세션확인이 필요한 이유는, 클라이언트에서 로그인 시, 로그인 데이터를 쿠키에 담고 사용을 하고 있다가,
    // 만약에 새로고침을 해서 어플리케이션을 처음부터 다시 렌더링 하게 될 때, 
    // 지금 갖고 있는 쿠키가 유효한건지 체크를 해야 하기 때문입니다.
});

/*
    4. 로그아웃 구현
    LOGOUT: POST /api/account/logout
*/
router.post('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) throw err;
    });
    return res.json({ success: true });
    // 현재 세션을 파괴 할 때는 req.session.destroy() 를 사용하면 됩니다.
});

/*
    5. 유저 검색 API
    SEARCH USER: GET /api/account/search/:username
*/
router.get('/search/:username', function (req, res) {
    var re = new RegExp('^' + req.params.username);
    _account2.default.find({ username: { $regex: re } }, { _id: false, username: true }).limit(5).sort({ username: 1 }).exec(function (err, accounts) {
        if (err) throw err;
        res.json(accounts);
    });
});

// EMPTY SEARCH REQUEST: GET /api/account/search
router.get('/search', function (req, res) {
    res.json([]); // 키워드가 공백이라면, 비어있는 배열을 리턴하자.
});

exports.default = router;