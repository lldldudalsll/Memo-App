import React from 'react';
import { Authentication } from 'components';
import { connect } from 'react-redux';
import { loginRequest } from 'actions/authentication';

class Login extends React.Component {

    constructor(props){
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    } 

    handleLogin(id, pw){
        return this.props.loginRequest(id, pw).then(
            () => {
                if(this.props.status === 'SUCCESS'){
                    // create session data
                    let loginData = {
                        isLoggedIn: true,
                        username: id
                    };

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                    Materialize.toast('Welcome ' + id + '!', 2000);
                    const { history } = this.props;
                    history.push('/');
                    return true;
                } else {
                    let $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        )
    }

    render() {
        return(
            <div>
                <Authentication 
                    mode={true}
                    onLogin={this.handleLogin}
                    />
            </div>
        );
    }
}

const mapStateToProps = (state) => { // redux의 state가 mapStateToProps 함수를 통해 React의 props로 전달됩니다. 
    return {
        status: state.authentication.login.status 
    };
};

const mapDispatchToProps = (dispatch) => { // dispatch를 parameter로 가지는 함수이고 dispatch를 해당 컴포넌트의 props로 연결해주는 것입니다.
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id, pw));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// react-redux 를 통하여 컴포넌트를 Redux에 연결하고,
// 로그인요청을하는 loginRequest 와 로그인 요청 상태인 status 를 authentication 컴포넌트에 매핑 해줍니다.

