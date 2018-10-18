import * as React from 'react';
import { connect } from 'react-redux'

import './Title.less'

interface Iprops {
    current_index: number
}

function Title(props: Iprops) {
    if(props.current_index < 9) {
        return (
            <div className="Title">
                安全风险管控检查信息走势图
            </div>
        );
    }
    else {
        return (
            <div className="Title">
                劳动安全风险管控图
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        current_index: state.config.current_index
    }
}

export default connect(mapStateToProps)(Title);