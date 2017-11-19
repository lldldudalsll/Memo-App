import authentication from './authentication';

import { combineReducers } from 'redux';

export default combineReducers({
    authentication
});

// 지금은 리듀서가 하나지만, 나중에 여러개를 만들것이므로 combineReducers 를 사용해줍니다.

