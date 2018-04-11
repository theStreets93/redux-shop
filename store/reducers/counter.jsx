const counterState = {
    count: 0
};

export default function counterReducer(state = counterState, action) {
    switch(action.type) {
        case 'INCREMENT':
            return {
                count: state.count + 1
            };
        case 'DECREMENT':
            if(state.count > 1){
                return {
                    count: state.count - 1
                }
            }else {
                return {
                    count: state.count
                }
            }
        default:
            return state;
    }
}
