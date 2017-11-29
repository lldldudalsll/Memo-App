import React, { Component } from 'react';
import { Memo } from 'components';
import PropTypes from 'prop-types';

class MemoList extends Component {
    render() {

        const mapToComponents = data => {
            return data.map((memo, i) => {
                    return (<Memo
                                data={memo}
                                ownership={ (memo.writer === this.props.currentUser) }
                                key={memo._id}
                                index={i}
                                onRemove={this.props.onRemove}
                                onEdit={this.props.onEdit}
                                currentUser={this.props.currentUser}                                
                            />);
            });
        };

        return (
            <div>
                {/* <Memo/> */}
                {mapToComponents(this.props.data)}
            </div>
        );
    }
}

MemoList.propTypes = {
    data: PropTypes.array,
    currentUser: PropTypes.string,
    onRemove: PropTypes.func,
    onEdit: PropTypes.func
}

MemoList.defaultProps = {
    data: [],
    currentUser: '',
    onRemove: (id, index) => {
        console.error('remove function not defined'); 
    },
    onEdit: (id, index, contents) => { // index 라는 props 도 전달 (값은 매핑 함수에서 i로 지정) 이 props는 해당 메모가 몇번째 메모인지 알려줍니다.
        console.error('edit function not defined')
    }
}

export default MemoList;