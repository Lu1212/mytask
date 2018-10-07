import * as React from 'react';
import { connect } from 'react-redux'

import './Tab.less'

interface Iprops {
    state: any,
    current_index: any,
    tabIndex: any
}

class Tab extends React.Component<Iprops> {
    constructor(props: any) {
        super(props)
    }

    public tabClick(index: any) {
        this.props.tabIndex(index)
    }

    public render() {
        const obj = this.props.state
        const current_index = this.props.current_index
        const title = (
        <ul className="Tab">
            {Object.keys(obj).map((key, index) => {
                if(obj[key].ZH_name) {
                    let isCruuent = ''
                    if(obj[key].min_index <= current_index) {
                        if(current_index <= obj[key].max_index) {
                            isCruuent = 'current'
                        }
                    }
                    return(
                        <li className={isCruuent} key={index}  onClick={this.tabClick.bind(this, obj[key].min_index)}>
                            {obj[key].ZH_name}
                        </li>
                    )
                }
                else {
                    return null
                }
            })}
        </ul>
    )
    return (
        <React.Fragment>
            {title}
        </React.Fragment>
    )
    }
}

function mapStateToProps(state: any) {
    return {
        state,
        current_index: state.config.current_index
    }
}

function mapDispatchToProps(dispatch: any) {
    return{ 
        tabIndex(newIndex: any) {
            dispatch({
                index: newIndex,
                type: 'TAB_INDEX',
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab);