export const GET_CART = 'GET_CART';
export const STORE_MINICART_ID = 'STORE_MINICART_ID';

export const GET_CART_ITEMS = 'GET_CART_ITEMS';
export const STORE_CART_ITEMS = 'STORE_CART_ITEMS';

export const ADD_TO_CART = 'ADD_TO_CART';
export const STORE_TO_CART = 'STORE_TO_CART';

export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const STORE_FROM_CART = 'STORE_FROM_CART';

export const COMPONENT_RERENDER = 'COMPONENT_RERENDER';


/*
    GET CARD ID
*/
export const storeMinicartId = (res) => {
    return {
        type: GET_CART,
        result: res
    };
};

export const getCart = (data) => {
    return dispatch => {
        fetch('http://magento2.inchoo4u.net/rest/V1/guest-carts', {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => dispatch(storeMinicartId(data)))
    };
};


/*
    GET ITEMS
*/
export const storeCartItems = (res) => {
    return {
        type: GET_CART_ITEMS,
        result: res
    };
};

export const getCartItems = (minicartId,item,sku) => {
    return dispatch => {
        fetch('http://magento2.inchoo4u.net/rest/V1/guest-carts/' + minicartId + '/items')
            .then(response => response.json())
            .then(data => dispatch(storeCartItems(data)))
    }
};

/*
    ADD TO CART
*/
export const storeToCart = (res) => {
    return {
        type: addToCart,
        result: res
    };
};

export const addToCart = (minicartId,itemid,sku) => {
    return dispatch => {
        fetch('http://magento2.inchoo4u.net/rest/V1/guest-carts/' + minicartId + '/items', {
            method: 'POST',
            body: JSON.stringify({cartItem: {quoteId: minicartId,sku: sku, qty:1}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => response.json())
            .then(data => dispatch(getCartItems(minicartId,itemid,sku)));
    }
};


/*
    REMOVE FROM CART
*/
export const storeFromCart = (res) => {
    return {
        type: removeFromCart,
        result: res
    };
};

export const removeFromCart = (minicartId,itemid,sku) => {
    return dispatch => {
        fetch('http://magento2.inchoo4u.net/rest/V1/guest-carts/' + minicartId + '/items/' + itemid, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => dispatch(getCartItems(minicartId,itemid,sku)));


    }
};