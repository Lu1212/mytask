import * as React from 'react';
import { connect } from 'react-redux'

import './MainBody.less'

import Content from '../Content/Content'
import Department from '../Department/Department'
import Tab from '../Tab/Tab'


class MainBody extends React.Component {
    public render() {
        return (
            <div className="MainBody">
                <Tab />
                <Department />
                <Content />
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return state
}

export default connect(mapStateToProps)(MainBody);