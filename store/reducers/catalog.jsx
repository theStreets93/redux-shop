import * as actionTypes from './actions/catalogActions';

const initialState = {
    productItems: [],
    productTotals: 0
};

export default function catalogReducer(state = initialState, action) {
    if(action.type === actionTypes.FETCH_ITEMS) {
        return {
            ...state,
            productItems: action.result.items,
            productTotals: action.result.total_count
        }
    }
    return state;
}