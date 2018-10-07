import * as React from 'react';
import { connect } from 'react-redux'

import './ChartTable.less'

interface Iprops {
    yAxis: any
}

interface Istate {
    height: any
}

class ChartTable extends React.Component<Iprops, Istate> {
    private ChartTableHook: React.RefObject<any>
    constructor(props: any) {
        super(props)
        this.ChartTableHook = React.createRef()
        this.state = {height: ''}
    }
    public componentDidMount() {
        this.setState({
            height: this.ChartTableHook.current.clientHeight
        })
    }
    public render() {
        const yAxis = this.props.yAxis
        const itemHeight = this.state.height / yAxis.length
        const ChartTables = yAxis.map((item: any, index: any) => {
            return (
                <li className="row" style={{top: index * itemHeight}} key={item.toString()} />
            )
        })
        return (
            <ul className="ChartTable" ref={this.ChartTableHook}>
                {ChartTables}
            </ul>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        state
    }
}

export default connect(mapStateToProps)(ChartTable);