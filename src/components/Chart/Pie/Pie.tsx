import * as React from 'react';
import { connect } from 'react-redux'

import './Pie.less'

interface Iprops {
    state: any,
    changeMaxIndex: any
}

interface Istate {
    data: any,
    pieData: any
}

class Pie extends React.Component<Iprops, Istate> {
    private right: React.RefObject<any>
    constructor(props: any) {
        super(props)
        this.right = React.createRef()
        this.state = {
            data: [],
            pieData: [],
        }
    }

    public componentWillMount() {
        this.initData()
    }

    public componentDidUpdate() {
        const obj = this.state.data
        const current_index = this.props.state.config.current_index
        const legend: any = []
        let sum = 0
        let numerator = 0
        let percent = 0
        Object.keys(obj).map((key, index) => {
            sum = sum + obj[key].count
            if(current_index === (index + 9)) {
                legend.push(obj[key].name)
                numerator = obj[key].count
            }
        })
        percent = numerator / sum * 100

        this.initPie(legend, percent)
    }

    public initPie(legend: any, percent: any) {
        const echarts = require('echarts')
        const myChart = echarts.init(this.right.current)

        myChart.setOption({
            legend: {
                bottom: '25%',
                data: legend,
                icon: 'circle',
                itemHeight: 20,
                itemWidth: 20,
                left: '40%',
                selectedMode: false,
                textStyle: {
                    color: '#fff',
                    fontSize: 20,
                    fontWeight: 'bold',
                    padding: [0, 0, 0, 15],
                },
            },
            series: [{
                center: ['55%', '35%'],
                data: this.state.pieData,
                label: false,
                labelLine: false,
                radius: ['20%','50%'],
                type: 'pie',
            }],
            title: {
                bottom: '15%',
                left: '50%',
                text: "占比" + percent + "%",
                textStyle: {
                    color: '#fff',
                    fontSize: 20,
                    fontWeight: 'lighter'
                },
            },
            
        })

        myChart.dispatchAction({
            dataIndex: (this.props.state.config.current_index - 9),
            type: 'pieSelect',
        })
    }

    public initData() {
        const obj = this.props.state.security.data
        const data: any = []
        const pieData: any = []
        const pieNum: any = []
        Object.keys(obj).map((key) => {
            if(obj[key].count !== 0) {
                data.push(obj[key])
                pieNum.push(obj[key].count)
                pieData.push({
                    "name": obj[key].name,
                    "value": obj[key].count
                })
            }
        })

        this.calculateMaxIndex(pieData.length)

        Object.keys(obj).map((key) => {
            if(obj[key].count === 0) {
                data.push(obj[key])
            }
        })

        this.setState({
            data,
            pieData
        })
    }

    public calculateMaxIndex(num: any) {
        const newIndex = this.props.state.security.min_index + (num - 1)
        this.props.changeMaxIndex(newIndex)
    }

    public render() {
        const obj = this.state.data
        const current_index = this.props.state.config.current_index
        const item = Object.keys(obj).map((key, index) => {
            let isActive = ''
            if(current_index === (index + 9)) {
                isActive = 'active'
            }
            return  (
                        <li className={isActive} key={index}>
                            <span className="index">{index + 1}</span>
                                {obj[key].name}
                            <span className="count">{obj[key].count}</span>
                        </li>
                    )
        })

        return (
            <div className="Pie">
                <ul className="left">{item}</ul>
                <div className="right" ref={this.right} />
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        state
    }
}

function mapDispatchToProps(dispatch: any) {
    return{ 
        changeMaxIndex(newIndex: any) {
            dispatch({
                index: newIndex,
                type: 'CHANGE_MAX_INDEX',
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pie);