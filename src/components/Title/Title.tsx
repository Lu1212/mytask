import * as React from 'react';
import { connect } from 'react-redux'

import './Title.less'

function Title(props: any) {
    if(props.config.current_index < 9) {
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
    return state
}

export default connect(mapStateToProps)(Title);