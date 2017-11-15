'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // 회원가입 / 로그인 / 현재세션체크 API 를 담당할 account 라우터 입니다


router.post('/signup', function (req, res) {
    /* to be implemented */
    res.json({ success: true });
});

router.post('/signin', function (req, res) {
    /* to be implemented */
    res.json({ success: true });
});

router.get('/getinfo', function (req, res) {
    res.json({ info: null });
});

router.post('/logout', function (req, res) {
    res.json({ success: true });
});

exports.default = router;