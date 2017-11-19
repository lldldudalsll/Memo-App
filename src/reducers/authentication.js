import * as types from 'actions/ActionTypes';
import update from 'react-addons-update'; // Immutability Helper (Redux 의 store 값을 변경 할 때 사용됨)

const initialState = {
    login: {
        status: 'INIT'
    },
    status: {
        isLoggedIn: false,
        currentUser: '',
    }
};

export default function authentication(state, action) {
    if(typeof state === "undefined") {
        state = initialState;

        switch(action.type) {
            /* LOGIN */
            case types.AUTH_LOGIN:
                return update(state, {
                    login: {
                        status: { $set: 'WAITING' }
                    }
                });
            case types.AUTH_LOGIN_SUCCESS:
                return update(state, {
                    login: {
                        status: { $set: 'SUCCESS' }
                    },
                    status: {
                        isLoggedIn: { $set: true },
                        currentUser: { $set: action.username }
                    }
                });
            case types.AUTH_LOGIN_FAILURE:
                return update(state, {
                    login: {
                        status: { $set: 'FAILURE' }
                    }
                });
            default:
                return state;
        }
        /* To be implemented.. */
    }
    return state;
}


// import * as types from ‘actions/ActionTypes’;  
// 이 코드는 ActionTypes 에서 export 한 모든 상수를 types 객체에 넣어서 불러옵니다.

// thunk 를 리턴하는 loginRequest는 리듀서에서 따로 case를 지정해주지 않아도 됩니다.

