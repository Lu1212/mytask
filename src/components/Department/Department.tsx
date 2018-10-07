import * as React from 'react';
import { connect } from 'react-redux'

import './Department.less'

function Department(props: any) {
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
    if(props.config.current_index < 9) {
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
    return state
}

export default connect(mapStateToProps)(Department);