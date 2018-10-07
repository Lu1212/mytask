import * as React from 'react';
import { connect } from 'react-redux'

import './TableNumbers.less'

interface Iprops {
    yAxis: any
}

interface Istate {
    height: any
}

class TableNumbers extends React.Component<Iprops, Istate> {
    private TableNumbersHook: React.RefObject<any>
    constructor(props: any) {
        super(props)
        this.TableNumbersHook = React.createRef()
        this.state = {height: ''}
    }
    public componentDidMount() {
        this.setState({
            height: this.TableNumbersHook.current.clientHeight
        })
    }
    public render() {
        const yAxis = this.props.yAxis
        const itemHeight = this.state.height / yAxis.length
        const TableNumber = yAxis.map((item: any, index: any) => {
            return (
                <li className="row" style={{top: index * itemHeight}} key={item.toString()}>
                    {yAxis[yAxis.length - (index + 1)]}
                </li>
            )
        })
        return (
            <ul className="TableNumbers" ref={this.TableNumbersHook}>
                {TableNumber}
                <span className="zero">0</span>
            </ul>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        state
    }
}

export default connect(mapStateToProps)(TableNumbers);