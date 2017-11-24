import authentication from './authentication';
import memo from './memo';

import { combineReducers } from 'redux';

export default combineReducers({
    authentication, 
    memo
});

// Reducer란 변화를 일으키는 함수이고 순수해야 합니다.

// 비동기작업 x (http작업같은)
// 인수 변경 x
// 동일한 인수 = 동일한 결과
// 이전 상태와 액션을 받아서 다음 상태를 반환합니다.

// 여기서 중요!! 이전 상태를 변경하는게 아니라 그저 새로운 상태를 반환하는 것!
// reducer 안에서 인수로 전달받은 기존 상태를 복사하고 액션에 따라 변화를 주고 반환하는 것입니다.
