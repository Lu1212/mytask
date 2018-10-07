import * as React from 'react';
import { connect } from 'react-redux'

import './Shifter.less'

interface Iprops {
    state: any,
    current_index: any,
    shifterIndex: any
}

class Shifter extends React.Component<Iprops> {
    constructor(props: any) {
        super(props)
    }

    public shifterClick(index: any) {
        this.props.shifterIndex(index)
    }
    public render() {
        const current_index = this.props.current_index

        if(current_index < 9) {
            const obj = this.props.state
            const items = ['火灾爆炸', '配件脱落', '制动抱闸']
            let classIndex: any = null
            let minIndex: any = null
            
            Object.keys(obj).map((key) => {
                if(obj[key].type === 'line') {
                    if(obj[key].min_index <= current_index) {
                        if(current_index <= obj[key].max_index) {
                            minIndex = obj[key].min_index
                            const objChild: any = obj[key].accident
                            Object.keys(objChild).map((childKey) => {
                                if(objChild[childKey].type_index === current_index) {
                                    classIndex= objChild[childKey].class_index
                                }
                            })
                        }
                    }
                }
            })
    
            const ShifterItem = items.map((item, index) => {
                if(index === classIndex) {
                    return <li className="active" key={index}>{item}<span>/</span></li>
                }
                else {
                    return <li key={index} onClick={this.shifterClick.bind(this, (minIndex + index))}>{item}<span>/</span></li>
                }
                
            })
            return (
                <ul className="Shifter">
                    {ShifterItem}
                </ul>
            );
        }
        else {
            return null
        }
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
        shifterIndex(newIndex: any) {
            dispatch({
                index: newIndex,
                type: 'SHIFTER_INDEX',
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shifter);