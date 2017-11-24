import React from 'react';
import { connect } from 'react-redux';
import { Write } from 'components';
import { memoPostRequest } from 'actions/memo';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.handlePost = this.handlePost.bind(this);
    }

    // Post memo
    handlePost(contents) {
        return this.props.memoPostRequest(contents).then(
            () => {
                if(this.props.postStatus.status === 'SUCCESS') {
                    // TRIGGER LOAD NEW MEMO
                    
                    Materialize.toast('Success!', 2000);
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.memo.post
    };
};
// redux state안에 있는걸 이 컴포넌트의 props로 mapping해주는 것.

const mapDispatchToProps = (dispatch) => {
    return {
        memoPostRequest: (contents) => {
            return dispatch(memoPostRequest(contents))
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

