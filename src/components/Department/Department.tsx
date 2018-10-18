import * as React from 'react';
import { connect } from 'react-redux'

import './Department.less'

interface Iprops {
    current_index: number
}

function Department(props: Iprops) {
    const Departments = (
        <ul className="Department">
            <li className="Department-item">
                <span className="icon red" />
                <p className="name">成都动车段</p>
            </li>
            <li className="Department-item">
                <span className="icon yellow" />
                <p className="name">贵阳车辆段</p>
            </li>
            <li className="Department-item">
                <span className="icon blue" />
                <p className="name">重庆动车段</p>
            </li>
        </ul>
    )
    if(props.current_index < 9) {
        return (
            <React.Fragment>
                {Departments}
            </React.Fragment>
        )
    }
    else {
        return null
    }
}

function mapStateToProps(state: any) {
    return {
        current_index: state.config.current_index
    }
}

export default connect(mapStateToProps)(Department);