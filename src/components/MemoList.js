import React, { Component } from 'react';
import { Memo } from 'components';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// ReactCSSTransitionGroup 컴포넌트를 애니메이션을 적용 할 컴포넌트에 안에서 사용 할 게아니라, 해당 컴포넌트의 부모 컴포넌트에서 사용해야 함

class MemoList extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        let update = JSON.stringify(this.props) !== JSON.stringify(nextProps);
        return update;
    }

    render() {
        // console.log('MemoList render method executed');
        const mapToComponents = data => {
            return data.map((memo, i) => {
                    return (<Memo
                                data={memo}
                                ownership={ (memo.writer === this.props.currentUser) }
                                key={memo._id}
                                index={i}
                                onRemove={this.props.onRemove}
                                onEdit={this.props.onEdit}
                                onStar={this.props.onStar}
                                currentUser={this.props.currentUser}                                
                            />);
            });
        };

        return (
            <div>
                <ReactCSSTransitionGroup 
                    transitionName="memo"
                    transitionEnterTimeout={2000}
                    transitionLeaveTimeout={1000}>
                    {mapToComponents(this.props.data)}
                </ReactCSSTransitionGroup>
                {/* { maptoComponents.this.props.data) } 를 다른 엘리먼트로 감싸면 애니메이션이 작동하지 않음 */}
            </div>
        );
    }
}

MemoList.propTypes = {
    data: PropTypes.array,
    currentUser: PropTypes.string,
    onRemove: PropTypes.func,
    onEdit: PropTypes.func,
    onStar: PropTypes.func
}

MemoList.defaultProps = {
    data: [],
    currentUser: '',
    onRemove: (id, index) => {
        console.error('remove function not defined'); 
    },
    onEdit: (id, index, contents) => { // index 라는 props 도 전달 (값은 매핑 함수에서 i로 지정) 이 props는 해당 메모가 몇번째 메모인지 알려줍니다.
        console.error('edit function not defined')
    },
    onStar: (id, index) => {
        console.error('star function not defined');
    }
}

export default MemoList;