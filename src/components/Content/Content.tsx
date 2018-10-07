import * as React from 'react';
import { connect } from 'react-redux'

import './Content.less'

import Chart from '../Chart/Chart'
import Shifter from '../Shifter/Shifter'
import Title from '../Title/Title'

class Content extends React.Component {
    public render() {
        return (
            <div className="Content">
                <Title />
                <Shifter />
                <Chart />
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return state
}

export default connect(mapStateToProps)(Content);