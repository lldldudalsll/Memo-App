'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema; // Backend – 메모 작성 / 수정 / 삭제 / 읽기 구현하기
// Memo 모델 만들기


var Memo = new Schema({
    writer: String,
    contents: String,
    starred: [String],
    date: {
        created: { type: Date, default: Date.now },
        edited: { type: Date, default: Date.now }
    },
    is_edited: { type: Boolean, default: false }
});

exports.default = _mongoose2.default.model('memo', Memo);
// Schema 와 Model 의 차이는, Schema 는 그냥 데이터의 ‘틀’ 일 뿐이구요, 
// Model 은, 실제 데이터베이스에 접근 할 수 있게 해주는 클래스입니다
// 'memo' 는 컬렉션 이름! 알아서 복수로 저장됩니다. 이름을 정해주고 싶다면 세번째 인자로 넣어주면 됩니다.