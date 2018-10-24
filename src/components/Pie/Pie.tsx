/*
 *  接收currnet_index和state，用current_index匹配当前项
 *  模块初始化时从新计算max_index，把count为0的项减去
 *  影响因素：
 *     外部：currnet_index、state
 */

import * as React from 'react';
import { connect } from 'react-redux';
import './Pie.less';

interface Iprops {
    data: {
        min_index: number,
        data: object
    },
    current_index: number,
    changeMaxIndex: (newIndex: number) => void
}

class Pie extends React.Component<Iprops, {}> {
    private right: React.RefObject<HTMLDivElement>
    constructor(props: Iprops) {
        super(props);
        this.right = React.createRef();
    }

    public componentWillMount() {
        this.calculateMaxIndex(this.initData(this.props.data.data).nonZero)
    }

    public componentDidUpdate() {
        this.initPie(this.right.current, this.initData(this.props.data.data).pieData, this.props.current_index)
    }

    public render() {
        const leftItem = this.initLeftItem(this.initData(this.props.data.data).pieData, this.props.current_index);

        return (<div className="Pie">
                    <ul className="left">{leftItem}</ul>
                    <div className="right" ref={this.right} />
                </div>)
    }

    //  这个函数返回两个值，pieData为排序后的数据，用于渲染组件。nonZero为非零数据长度，用于计算新的max_index
    private initData(obj: object) {
        //  取到饼图数据，并从新排序，把数值为0的项放在末尾，返回排序后的数据
        const pieData: object[] = [];
        const nonZeroData: object[] = [];
        let nonZero: number;

        Object.keys(obj).map((key) => {
            if (obj[key].count !== 0) {
                pieData.push({
                    "name": obj[key].name,
                    "value": obj[key].count
                })
                nonZeroData.push({
                    "name": obj[key].name,
                    "value": obj[key].count
                })
            }
        })
        nonZero = nonZeroData.length

        Object.keys(obj).map((key) => {
            if (obj[key].count === 0) {
                pieData.push({
                    "name": obj[key].name,
                    "value": obj[key].count
                })
            }
        })

        return {pieData, nonZero};
    }

    //  重新计算整个数据的max_index,并通过changeMaxIndex函数修改数据的max_index
    private calculateMaxIndex(num: number) {
        const newIndex = this.props.data.min_index + (num - 1);
        this.props.changeMaxIndex(newIndex)
    }

    private initPie(ref: HTMLElement | null, pieData: object[], currentIndex: number, NUM = 9) {
        const echarts = require('echarts');
        const myChart = echarts.init(ref);

        const legend: string[] = [];  //  图例文本
        let sum = 0;  //  劳安事故总数
        let numerator = 0;  //  当前项事故数
        let percent = 0;  //  占比

        //  计算legend和percent的值
        Object.keys(pieData).map((key, index) => {
            sum = sum + pieData[key].value
            if (currentIndex === (index + NUM)) {
                legend.push(pieData[key].name)
                numerator = pieData[key].value
            }
        })
        percent = numerator / sum * 100

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
                data: pieData,
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
            type: 'pieSelect',
            dataIndex: (currentIndex - NUM)
        })
    }
    
    private initLeftItem(pieData: object[], currentIndex: number, NUM = 9) {
        const item = Object.keys(pieData).map((key, index) => {
            let isActive = ''
            if (currentIndex === (index + NUM)) {
                isActive = 'active'
            }
            return  (<li className={isActive} key={index}>
                        <span className="index">{index + 1}</span>
                            {pieData[key].name}
                        <span className="count">{pieData[key].value}</span>
                    </li>);
        })

        return item;
    }
}

function mapStateToProps(state: any) {
    return {
        data: state.security,
        current_index: state.config.current_index
    };
}

function mapDispatchToProps(dispatch: any) {
    return{ 
        changeMaxIndex(newIndex: number) {
            dispatch({
                type: 'CHANGE_MAX_INDEX',
                index: newIndex
            })
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pie);
