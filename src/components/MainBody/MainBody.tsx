import * as React from 'react';
import { connect } from 'react-redux'

import './MainBody.less'

import Content from '../Content/Content'
import Department from '../Department/Department'
import Tab from '../Tab/Tab'

interface Iprops {
    addIndex: any
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
                <Content />
            </div>
        );
    }

    public componentDidMount(){
        this.setState({
            timer: setInterval(() => {
                console.log(123)
                this.props.addIndex()
            }, 2000)
        })
    }

    public componentWillUnmount() {
        clearInterval(this.state.timer)
    }
}

function mapStateToProps() {
    // return state
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