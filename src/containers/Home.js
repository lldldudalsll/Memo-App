import React from 'react';
import { connect } from 'react-redux';
import { Write, MemoList } from 'components';
import { memoPostRequest, memoListRequest } from 'actions/memo';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.handlePost = this.handlePost.bind(this);
        this.loadNewMemo = this.loadNewMemo.bind(this);
        this.loadOldMemo = this.loadOldMemo.bind(this);

        this.state = {
            loadingState: false
        }
    }

    componentDidMount() {
        // LOAD NEW MEMO EVERY 5 SECONDS
        // const loadMemoLoop = () => {
        //     this.loadNewMemo().then(
        //         () => {
        //             this.memoLoaderTimeoutId = setTimeout(loadMemoLoop, 5000);
        //         }
        //     );
        // };

        const loadUntilScrollable = () => {
            // IF THE SCROLLBAR DOES NOT EXIST,
            if($("body").height() < $(window).height()) {
                this.loadOldMemo().then(
                    () => {
                        // DO THIS RECURSIVELY UNLESS IT'S LAST PAGE
                        if(!this.props.isLast) {
                            loadUntilScrollable();
                        }
                    }
                );
            }
        };

        this.props.memoListRequest(true, undefined, undefined, this.props.username).then(
            () => {
                // BEGIN NEW MEMO LOADING LOOP
                loadUntilScrollable();
                // loadMemoLoop();
            }
        );

        $(window).scroll(() => {
            // WHEN HEIGHT UNDER SCROLLBOTTOM IS LESS THEN 250
            if($(document).height() <= $(window).height() + $(window).scrollTop()) {
                if(!this.state.loadingState) {
                    // console.log('LOAD NOW');
                    this.loadOldMemo();
                    this.setState({
                        loadingState: true
                    });
                }
            } else {
                if(this.state.loadingState) {
                    this.setState({
                        loadingState: false
                    });
                }
            }
        });
    }

    componentWillUnmount() {
        // STOPS THE loadMemoLoop
        clearTimeout(this.memoLoaderTimeoutId);

        // REMOVE WINDOWS SCROLL LISTENER
        $(window).unbind();
    }

    loadNewMemo() {
        // CANCEL IF THERE IS A PENDING REQUEST
        if(this.props.listStatus === 'WAITING') { // 새 메모를 작성 할 때 새 메모를 읽게 끔 트리거 하는 기능도 구현 할 텐데, 
                                                  // 상태가 ‘WAITING’ 일때 무시하는 코드를 넣지 않으면 똑같은 요청을 두번 할 수 도 있게 되기 때문입니다.
            return new Promise((resolve, reject) => {
                resolve();
                // 이 부분에서 그냥 return 을 해도 되지만, 비어있는 Promise 를 리턴한 이유는, Write 에서 해당 메소드를 입력하고 
                // .then 을 사용 할 수 있게 만들기 위함입니다
                // (메소드를 실행 하고, 성공메시지 / Write 내용초기화를 할건데,
                // 여기서 그냥 return; 을 날려버리면 만약에 요청이 중첩됐을 때 먹통이 됩니다)
            });
        }
        // IF PAGE IS EMPTY, DO THE INITIAL LOADING
        if(this.props.memoData.length === 0) 
            return this.props.memoListRequest(true);
        

        return this.props.memoListRequest(true, 'new', this.props.memoData[0]._id);
    }

    loadOldMemo() {
        // CANCEL IF USER IS READING THE LAST PAGE
        if(this.props.isLast) {
            return new Promise(
                (resolve, reject)=> {
                    resolve();
                }
            );
        }

        // GET ID OF THE MEMO AT THE BOTTOM
        let lastId = this.props.memoData[this.props.memoData.length - 1]._id;

        // START REQUEST
        return this.props.memoListRequest(false, 'old', lastId).then(() => {
            // IF IT IS LAST PAGE, NOTIFY
            
            if(this.props.isLast) {
                Materialize.toast('You are reading the last page', 2000);
            }
        });
    }

    // Post memo
    handlePost(contents) {
        return this.props.memoPostRequest(contents).then(
            () => {
                if(this.props.postStatus.status === 'SUCCESS') {
                    // TRIGGER LOAD NEW MEMO
                    this.loadNewMemo().then(
                        () => {
                            Materialize.toast('Success!', 2000);
                        }
                    );
                } else {
                    let $toastContent
                    switch(this.props.postStatus.error) {
                        case 1:
                            // 로그인 되지 않았다면 알림과 새로고침
                            $toastContent = $('<span style="color: #FFB4BA">You are not logged in</span>');
                            Materialize.toast($toastContent, 2000);
                            setTimeout(()=> {location.reload(false);}, 2000);
                            break;
                        case 2:
                            $toastContent = $('<span style="color: #FFB4BA">Please write something</span>');
                            Materialize.toast($toastContent, 2000);
                            break;
                        case 3:
                            $toastContent = $('<span style="color: #FFB4BA">Something Broke</span>');
                            Materialize.toast($toastContent, 2000);
                            break;
                    }
                }
            }
        )
    }

    render() {
        const write = ( <Write onPost={this.handlePost}/> );

        return(
            <div className="wrapper">
                { this.props.isLoggedIn ? write : undefined }
                <MemoList data={this.props.memoData} currentUser={this.props.currentUser}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.memo.post,
        currentUser: state.authentication.status.currentUser,
        memoData: state.memo.list.data,
        listStatus: state.memo.list.status,
        isLast: state.memo.list.isLast
    };
};
// redux state안에 있는걸 이 컴포넌트의 props로 mapping해주는 것.

const mapDispatchToProps = (dispatch) => {
    return {
        memoPostRequest: (contents) => {
            return dispatch(memoPostRequest(contents))
        },
        memoListRequest: (isInitial, listType, id, username) => {
            return dispatch(memoListRequest(isInitial, listType, id, username))
        }
    };
};
// action을 dispatch 하는 함수를 props로 연결해 주는것.

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// connect([...options]) 
// 이 함수는 options를 인수로 받고 컴포넌트를 redux에 연결하는 함수를 반환합니다.
// 다시한번 강조하지만 ‘또다른 함수를 반환’ 하는 것입니다. 그래서 그 함수에다가
// connect()(Home) 이렇게 홈을 인수로 전달해주면
// Home이 redux에 연결이 되서 이 함수의 반환값으로 새로운 컴포넌트 클래스가 반환됩니다.

// 새로운 컴포넌트 클래스는 redux에 연결이 되어있습니다!
// 그렇다고 해서 기존에 있던 Home 컴포넌트가 변경되는건 아니고
// 새로운 컴포넌트가 반환되는 겁니다.

// 만약에 connect()(Home)에서 처럼 connect에 옵션을 전달하지 않았다면
// 컴포넌트 내부에서 this.props.store로 접근할 수 있습니다.
// 그럼 렌더링 할때 그 스토어를 사용해서 getState로 특정값을 가져오면 되겠고
// 그게 아니고 변화를 일으킨다면 dispatch 하면 되는 것입니다!.
// 그런데 만약에 여기 옵션을 넣어준다면 더 깔끔해지고 편해집니다.

