import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';

class Memo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            value: props.data.contents
        }

        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    toggleEdit() {
        if(this.state.editMode) {
            let id = this.props.data._id;
            let index = this.props.index;
            let contents = this.state.value;

            this.props.onEdit(id, index, contents).then(()=>{
                this.setState({
                    editMode: !this.state.editMode
                });
            })
        } else {
            this.setState({
                editMode: !this.state.editMode
            });
        }
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    handleRemove() {
        const id = this.props.data._id;
        const index = this.props.index;

        this.props.onRemove(id, index);
    }

    render() {
        var { data, ownership } = this.props; // 비구조화 할당.

        const dropDownMenu = (
            <div className="option-button">
                <a className='dropdown-button' 
                    id={`dropdown-button-${data._id}`} 
                    data-activates={`dropdown-${data._id}`}>
                    <i className="material-icons icon-button">more_vert</i>
                </a>
                <ul id={`dropdown-${data._id}`} className='dropdown-content'>
                    <li><a onClick={this.toggleEdit}>Edit</a></li>
                    <li><a onClick={this.handleRemove}>Remove</a></li>
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

        const editView = (
            <div className="write">
                <div className="card">
                    <div className="card-content">
                        <textarea
                            ref={ ref => { this.input = ref; } }
                            className="materialize-textarea"
                            value={this.state.value}
                            onChange={this.handleChange}></textarea>
                    </div>
                    <div className="card-action">
                        <a onClick={this.toggleEdit}>OK</a>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="container memo">
                { this.state.editMode? editView : memoView }
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
    ownership: PropTypes.bool,
    onRemove: PropTypes.func,
    onEdit: PropTypes.func
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
    ownership: true,
    onRemove: (id, index) => { 
        console.error('onRemove function not defined'); 
    },
    onEdit: (id, index, contents) => {
        console.error('onEdit function not defined')
    },
    index: -1
}

export default Memo;

// 이 컴포넌트는 Memo에 필요한 값들을 객체형으로 받아오게 하겠습니다.
// 나중에 컴포넌트 Mapping 을 할텐데 이렇게 하는편이 편하기 때문(원한다면 객체형으로 하지 않고 분리해도 됨)
// ownership prop  은 해당 메모가 자신의 메모인지 아닌지 여부를 확인하는 값.

// `…${expression}…` 같은 표현은, ES6의 Template Literals 라는 문법입니다. 문자열 템플릿 안에 변수/상수 값을 손쉽게 넣을 수 있습니다.
// (이걸 사용하지 않는다면 ‘dropdown-‘ + ___  뭐 이런식으로 했어야겠죠? Template Literals 를 사용하면 읽기가 더 편합니다.
    
    