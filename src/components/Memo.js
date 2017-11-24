import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';

class Memo extends Component {
    render() {
        const { data, ownership } = this.props; // 비구조화 할당.

        const dropDownMenu = (
            <div className="option-button">
                <a className='dropdown-button' 
                    id={`dropdown-button-${data._id}`} 
                    data-activates={`dropdown-${data._id}`}>
                    <i className="material-icons icon-button">more_vert</i>
                </a>
                <ul id={`dropdown-${data._id}`} className='dropdown-content'>
                    <li><a>Edit</a></li>
                    <li><a>Remove</a></li>
                </ul>
            </div>
        );

        const memoView = (
            <div className="card">
                <div className="info">
                    <a className="username">{this.props.data.writer}</a> wrote a log · <TimeAgo date={this.props.data.date.created}/>
                    { ownership ? dropDownMenu : undefined }
                </div>
                <div className="card-content">
                    {data.contents}
                </div>
                <div className="footer">
                    <i className="material-icons log-footer-icon star icon-button">star</i>
                    <span className="star-count">{data.starred.length}</span>
                </div>
            </div>
        );

        return (
            <div className="container memo">
                { memoView }
            </div>
        );
    }

    componentDidUpdate() {
        // WHEN COMPONENT UPDATES, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN LOGGED IN)
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
    }

    componentDidMount() {
        // WHEN COMPONENT MOUNTS, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN REFRESHED)
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
    }
}

Memo.propTypes = {
    data: PropTypes.object,
    ownership: PropTypes.bool
}

Memo.defaultProps = {
    data: {
        _id: 'id1234567890',
        writer: 'Writer',
        contents: 'Contents',
        is_edited: false,
        date: {
            edited: new Date(),
            created: new Date()
        },
        starred: []
    },
    ownership: true
}

export default Memo;

// 이 컴포넌트는 Memo에 필요한 값들을 객체형으로 받아오게 하겠습니다.
// 나중에 컴포넌트 Mapping 을 할텐데 이렇게 하는편이 편하기 때문(원한다면 객체형으로 하지 않고 분리해도 됨)
// ownership prop  은 해당 메모가 자신의 메모인지 아닌지 여부를 확인하는 값.

// `…${expression}…` 같은 표현은, ES6의 Template Literals 라는 문법입니다. 문자열 템플릿 안에 변수/상수 값을 손쉽게 넣을 수 있습니다.
// (이걸 사용하지 않는다면 ‘dropdown-‘ + ___  뭐 이런식으로 했어야겠죠? Template Literals 를 사용하면 읽기가 더 편합니다.
    
    