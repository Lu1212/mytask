import * as React from 'react';
import { connect } from 'react-redux'

import './ChartArea.less'

interface Iprops {
    state: any,
    yAxis: any
}

interface IState {
    dataList: any
}

class ChartArea extends React.Component<Iprops, IState> {
    private canvas: React.RefObject<any>
    constructor(props: any) {
        super(props)
        this.canvas = React.createRef()
        this.state = {
            dataList: null,
        }
    }

    public componentDidMount() {
        this.drawLine()
    }

    public componentDidUpdate() {
        this.drawLine()
    }

    public drawLine() {
        const canvas = this.canvas.current
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
        const obj = this.props.state
        const current_index = this.props.state.config.current_index
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
        
        // const dataList = dataVal[dataLen.indexOf(Math.max(...dataLen))].map((key: any, index: any) => {
        //     return <li className="listItem" key={index}>{key}</li>
        // })

        // this.setState({
        //     dataList
        // })

        Object.keys(data).map((key, index) => {
            const maxNum = Math.max(...this.props.yAxis)
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

    public render() {
        const obj = this.props.state
        const current_index = this.props.state.config.current_index
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
            <React.Fragment>
                <canvas ref={this.canvas} id="canvas" />
                {/* <ul className="dataList">{this.state.dataList}</ul> */}
                <ul className="dataList">{dataList}</ul>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        state
    }
}

export default connect(mapStateToProps)(ChartArea);