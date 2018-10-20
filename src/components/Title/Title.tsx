/*
 *  接收current_index，根据current_index的值决定渲染那一条文本，对应的直线图还是饼图
 *  影响因素：
 *    外部：current_index
 *    内部：19行可修改文本
 */

import * as React from 'react';
import { connect } from 'react-redux';
import './Title.less';

interface Iprops {
    current_index: number
}

function Title(props: Iprops) {
    return (
        <div className="Title">
            {(props.current_index < 9) ? '安全风险管控检查信息走势图' : '劳动安全风险管控图'}  
        </div>
    );
}

function mapStateToProps(state: any) {
    return {
        current_index: state.config.current_index
    };
}

export default connect(mapStateToProps)(Title);
