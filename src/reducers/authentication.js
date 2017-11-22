import * as types from 'actions/ActionTypes';
import update from 'immutability-helper'; // (Redux 의 store 값을 변경 할 때 사용됨)

const initialState = {
    login: {
        status: 'INIT'
    },
    register: {
        status: 'INIT',
        error: -1
    },
    status: {
        valid: false,
        isLoggedIn: false,
        currentUser: '',
    }
};

export default function authentication(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }

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
        
        /* REGISTER */
        case types.AUTH_REGISTER:
            return update(state, {
                register: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.AUTH_REGISTER_SUCCESS:
            return update(state, {
                register: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.AUTH_REGISTER_FAILURE:
            return update(state, {
                register: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        
        /* SESSION */
        case types.AUTH_GET_STATUS:
            return update(state, {
                status: {
                    isLoggedIn: { $set: true }
                }
            });
        case types.AUTH_GET_STATUS_SUCCESS:
            return update(state, {
                status: {
                    valid: { $set: true },
                    currentUser: { $set: action.username }
                }
            }); 
        case types.AUTH_GET_STATUS_FAILURE:
            return update(state, {
                status: {
                    valid: { $set: false },
                    isLoggedIn: { $set: false }
                }
            });
        /* LOGOUT */
        case types.AUTH_LOGOUT:
            return update(state, {
                status: {
                    isLoggedIn: { $set: false },
                    currentUser: { $set: '' }
                }
            });
        default:
            return state;
    }
    
}

// thunk 를 리턴하는 loginRequest는 리듀서에서 따로 case를 지정해주지 않아도 됩니다.

// import * as types from ‘actions/ActionTypes’;  
// 이 코드는 ActionTypes 에서 export 한 모든 상수를 types 객체에 넣어서 불러옵니다.

// session
// 페이지가 새로고침 되었을 때 세션이 유효하다면 true, 만료되었거나 비정상적이면 false
// AUTH_GET_STATUS 는 쿠키에 세션이 저장 된 상태에서, 새로고침을 했을 때 만 실행.
// 액션이 처음 실행 될 때, isLoggedIn 을 true 로 하는 이유는, 이렇게 하지 않으면 로그인 된 상태에서 새로고침 했을 때,
// 세션 확인 AJAX 요청이 끝날때까지 (아주 짧은시간이지만) 컴포넌트가 현재 로그인상태가 아닌것으로 인식하기 때문에
// 미세한 시간이지만 살짝 깜빡임이 있을것. (로그인 버튼에서 로그아웃 버튼으로 변하면서)
// 이를 방지하기위하여 요청을 시작 할때는 컴포넌트에서 로그인 상태인 것으로 인식하게 하고
// 세션이 유효하다면 그대로 두고 그렇지 않다면 로그아웃상태로 만들어야 한다.
