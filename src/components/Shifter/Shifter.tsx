/*
 *  接收current_index和state数据
 *  首先由current_index决定是否显示组件
 *  看current_index落在的那个[min_index ~ max_index]区间就将shifter按钮的文本渲染成这个区间中accident的各子项的name的值
 *  可以不用写死shifter按钮里的文本啦，不怕数据的顺序不规律啦~~
 *  通过比较current_index落在的[min_index ~ max_index]区间中子项的type_index是否相等计算出需要高亮的项目并得到其class_index
 *  将这个高亮项目的class_index与shifter列表的index比较，对高亮的列表项添加样式
 *  影响因素：
 *    外部：current_index、state
 *  功能：点击shifter的按钮时将点击的按钮的index与current_index落在的[min_index ~ max_index]区间的min_index相加得出新的current_index并派发出去
 */

import * as React from 'react';;
import { connect } from 'react-redux';
import './Shifter.less'

interface Iprops {
    state: {
        type: string,
        min_index: number,
        max_index: number
    },
    current_index: number,
    changeIndex: (newIndex: number) => void
}

class Shifter extends React.Component<Iprops, {}> {
    constructor(props: Iprops) {
        super(props);
    }
    
    public render() {
        const ShifterItem = this.initShifterItem();

        //  由current_index决定是否显示组件
        return (
            <React.Fragment>
                {
                    (this.props.current_index < 9) &&
                    <ul className="Shifter">
                        {ShifterItem}
                    </ul>
                }
            </React.Fragment>
        );
    }

    private initShifterItem(): JSX.Element | undefined {
        const obj = this.props.state;
        const current_index = this.props.current_index;
        let classIndex: number;
        let minIndex: number;
        let objChild: any;
        let ShifterItem: any;
        
        if(this.props.current_index < 9) {
            Object.keys(obj).map((key) => {
                if((obj[key].type === 'line') && (obj[key].min_index <= current_index) && (current_index <= obj[key].max_index)) {
                    minIndex = obj[key].min_index
                    objChild = obj[key].accident
                    ShifterItem = (
                        Object.keys(objChild).map((childKey, index) => {
                            //  获取高亮项index
                            if(objChild[childKey].type_index === current_index) {
                                classIndex = objChild[childKey].class_index
                            }
                            //  点击高亮项不会派发shifterClick事件
                            if(index === classIndex) {
                                return <li className="active" key={index}>{objChild[childKey].name}<span>/</span></li>;
                            }
                            else {
                                return <li key={index} onClick={this.shifterClick.bind(this, (minIndex + index))}>{objChild[childKey].name}<span>/</span></li>;
                            }
                        })
                    )
                }
            })
            return ShifterItem;
        }
        return;
    }

    private shifterClick(index: number) {
        this.props.changeIndex(index)
    }
}

function mapStateToProps(state: any) {
    return {
        state,
        current_index: state.config.current_index
    };
}

function mapDispatchToProps(dispatch: any) {
    return{ 
        changeIndex(newIndex: number) {
            dispatch({
                type: 'CHANGE_INDEX',
                index: newIndex
            })
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Shifter);
