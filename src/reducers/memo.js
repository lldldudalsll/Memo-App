import * as types from 'actions/ActionTypes';
import update from 'immutability-helper';

const initialState = {
    post: {
        status: 'INIT',
        error: -1
    },
    list: {
        status: 'INIT',
        data: [],
        isLast: false
        // isLast 값은 현재 로딩된 페이지가 마지막페이지인지 아닌지 알려주기 위함.
        // 나중에 무한 스크롤링 기능 구현시 마지막 페이지에 도달하면 스크롤링이 멈추도록 해야 하므로
    }
};

export default function memo(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }

    switch(action.type) {
        // Post
        case types.MEMO_POST:
            return update(state, {
                post: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.MEMO_POST_SUCCESS:
            return update(state, {
                post: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.MEMO_POST_FAILURE:
            return update(state, {
                post: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        // List
        case types.MEMO_LIST:
            return update(state, {
                list: {
                    status: { $set: 'WAITING' },
                }
            });
        case types.MEMO_LIST_SUCCESS:
            if(action.isInitial){
                return update(state, {
                    list: {
                        status: { $set: 'SUCCESS' },
                        data: { $set: action.data },
                        isLast: { $set: action.data.length < 6 }
                    }
                });
            } else {
                if(action.isInitial === "new") {
                    return update(state, {
                        list: {
                            status: { $set: 'SUCCESS'},
                            data: { $unshift: action.data }
                            // 배열의 앞 부분에 데이터를 추가할땐 $unshift 연산자를, 뒷 부분에 추가 할 땐 $push 연산자를 사용.
                        }
                    });
                } else {
                    return update(state, {
                        list: {
                            status: { $set: 'SUCCESS' },
                            data: { $push: action.data },
                            isLast: { $set: action.data.length < 6 }
                        }
                    });
                }
            }
            
            return state;
        case types.MEMO_LIST_FAILURE:
            return update(state, {
                list: {
                    status: { $set: 'FAILURE' }
                }
            })
        default:
            return state;
    }
}