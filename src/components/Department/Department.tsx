/*
 *  接收current_indx，根据current_indx的值决定是否显示该组件
 *  当current_indx < 9（此时加载Pie组件）时隐藏
 *  影响因素：
 *    外部：current_index
 *    内部：19、20、21行修改部门名称
 *          同级目录下的less文件修改对应的标记颜色
 */

import * as React from 'react';
import { connect } from 'react-redux';
import './Department.less';

interface Iprops {
    current_index: number
}

enum DepartmentName {
    ChengDu = '成都动车段',
    GuiYang = '贵阳车辆段',
    ChongQing = '重庆动车段',
}

function Department(props: Iprops) {
    let Departments: JSX.Element | null

    if (props.current_index < 9) {
        Departments = (<ul className="Department">
                            <li className="Department-item">
                                <span className="icon ChengDu" />
                                <p className="name">{DepartmentName.ChengDu}</p>
                            </li>
                            <li className="Department-item">
                                <span className="icon GuiYang" />
                                <p className="name">{DepartmentName.GuiYang}</p>
                            </li>
                            <li className="Department-item">
                                <span className="icon ChongQing" />
                                <p className="name">{DepartmentName.ChongQing}</p>
                            </li>
                        </ul>)
    }
    else {
        Departments = null
    }

    return (
        <React.Fragment>
            {Departments}
        </React.Fragment>
    );
}

function mapStateToProps(state: any) {
    return {
        current_index: state.config.current_index
    };
}

export default connect(mapStateToProps)(Department);
