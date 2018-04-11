import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import catalogReducer from './reducers/catalog';
import counterReducer from './reducers/counter';
import minicartReducer from './reducers/cart';

const rootReducer = combineReducers({
    counter: counterReducer,
    catalog: catalogReducer,
    cart: minicartReducer
});

export default () =>
    createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(thunkMiddleware)
    );
