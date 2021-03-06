import React, { Component } from 'react';
import { Header } from 'components';
import { Home } from 'containers';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from 'actions/authentication';
import { userSearchRequest } from 'actions/search';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    // 컴포넌트가 만들어지고 첫 렌더링을 마친 후 실행된다. 이 안에서 다른 JS framework 연동,
    // setTimeout, setInterval 및 ajax, DOM처리 등을 사용 할 수 있다.
    componentDidMount() {
        // get cookie by name
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        // get loginData from cookie
        let loginData = getCookie('key');
        // console.log(loginData);

        // if loginData is undefined, do nothing
        if(typeof loginData === 'undefined') return;

        // decode base64 & parse json
        loginData = JSON.parse(atob(loginData));

        // if not logged in, do nothing
        if(!loginData.isLoggedIn) return;

        // page refreshed & has a session in cookie,
        // check whether this cookie is valid or not
        // const { getStatusRequest } = this.props;
        // const authentication = this.props;
        this.props.getStatusRequest().then(
            () => {
                // console.log(this.props.status);
                // if session is not valid
                if(!this.props.status.valid) {
                    // logout the session
                    loginData = {
                        isLoggedIn: false,
                        username: ''
                    };

                    document.cookie='key=' + btoa(JSON.stringify(loginData));
                    
                    // and notify
                    let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                    Materialize.toast($toastContent, 4000);
                }
            }
        );
    }

    handleLogout() {
        this.props.logoutRequest().then(
            () => {
                Materialize.toast('Good Bye!', 2000);
                // EMPTIES THE SESSION
                let loginData = {
                    isLoggedIn: false,
                    username: ''
                };

                document.cookie = 'key=' + btoa(JSON.stringify(loginData));
            }
        );
    }

    handleSearch(keyword) {
        this.props.userSearchRequest(keyword)
    }

    render(){
        /* Check whether current route is login or register using regex */
        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname)
        let le = /(wall)/;
        let isWall = le.test(this.props.location.pathname)

        return (
            <div>
                {isAuth ? undefined : <Header isLoggedIn={this.props.status.isLoggedIn}
                                                onLogout={this.handleLogout}
                                                onSearch={this.handleSearch}
                                                usernames={this.props.searchResults}/>}
                {isAuth || isWall ? undefined : <Home/>}
            </div>
        );
    }
    
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status,
        searchResults: state.search.usernames
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        },
        userSearchRequest: (keyword) => {
            return dispatch(userSearchRequest(keyword));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);