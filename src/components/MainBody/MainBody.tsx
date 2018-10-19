import * as React from 'react';
import { connect } from 'react-redux'

import './MainBody.less'

import Chart from '../Chart/Chart'
import Department from '../Department/Department'
import Pie from '../Pie/Pie'
import Shifter from '../Shifter/Shifter'
import Tab from '../Tab/Tab'
import Title from '../Title/Title'

interface Iprops {
    current_index: number,
    addIndex: () => void
}

interface Istate {
    timer: any
}

//  移除connect
class MainBody extends React.Component<Iprops, Istate> {
    constructor(props: any) {
        super(props);
        this.state = {
            timer: null
        }
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

    //  把定时器移到这里
    public componentDidMount(){
        this.setState({
            timer: setInterval(() => {
                this.props.addIndex()
            }, 2000)
        })
    }

    //  卸载是清除定时器
    public componentWillUnmount() {
        clearInterval(this.state.timer)
    }
}

function mapStateToProps(state: any) {
    return {
        current_index: state.config.current_index
    }
}

function mapDispatchToProps(dispatch: any) {
    return{
        addIndex() {
            dispatch({
                type: 'ADD_INDEX',
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainBody);