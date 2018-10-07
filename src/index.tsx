import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from "redux";
import './reset.less';

import MainBody from './components/MainBody/MainBody';
import registerServiceWorker from './registerServiceWorker';

const allData = {
    "bulletTrain": {
        "ZH_name": "动车",
        "type": "line",
        "min_index": 0,
        "max_index": 2,
        "accident": {
            "fire": {
                "name": "火灾爆炸",
                "type_index": 0,
                "class_index": 0,
                "data": {
                    "ChengDu": {
                        "2018/07": 64,
                        "2018/08": 33,
                    },
                    "GuiYang": {
                        "2018/07": 24,
                        "2018/08": 43,
                    },
                    "ChongQing": {
                        "2018/07": 34,
                        "2018/08": 13,
                    }
                }
            },
            "drop": {
                "name": "配件脱落",
                "type_index": 1,
                "class_index": 1,
                "data": {
                    "ChengDu": {
                        "2018/07": 64,
                        "2018/08": 33,
                    },
                    "GuiYang": {
                        "2018/07": 24,
                        "2018/08": 43,
                    },
                    "ChongQing": {
                        "2018/07": 34,
                        "2018/08": 13,
                    }
                }
            },
            "break": {
                "name": "制动抱闸",
                "type_index": 2,
                "class_index": 2,
                "data": {
                    "ChengDu": {
                        "2018/07": 64,
                        "2018/08": 33,
                    },
                    "GuiYang": {
                        "2018/07": 24,
                        "2018/08": 43,
                    },
                    "ChongQing": {
                        "2018/07": 34,
                        "2018/08": 13,
                    }
                }
            }
        },
    },
    "PassengerTrain": {
        "ZH_name": "客车",
        "type": "line",
        "min_index": 3,
        "max_index": 5,
        "accident": {
            "fire": {
                "name": "火灾爆炸",
                "type_index": 3,
                "class_index": 0,
                "data": {
                    "ChengDu": {
                        "2018/07": 64,
                        "2018/08": 33,
                        "2018/09": 46,
                    },
                    "GuiYang": {
                        "2018/07": 24,
                        "2018/08": 43,
                        "2018/09": 76,
                    },
                    "ChongQing": {
                        "2018/07": 34,
                        "2018/08": 13,
                        "2018/09": 26,
                    }
                }
            },
            "drop": {
                "name": "配件脱落",
                "type_index": 4,
                "class_index": 1,
                "data": {
                    "ChengDu": {
                        "2018/07": 64,
                        "2018/08": 33,
                        "2018/09": 46,
                    },
                    "GuiYang": {
                        "2018/07": 24,
                        "2018/08": 43,
                        "2018/09": 76,
                        "2018/10": 11,
                    },
                    "ChongQing": {
                        "2018/07": 34,
                        "2018/08": 13,
                        "2018/09": 26,
                    }
                }
            },
            "break": {
                "name": "制动抱闸",
                "type_index": 5,
                "class_index": 2,
                "data": {
                    "ChengDu": {
                        "2018/07": 64,
                        "2018/08": 33,
                        "2018/09": 46,
                    },
                    "GuiYang": {
                        "2018/07": 24,
                        "2018/08": 43,
                        "2018/09": 76,
                        "2018/10": 11,
                    },
                    "ChongQing": {
                        "2018/07": 34,
                        "2018/08": 13,
                        "2018/09": 26,
                    }
                }
            }
        },
    },
    "FreightTrains": {
        "ZH_name": "货车",
        "type": "line",
        "min_index": 6,
        "max_index": 8,
        "accident": {
            "fire": {
                "name": "火灾爆炸",
                "type_index": 6,
                "class_index": 0,
                "data": {
                    "ChengDu": {
                        "2018/07": 64,
                        "2018/08": 33,
                        "2018/09": 46,
                        "2018/10": 21,
                    },
                    "GuiYang": {
                        "2018/07": 24,
                        "2018/08": 43,
                        "2018/09": 76,
                        "2018/10": 11,
                        "2018/11": 21,
                    },
                    "ChongQing": {
                        "2018/07": 34,
                        "2018/08": 13,
                        "2018/09": 26,
                        "2018/10": 31,
                    }
                }
            },
            "drop": {
                "name": "配件脱落",
                "type_index": 7,
                "class_index": 1,
                "data": {
                    "ChengDu": {
                        "2018/07": 64,
                        "2018/08": 33,
                        "2018/09": 46,
                    },
                    "GuiYang": {
                        "2018/07": 24,
                        "2018/08": 43,
                        "2018/09": 76,
                        "2018/10": 11,
                    },
                    "ChongQing": {
                        "2018/07": 34,
                        "2018/08": 13,
                        "2018/09": 26,
                    }
                }
            },
            "break": {
                "name": "制动抱闸",
                "type_index": 8,
                "class_index": 2,
                "data": {
                    "ChengDu": {
                        "2018/07": 64,
                        "2018/08": 33,
                        "2018/09": 46,
                    },
                    "GuiYang": {
                        "2018/07": 24,
                        "2018/08": 43,
                        "2018/09": 76,
                        "2018/10": 11,
                    },
                    "ChongQing": {
                        "2018/07": 34,
                        "2018/08": 13,
                        "2018/09": 26,
                    }
                }
            }
        },
    },
    "security": {
        "ZH_name": "劳安",
        "type": "circular",
        "min_index": 9,
        "max_index": 14,
        "data": {
            "vehicle": {
                "name": "车辆伤害",
                "type_index": 9,
                "count": 4
            },
            "traffic": {
                "name": "交通安全",
                "type_index": 10,
                "count": 0
            },
            "mechanical": {
                "name": "机械伤害",
                "type_index": 11,
                "count": 0
            },
            "electric": {
                "name": "电击伤害",
                "type_index": 12,
                "count": 2
            },
            "falling": {
                "name": "高空坠落",
                "type_index": 13,
                "count": 3
            },
            "others": {
                "name": "其他",
                "type_index": 14,
                "count": 1
            },
        }
    },
    "config": {
        "current_index": 0
    },
}

const reducer = (state=allData, action: any) => {
    switch (action.type) {
        case 'ADD_INDEX':
            let newIndex = state.config.current_index
            newIndex ++
            // console.log('add', state.config.current_index, newIndex)
            if(newIndex > state.security.max_index) {
                return Object.assign({}, state, {
                    "config": {
                        "current_index": 0
                    }
                })
            }
            else {
                return Object.assign({}, state, {
                    "config": {
                        "current_index": newIndex
                    }
                })
            }

        case 'TAB_INDEX':
            // console.log("TAB_INDEX", action.index)
            return Object.assign({}, state, {
                "config": {
                    "current_index": action.index
                }
            })
        
        case 'SHIFTER_INDEX':
            // console.log("SHIFTER_INDEX", action.index)
            return Object.assign({}, state, {
                "config": {
                    "current_index": action.index
                }
            })

        case 'CHANGE_MAX_INDEX':
            // console.log('CHANGE_MAX_INDEX', action.index)
            let tag = 0
            return Object.assign({}, state, {
                "security": {
                    "ZH_name": state.security.ZH_name,
                    "data": state.security.data,
                    "max_index": action.index,
                    "min_index": state.security.min_index,
                    "tag_index": tag ++,
                    "type": state.security.type,
                }
            })
            
        default:
            return state
    }
}

export const store = createStore(reducer);

function addINdex() {
    return {
        type: 'ADD_INDEX'
    }
}

setInterval(() => {
    store.dispatch(addINdex())
}, 10000)


ReactDOM.render(
    <Provider store={store}>
        <MainBody />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
