/*
 *  接收current_index和state数据，比较currnet_index和min_index、max_index
 *  看current_index落在那个[min_index ~ max_index]区间，就得到了需要高亮的项
 *  影响因素：
 *    外部：current_index、state
 *  功能：点击可以将current_index修改为点击项对应的min_index，实现跳转
 */

import * as React from 'react';
import { connect } from 'react-redux';
import './Tab.less';

interface Iprops {
    state: object,
    current_index: number,
    changeIndex: (newIndex: number) => void
}

class Tab extends React.Component<Iprops, {}> {
    constructor(props: Iprops) {
        super(props);
    }

    public render() {
        const tabItem = this.initTabItem();

        return (
            <ul className="Tab">
                {tabItem}
            </ul>
        )
    }

    private tabClick(index: number) {
        this.props.changeIndex(index)
    }

    private initTabItem() {
        const obj = this.props.state;
        
        //  遍历obj，若current_index在当前项min_index ~ max_index区间内，则高亮当前项
        const tabItem = Object.keys(obj).map((key, index) => {
            const current_index = this.props.current_index;
            let isCruuent = '';
            
            if (!obj[key].ZH_name) {
                return;
            }

            if ((obj[key].min_index <= current_index) &&
                (current_index <= obj[key].max_index)) {
                isCruuent = 'current'
            }

            return (
                //  点击tab将current_index设置为tab对应的min_index实现跳转
                <li className={isCruuent}
                    key={index} 
                    onClick={this.tabClick.bind(this, obj[key].min_index)}>
                    {obj[key].ZH_name}
                </li>
            );
        });
        return tabItem;
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

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
