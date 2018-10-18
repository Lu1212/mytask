import * as React from 'react';
import { connect } from 'react-redux'

import './Tab.less'

interface Iprops {
    state: any,
    current_index: number,
    changeIndex: (index: number) => void
}

class Tab extends React.Component<Iprops, {}> {
    constructor(props: any) {
        super(props)
    }

    public tabClick(index: number) {
        this.props.changeIndex(index)
    }

    public render() {
        const obj = this.props.state
        const current_index = this.props.current_index
        
        //  遍历obj，若current_index在当前项min_index - max_index区间内，则为当前项添加'current'
        const tabItem = Object.keys(obj).map((key: string, index: number) => {
            if(obj[key].ZH_name) {
                let isCruuent = ''
                if((obj[key].min_index <= current_index) && (current_index <= obj[key].max_index)) {
                    isCruuent = 'current'
                }
                return(
                    <li className={isCruuent} key={index} onClick={this.tabClick.bind(this, obj[key].min_index)}>
                        {obj[key].ZH_name}
                    </li>
                )
            }
            return
        })
        return (
            <React.Fragment>
                <ul className="Tab">
                    {tabItem}
                </ul>
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
        changeIndex(newIndex: number) {
            dispatch({
                index: newIndex,
                type: 'CHANGE_INDEX',
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab);