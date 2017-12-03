import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            keyword: ''
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        const listenEscKey = (evt) => {
            evt = evt || window.event;
            if (evt.keyCode == 27) {
                this.handleClose();
            }
        }

        document.onkeydown = listenEscKey;
    }

    handleClose() {
        this.handleSearch('');
        document.onkeydown = null
        this.props.onClose();
    }

    handleChange(e) {
        this.setState({
            keyword: e.target.value
        });
        this.handleSearch(e.target.value);
    }

    handleSearch(keyword) {
        this.props.onSearch(keyword);
    }

    handleKeyDown(e) {
        // IF PRESSED ENTER, TRIGGER TO NAVIGATE TO THE FIRST USER SHOWN
        if(e.keyCoded === 13) {
            if(this.props.usernames.length > 0) {
                this.props.history.push('/wall/' + this.props.usernames[0].username);
                this.handleClose();
            }
        }

    }

    render() {

        // const mapToComponents = data => {
        //     return data.map((memo, i) => {
        //         return (<Memo
        //                     data={memo}
        //                     ownership={ (memo.writer === this.props.currentUser) }
        //                     key={memo._id}
        //                     index={i}
        //                     onRemove={this.props.onRemove}
        //                     onEdit={this.props.onEdit}
        //                     onStar={this.props.onStar}
        //                     currentUser={this.props.currentUser}                                
        //                 />);
        //     });
        // };

        const mapDataToLinks = (data) => {
            return data.map((user, i) => {
                return (
                    <Link onClick={this.handleClose} to={`/wall/${user.username}`} key={i}>
                        {user.username}
                    </Link>
                )
            })
        };

        return (
            <div className="search-screen white-text">
                <div className="right">
                    <a className="waves-effect waves-light btn red lighten-1"
                            onClick={this.handleClose}>CLOSE</a>
                </div>
                <div className="container">
                    <input placeholder="Search a user"
                                value={this.state.keyword}
                                onChange={this.handleChange}
                                onKeyDown={this.handleKeyDown}>
                    </input>
                    <ul className="search-results">
                        { mapDataToLinks(this.props.usernames) }
                    </ul>
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    onClose: PropTypes.func,
    onSearch: PropTypes.func,
    usernames: PropTypes.array
}

Search.defaultProps = {
    onClose: () => {
        console.error('onClose not defined');
    },
    onSearch: () => {
        console.error('onSearch not defined');
    },
    usernames: []
}

export default Search;