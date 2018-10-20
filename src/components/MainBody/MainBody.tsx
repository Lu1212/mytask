/*
 *  入口，接收current_index，由current_index决定加载Chart组件还是Pie组件
 *  定时器也放在了这里，可以修改切换的时间间隔
 *  影响因素：
 *    外部：current_index
 *    内部：42行，修改切换的时间间隔
 *  功能：实现current_index自动递增
 */

import * as React from 'react';
import { connect } from 'react-redux';
import Chart from '../Chart/Chart';
import Department from '../Department/Department';
import Pie from '../Pie/Pie';
import Shifter from '../Shifter/Shifter';
import Tab from '../Tab/Tab';
import Title from '../Title/Title';
import './MainBody.less';

interface Iprops {
    current_index: number,
    addIndex: () => void
}

interface Istate {
    timer: any
}

class MainBody extends React.Component<Iprops, Istate> {
    constructor(props: Iprops) {
        super(props);
        this.state = {
            timer: null
        };
    }

    //  把定时器移到这里,定时派发addIndex事件，使current_index递增
    public componentDidMount(){
        this.setState({
            timer: setInterval(() => {
                this.props.addIndex()
            }, 20000) //  <==  此处可修改current_index递增递增时间间隔
        })
    }
    
    public render() {
        return (
            <div className="MainBody">
                <Tab />
                <Department />
                <Title />
                <Shifter />
                <div className='content'>
                    {(this.props.current_index < 9) ? <Chart /> : <Pie />}
                </div>
            </div>
        );
    }

    //  卸载时清除定时器
    public componentWillUnmount() {
        clearInterval(this.state.timer)
    }
}

function mapStateToProps(state: any) {
    return {
        current_index: state.config.current_index
    };
}

function mapDispatchToProps(dispatch: any) {
    return{
        addIndex() {
            dispatch({
                type: 'ADD_INDEX'
            })
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainBody);
