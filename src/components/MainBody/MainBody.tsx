import * as React from 'react';
import { connect } from 'react-redux'

import './MainBody.less'

import Chart from '../Chart/Chart'
import Department from '../Department/Department'
import Shifter from '../Shifter/Shifter'
import Tab from '../Tab/Tab'
import Title from '../Title/Title'

interface Iprops {
    addIndex: () => void
}

interface Istate {
    timer: any
}

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
                <Chart />
            </div>
        );
    }

    public componentDidMount(){
        this.setState({
            timer: setInterval(() => {
                this.props.addIndex()
            }, 2000)
        })
    }

    public componentWillUnmount() {
        clearInterval(this.state.timer)
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

export default connect(null, mapDispatchToProps)(MainBody);