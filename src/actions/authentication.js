import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE
} from './ActionTypes';

import thunk from 'redux-thunk';
import axios from 'axios';


/*====================================================
    authentication
=====================================================*/

/* LOGIN */
// loginRequest는 다른 action creator 완 달리 또 다른 함수를 리턴 합니다.(thunk)
// thunk 는 특정 작업의 처리를 미루기위해서 함수로 wrapping 하는것을 의미.
// loginRequest 는 dispatch 를 파라미터로 갖는 thunk 를 리턴.
// 그리고 나중에 컴포넌트에서 dispatch(loginRequest(username, pssword)) 를 하게 되면, (컨테이너/레지스터)
// 미들웨어를 통하여 loginRequest 가 반환한 thunk 를 처리.
export function loginRequest(username, password) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(login());

        // API REQUEST
        return axios.post('/api/account/signin', { username, password })
        .then((response) => {
            // SUCCEED
            dispatch(loginSuccess(username));
        })
        .catch((error) => {
            // FAILED
            dispatch(loginFailure())
        });
    };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}

/* Register */
export function registerRequest(username, password) {
    return (dispatch) => {
        // Inform Register API is starting
        dispatch(register());

        return axios.post('/api/account/signup', { username, password })
        .then((response) => {
            dispatch(registerSuccess());
        }).catch((error) => {
            dispatch(registerFailure(error.response.data.code));
        });
    };
}

export function register() {
    return {
        type: AUTH_REGISTER
    };
}

export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS,
    };
}

export function registerFailure(error) {
    return {
        type: AUTH_REGISTER_FAILURE,
        error
    };
}