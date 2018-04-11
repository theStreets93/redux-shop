import * as actionTypes from './actions/cartActions';

const initialState = {
    minicartId: null,
    minicartItems: []
};

export default function minicartReducer(state = initialState, action) {
    if(action.type === actionTypes.GET_CART) {
        return {
            ...state,
            minicartId: action.result
        }
    }
    if(action.type === actionTypes.GET_CART_ITEMS) {
        return {
            ...state,
            minicartItems: action.result
        }
    }
    if(action.type === actionTypes.ADD_TO_CART) {
        return {
            ...state,
            minicartItems: action.result
        }
    }
    if(action.type === actionTypes.REMOVE_FROM_CART) {
        return {
            ...state,
            minicartItems: action.result
        }
    }
    if(action.type === actionTypes.COMPONENT_RERENDER) {
        return {
            ...state,
        }
    }
    return state;
}