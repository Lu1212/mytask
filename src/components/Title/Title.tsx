import * as React from 'react';
import { connect } from 'react-redux'

import './Title.less'

interface Iprops {
    current_index: number
}

function Title(props: Iprops) {
    let text: string

    if(props.current_index < 9) {
        text = '安全风险管控检查信息走势图'
    }
    else {
        text = '劳动安全风险管控图'
    }

    return (
        <div className="Title">
            {text}
        </div>
    )
}

function mapStateToProps(state: any) {
    return {
        current_index: state.config.current_index
    }
}

export default connect(mapStateToProps)(Title);