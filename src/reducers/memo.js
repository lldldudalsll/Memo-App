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
    },
    remove: {
        status: 'INIT',
        error: -1
    },
    edit: {
        status: 'INIT',
        error: -1,
    }
};

export default function memo(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }

    switch(action.type) { // 예상되는 값을 반환하는 표현식
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
            }
            if(action.listType === "new") {
                return update(state, {
                    list: {
                        status: { $set: 'SUCCESS' },
                        data: { $unshift: action.data }
                        // 배열의 앞 부분에 데이터를 추가할땐 $unshift 연산자를, 뒷 부분에 추가 할 땐 $push 연산자를 사용.
                    }
                });
            } 
            return update(state, {
                list: {
                    status: { $set: 'SUCCESS' },
                    data: { $push: action.data },
                    isLast: { $set: action.data.length < 6 }
                }
            });
                
        case types.MEMO_LIST_FAILURE:
            return update(state, {
                list: {
                    status: { $set: 'FAILURE' }
                }
            })

        // Remove
        case types.MEMO_REMOVE:
            return update(state, {
                remove: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.MEMO_REMOVE_SUCCESS:
            return update(state, {
                remove: {
                    status: { $set: 'SUCCESS' },
                },
                list: {
                    data: { $splice: [[action.index, 1]]}
                }
            });
        case types.MEMO_REMOVE_FAILURE:
            return update(state, {
                remove: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });

        // Edit
        case types.MEMO_EDIT:
            return update(state, {
                edit: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 },
                    memo: { $set: undefined}
                }
            });

        case types.MEMO_EDIT_SUCCESS:
            return update(state, {
                edit: {
                    status: { $set: 'SUCCESS' },
                },
                list: {
                    data: {
                        [action.index]: { $set: action.memo }
                        // list 의 데이터 중 [action.index] 번째 데이터를 새로운 데이터로 교체
                    }
                }
            });

        case types.MEMO_EDIT_FAILURE:
            return update(state, {
                edit: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        
        default:
            return state;
    }
}