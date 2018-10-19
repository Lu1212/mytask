import * as React from 'react';
import { connect } from 'react-redux'

import './Shifter.less'

interface Iprops {
    state: {
        type: string,
        min_index: number,
        max_index: number,
    },
    current_index: number,
    changeIndex: (newIndex: number) => void
}

class Shifter extends React.Component<Iprops, {}> {
    constructor(props: Iprops) {
        super(props)
    }
    
    public render() {
        const ShifterItem = this.initShifterItem()

        return (
            <React.Fragment>
                {
                    (this.props.current_index < 9) &&
                    <ul className="Shifter">
                        {ShifterItem}
                    </ul>
                }
            </React.Fragment>
        )
    }

    private initShifterItem() {
        const obj = this.props.state
        const current_index: number = this.props.current_index
        let classIndex: number
        let minIndex: number
        let objChild: any
        let ShifterItem: JSX.Element[] | null
        
        if(this.props.current_index < 9) {
            Object.keys(obj).map((key: string) => {
                if((obj[key].type === 'line') && (obj[key].min_index <= current_index) && (current_index <= obj[key].max_index)) {
                    minIndex = obj[key].min_index
                    objChild = obj[key].accident
                    Object.keys(objChild).map((childKey: string) => {
                        if(objChild[childKey].type_index === current_index) {
                            classIndex = objChild[childKey].class_index
                        }
                    })
                }
            })
        
            ShifterItem = (
                Object.keys(objChild).map((childKey: string, index: number) => {
                    if(index === classIndex) {
                        return <li className="active" key={index}>{objChild[childKey].name}<span>/</span></li>
                    }
                    else {
                        return <li key={index} onClick={this.shifterClick.bind(this, (minIndex + index))}>{objChild[childKey].name}<span>/</span></li>
                    }
                })
            )
            return ShifterItem
        }
        return
    }

    private shifterClick(index: number) {
        this.props.changeIndex(index)
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
        changeIndex(newIndex: number): void {
            dispatch({
                type: 'CHANGE_INDEX',
                index: newIndex,
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shifter);