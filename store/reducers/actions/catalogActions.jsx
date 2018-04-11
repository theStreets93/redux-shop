import {stringify} from 'qs';

export const FETCH_ITEMS = 'FETCH_ITEMS';
export const STORE_ITEMS = 'STORE_ITEMS';

export const storeItems = (res) => {
    return {
        type: FETCH_ITEMS,
        result: res
    };
};

let query = {
    searchCriteria: {
        page_size: 20,
        current_page: 1,
        filter_groups: [
            {
                filters: [
                    {
                        field: 'category_id',
                        value: '3',
                        condition_type: 'eq'
                    },
                    {
                        field: 'type_id',
                        value: 'simple',
                        condition_type: 'eq'
                    }
                ]
            }
        ]
    }
};

query = stringify(query);

export const fetchItems = (data) => {
    return dispatch => {
        fetch('http://magento2.inchoo4u.net/rest/V1/products?' + query)
            .then(response => response.json())
            .then(data => dispatch(storeItems(data)))
    }
};