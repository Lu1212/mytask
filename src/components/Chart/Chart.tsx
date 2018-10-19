import * as React from 'react'
import { connect } from 'react-redux'

import './Chart.less'

interface Iobj {
    type: string,
    min_index: number,
    max_index: number,
    accident: object
}

interface IobjChild {
    type_index: number,
    data: any
}

interface IProps {
    state: Iobj,
    current_index: number
}

interface Istate {
    height: number,
    yAxis: number[]
}

class Chart extends React.Component<IProps, Istate> {
    private canvas: React.RefObject<any>
    constructor(props: any) {
        super(props)
        this.canvas = React.createRef()
        this.state = {
            height: 0,
            yAxis: [10, 20, 30, 40, 50, 60, 70, 80]  //  Y轴坐标
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
        const DataList = this.initDataList()

        return (
            <div className="Chart">
                <ul className="ChartTable">
                    {ChartTables}
                </ul>

                <ul className="TableNumbers">
                    {TableNumber}
                    <span className="zero">0</span>
                </ul>

                <canvas id="canvas" ref={this.canvas} />

                <ul className="DataList">{DataList}</ul>
            </div>
        )
    }

    private initChartTable() {
        const yAxis: number[] = this.state.yAxis
        const itemHeight: number = this.state.height / this.state.yAxis.length
        const ChartTables: JSX.Element[] = yAxis.map((item: number, index: number) => {
            return (
                <li className="row" style={{top: index * itemHeight}} key={index} />
            )
        })
        return ChartTables
    }

    private initTableNumber() {
        const yAxis: number[] = this.state.yAxis
        const itemHeight: number = this.state.height / yAxis.length
        const TableNumber: JSX.Element[] = yAxis.map((item: number, index: number) => {
            return (
                <li className="row" style={{top: index * itemHeight}} key={index}>
                    {yAxis[yAxis.length - (index + 1)]}
                </li>
            )
        })
        return TableNumber
    }

    private drawLine() {
        //  canvas相关变量
        const canvas = this.canvas.current
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
        const context = canvas.getContext("2d");

        // 函数相关变量
        const obj: Iobj = this.props.state
        const current_index: number = this.props.current_index
        let objChild: IobjChild
        let data: any
        const dataLen: number[] = []
        const dataVal: any = []
        const maxNum: number = Math.max(...this.state.yAxis)
        let color: string

        Object.keys(obj).map((key: string) => {
            if((obj[key].type === 'line') && (obj[key].min_index <= current_index) && (current_index <= obj[key].max_index)) {
                objChild = obj[key].accident
                Object.keys(objChild).map((childKey: string) => {
                    if(objChild[childKey].type_index === current_index) {
                        data = objChild[childKey].data
                        Object.keys(data).map((dataKey: string, index: number) => {
                            const width = canvas.clientWidth / (Math.max(...dataLen))
                            const height = canvas.clientHeight / maxNum
                            const dataChild: any = data[dataKey]
                            const arr: number[] = []

                            dataLen.push(Object.keys(data[dataKey]).length)
                            dataVal.push(Object.keys(data[dataKey]))

                            if(dataKey === 'ChengDu') {
                                color = 'rgb(255, 0, 0)'
                            }
                            else if(dataKey === 'GuiYang') {
                                color = 'rgb(255, 255, 0)'
                            }
                            else {
                                color = 'rgb(92, 138, 249)'
                            }

                            Object.keys(dataChild).map((childItem: string) => {
                                arr.push(dataChild[childItem])
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
                })
            }
        })
    }

    private initDataList() {
        const obj = this.props.state
        const current_index = this.props.current_index
        let objChild: any
        let data: any
        const dataLen: number[] = []
        const dataVal: any = []

        Object.keys(obj).map((key: string) => {
            if((obj[key].type === 'line') && (obj[key].min_index <= current_index) && (current_index <= obj[key].max_index)) {
                objChild = obj[key].accident
                Object.keys(objChild).map((childKey: string) => {
                    if(objChild[childKey].type_index === current_index) {
                        data = objChild[childKey].data
                        Object.keys(data).map((dataKey: string) => {
                            dataLen.push(Object.keys(data[dataKey]).length)
                            dataVal.push(Object.keys(data[dataKey]))
                        })
                    }
                })
            }
        })

        const DataList = dataVal[dataLen.indexOf(Math.max(...dataLen))].map((key: string, index: number) => {
            return <li className="listItem" key={index}>{key}</li>
        })

        return DataList
    }    
}

function mapStateToProps(state: any) {
    return {
        state,
        current_index: state.config.current_index
    }
}

export default connect(mapStateToProps)(Chart);