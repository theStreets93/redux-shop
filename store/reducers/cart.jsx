import * as actionTypes from './actions/cartActions';

const initialState = {
    minicartId: null,
    minicartItems: [],
    minicartSubtotals: 0,
    minicartDiscount: 0,
    minicartShipping: 0,
    minicartTotals: 0,
    minicartQty: 0,
    minicartCurrency: null
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
    if(action.type === actionTypes.GET_CART_INFO) {
        return {
            ...state,
            minicartTotals: action.result.grand_total,
            minicartSubtotals: action.result.subtotal,
            minicartDiscount: action.result.discount_amount,
            minicartShipping: action.result.shipping_amount,
            minicartQty: action.result.items.length,
            minicartCurrency: action.result.currency_code
        }
    }

    return state;
}