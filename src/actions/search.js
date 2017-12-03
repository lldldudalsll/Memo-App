import {
    USER_SEARCH,
    USER_SEARCH_SUCCESS,
    USER_SEARCH_FAILURE
} from './ActionTypes';

import axios from 'axios';

export function userSearchRequest(keyword) {
    return (dispatch) => {
        dispatch(userSearch());
    
        return axios.get('/api/account/search/' + keyword)
        .then((response) => {
            dispatch(userSearchSuccess(response.data));
        })
        .catch((error) => {
            dispatch(userSearchFailure());
        });
    };
}

export function userSearch() {
    return {
        type: USER_SEARCH
    };
}

export function userSearchSuccess(usernames) {
    // console.log(usernames);
    return {
        type: USER_SEARCH_SUCCESS,
        usernames
    };
}

export function userSearchFailure() {
    return {
        type: USER_SEARCH_FAILURE
    }
}