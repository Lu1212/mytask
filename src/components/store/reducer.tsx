//  reducer
import { allData } from './data'

export const reducer = (state=allData, action: any) => {
    switch (action.type) {
        case 'ADD_INDEX':
            let newIndex = state.config.current_index
            newIndex ++
            console.log('add', state.config.current_index, newIndex)
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
            console.log("TAB_INDEX", action.index)
            return Object.assign({}, state, {
                "config": {
                    "current_index": action.index
                }
            })
        
        case 'SHIFTER_INDEX':
            console.log("SHIFTER_INDEX", action.index)
            return Object.assign({}, state, {
                "config": {
                    "current_index": action.index
                }
            })

        case 'CHANGE_MAX_INDEX':
            console.log('CHANGE_MAX_INDEX', action.index)
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