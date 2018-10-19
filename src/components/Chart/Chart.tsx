import * as React from 'react'
import { connect } from 'react-redux'

import './Chart.less'

interface IProps {
    state: any,
    current_index: number
}

interface Istate {
    height: any,
    yAxis: number[],
    dataList: any
}

class Chart extends React.Component<IProps, Istate> {
    private canvas: React.RefObject<any>
    constructor(props: any) {
        super(props)
        this.canvas = React.createRef()
        this.state = {
            height: '',
            yAxis: [10, 20, 30, 40, 50, 60, 70, 80],
            dataList: null,
        }
    }

    public componentDidMount() {
        this.setState({
            height: this.canvas.current.clientHeight
        })
        this.drawLine()
    }

    public componentDidUpdate() {
        this.drawLine()
    }

    public render() {
        const ChartTables = this.initChartTable()
        const TableNumber = this.initTableNumber()

        const obj = this.props.state
        const current_index = this.props.current_index
        let data: any = null
        const dataLen: any = []
        const dataVal: any = []

        Object.keys(obj).map((key) => {
            if(obj[key].type === 'line') {
                if(obj[key].min_index <= current_index) {
                    if(current_index <= obj[key].max_index) {
                        const objChild = obj[key].accident
                        Object.keys(objChild).map((childKey) => {
                            if(objChild[childKey].type_index === current_index) {
                                data = objChild[childKey].data
                            }
                        })
                    }
                }
            }
        })

        Object.keys(data).map((key) => {
            dataLen.push(Object.keys(data[key]).length)
            dataVal.push(Object.keys(data[key]))
        })

        const dataList = dataVal[dataLen.indexOf(Math.max(...dataLen))].map((key: any, index: any) => {
            return <li className="listItem" key={index}>{key}</li>
        })

        return (
            <div className="Chart">
                <ul className="ChartTable">
                    {ChartTables}
                </ul>

                <ul className="TableNumbers">
                    {TableNumber}
                    <span className="zero">0</span>
                </ul>

                <canvas ref={this.canvas} id="canvas" />
                <ul className="dataList">{dataList}</ul>
            </div>
        )
    }

    private initChartTable() {
        const itemHeight = this.state.height / this.state.yAxis.length
        const ChartTables = this.state.yAxis.map((item: any, index: any) => {
            return (
                <li className="row" style={{top: index * itemHeight}} key={item.toString()} />
            )
        })
        return ChartTables
    }

    private initTableNumber() {
        const yAxis = this.state.yAxis
        const itemHeight = this.state.height / yAxis.length
        const TableNumber = yAxis.map((item: any, index: any) => {
            return (
                <li className="row" style={{top: index * itemHeight}} key={item.toString()}>
                    {yAxis[yAxis.length - (index + 1)]}
                </li>
            )
        })
        return TableNumber
    }

    private drawLine() {
        const canvas = this.canvas.current
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
        const obj = this.props.state
        const current_index = this.props.current_index
        let data: any = null
        const dataLen: any = []
        const dataVal: any = []
        const context = canvas.getContext("2d");

        Object.keys(obj).map((key) => {
            if(obj[key].type === 'line') {
                if(obj[key].min_index <= current_index) {
                    if(current_index <= obj[key].max_index) {
                        const objChild = obj[key].accident
                        Object.keys(objChild).map((childKey) => {
                            if(objChild[childKey].type_index === current_index) {
                                data = objChild[childKey].data
                            }
                        })
                    }
                }
            }
        })

        Object.keys(data).map((key) => {
            dataLen.push(Object.keys(data[key]).length)
            dataVal.push(Object.keys(data[key]))
        })
        
        Object.keys(data).map((key, index) => {
            const maxNum = Math.max(...this.state.yAxis)
            const width = this.canvas.current.clientWidth / (Math.max(...dataLen))
            const height = this.canvas.current.clientHeight / maxNum
            let color = ''
            if(key === 'ChengDu') {
                color = 'rgb(255, 0, 0)'
            }
            else if(key === 'GuiYang') {
                color = 'rgb(255, 255, 0)'
            }
            else {
                color = 'rgb(92, 138, 249)'
            }
            const objChild = data[key]
            const arr: any = []
            Object.keys(objChild).map((childKey) => {
                arr.push(objChild[childKey])
            })

            context.moveTo(0, height * (maxNum - arr[0]))

            if((Math.max(...dataLen) !== Math.min(...dataLen)) && (dataLen.indexOf(Math.max(...dataLen)) !== index)) {
                for(let i = 1; i < (arr.length); i ++) {
                    context.lineTo((width * i) + (width / 2), height * (maxNum - arr[i]))
                }
            }
            else {
                for(let k = 1; k < (arr.length - 1); k ++) {
                    context.lineTo((width * k) + (width / 2), height * (maxNum - arr[k]))
                }
                context.lineTo(this.canvas.current.clientWidth, height * (maxNum - arr[arr.length - 1]))
            }
            
            context.strokeStyle = color
            context.stroke()
        })
    }
}

function mapStateToProps(state: any) {
    return {
        state,
        current_index: state.config.current_index
    }
}

export default connect(mapStateToProps)(Chart);