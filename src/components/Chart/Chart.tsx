import * as React from 'react';
import { connect } from 'react-redux'

import './Chart.less'

import ChartArea from './ChartArea/ChartArea'
import ChartTable from './ChartTable/ChartTable'
import Pie from './Pie/Pie'
import TableNumbers from './TableNumbers/TableNumbers'

interface IProps {
    state: any,
}

class Chart extends React.Component<IProps> {
    public render() {
        const yAxis = [10, 20, 30, 40, 50, 60, 70, 80]
        const index = this.props.state.config.current_index

        if(index < 9) {
            return (
                <div className="Chart">
                    <ChartTable yAxis={yAxis}/>
                    <TableNumbers yAxis={yAxis}/>
                    <ChartArea yAxis={yAxis}/>
                </div>
            );
        }
        else {
            return (
                <div className="Chart">
                    <Pie />
                </div>
            )
        }
    }
}

function mapStateToProps(state: any) {
    return {
        state
    }
}

export default connect(mapStateToProps)(Chart);