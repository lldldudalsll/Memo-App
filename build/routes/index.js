'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// api 루트 라우터 생성
var router = _express2.default.Router();
router.use('/account', _account2.default);

// 지금은 루트 라우터에서 account 라우터만 불러와서 사용하지만
// 나중에는 메모를 담당하는 memo 라우터도 불러와서 사용하게 됩니다

exports.default = router;