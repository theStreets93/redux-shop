import React, { Component } from 'react';

import {stringify} from 'qs';
import ProductListItem from './catalog/ProductItem';
import MinicartItems from './checkout/MinicartItems';

import { connect } from 'react-redux';

class Catalog extends Component {
    state = {
        minicart: [],
        basePrice: 0,
        endpoint: "http://magento2.inchoo4u.net/rest/V1",
        products: [],
        mediaFolder: 'http://magento2.inchoo4u.net/pub/media/catalog/product/',
        minicartId: [],
        minicartItems: [],
        minicartSubtotal: 0,
        currentPage: 1,
        totalCount: [],
        pageSize: 8
    };

    addItemUpdater = (data, inject) => {
        return data.concat(inject);
    };

    formatPrice = sourcePrice => {
        return parseFloat(sourcePrice.toFixed(2));
    };

    componentDidMount() {

        let query = {
            searchCriteria: {
                page_size: this.state.pageSize,
                current_page: this.state.currentPage,
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
        }

        query = stringify(query);

        fetch('http://magento2.inchoo4u.net/rest/V1/products?' + query)
            .then(results => {
                return results.json();
            })
            .then(data => {
                const products = data.items;
                const totalCount = data.total_count;

                this.setState({
                    products: products,
                    totalCount: totalCount
                })
        });

        fetch('http://magento2.inchoo4u.net/rest/V1/guest-carts', {
            method: 'POST'
        })
            .then(res => res.json())
            .then(json => {
                const guestCartCookie = {minicartId: json};

                this.setState({
                    minicartId: guestCartCookie.minicartId
                });
        });
    }

    addToCart = item => {

        fetch('http://magento2.inchoo4u.net/rest/V1/guest-carts/' + this.state.minicartId + '/items', {
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                cartItem: {
                    quote_id: this.state.minicartId,
                    sku: item,
                    qty: 1
                }
            })
        }).then(res => res.json())
            .then(json => {

                let currentState = this.state.minicartItems;
                let itemChecker = currentState.map(product => product.sku).indexOf(json.sku);
                let mcItems = [];
                let sum = null;

                if (itemChecker <= -1) {
                    mcItems = currentState.concat(json);
                } else {
                    let objIndex = currentState.findIndex((obj => obj.sku === json.sku));
                    currentState[objIndex].qty = json.qty;
                    mcItems = currentState;
                }

                mcItems.forEach(function (value, index, arry) {
                    sum += value.price * value.qty;
                });

                this.setState({
                    minicartItems: mcItems,
                    minicartSubtotal: sum
                })
            })
            .catch(err => console.log('error' + err));
    }

    removeFromCart = item => {
        fetch('http://magento2.inchoo4u.net/rest/V1/guest-carts/' + this.state.minicartId + '/items/' + item, {
            headers: {
                'content-type': 'application/json'
            },
            method: 'DELETE'
        }).then(res => res.json())
            .then(json => {

                fetch('http://magento2.inchoo4u.net/rest/V1/guest-carts/' + this.state.minicartId + '/items', {
                    headers: {
                        'content-type': 'application/json'
                    },
                    method: 'GET'
                })
                    .then(results => {
                        return results.json();
                    })
                    .then(data => {

                        let sum = null;

                        data.forEach(function (value, index, arry) {
                            sum += value.price * value.qty;
                        });

                        this.setState({
                            minicartItems: data,
                            minicartSubtotal: sum
                        })
                    });

            })
            .catch(err => console.log('error' + err));
    }

    prevPage = () => {
        let currentPage = this.state.currentPage;

        if (this.state.currentPage > 1) {
            currentPage = this.state.currentPage - 1;
        }

        this.setState({
            currentPage: currentPage
        })

        let query = {
            searchCriteria: {
                page_size: this.state.pageSize,
                current_page: currentPage,
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
        }

        query = stringify(query);

        fetch('http://magento2.inchoo4u.net/rest/V1/products?' + query)
            .then(results => {
                return results.json();

            })
            .then(data => {
                const products = data.items;
                const totalCount = data.total_count;

                this.setState({
                    products: products,
                    totalCount: totalCount
                })
            });

    }

    nextPage = () => {
        let currentPage = this.state.currentPage;

        if ((this.state.pageSize * this.state.currentPage) < this.state.totalCount) {
            currentPage = this.state.currentPage + 1;
        }

        this.setState({
            currentPage: currentPage
        })

        let query = {
            searchCriteria: {
                page_size: this.state.pageSize,
                current_page: currentPage,
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
        }

        query = stringify(query)

        fetch('http://magento2.inchoo4u.net/rest/V1/products?' + query)
            .then(results => {
                return results.json();

            })
            .then(data => {
                const products = data.items;
                const totalCount = data.total_count;

                this.setState({
                    products: products,
                    totalCount: totalCount
                })
            });

    }

    render() {
        return (
            <main className="main">
                <h1 className="textAlignCenter">THIS IS SAMPLE WITHOUT REDUX - WORKSHOP 1</h1>
                <div className="catalog-products">
                    <div className="catalog-products-sidebar">
                        <div className="catalog-products-sidebar-title">Sort by:</div>
                        <div className="catalog-products-sidebar-content">
                            <div className="catalog-layered-navigation">
                                <div className="layered-nav-title">Size:</div>
                                <div className="layered-nav-content">

                                </div>
                            </div>
                            <div className="sidebar-minicart">
                                <div className="sidebar-minicart-title">Your Cart:</div>
                                <div className="sidebar-minicart-content">
                                    <ul className="sidebar-minicart-items">
                                        {this.state.minicartItems.length ? (
                                            this.state.minicartItems.map(product => {
                                                return (
                                                    <MinicartItems
                                                        key={product.sku}
                                                        click={event => this.removeFromCart(product.item_id)}
                                                        title={product.name}
                                                        price={product.price}
                                                        qty={product.qty}
                                                    />
                                                );
                                            })
                                        ) : (
                                            <li>{'You have no items in your shopping cart.'}</li>
                                        )}

                                    </ul>
                                    <div className="minicart-subtotal">
                                        {this.state.minicartItems.length ? (
                                            <span>
                                                {'Total: '}
                                                <span className="price">
                                                    {this.state.minicartSubtotal
                                                        .toFixed(2)
                                                        .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}{' USD'}
                                                </span>
                                            </span>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="catalog-products-main">
                        <div className="product-list">
                            <div className="product-list-totals">
                                {'Showed '}
                                <strong>
                                    {
                                        (this.state.pageSize * (this.state.currentPage - 1) ? (this.state.pageSize * (this.state.currentPage - 1)) : 1) + '-' + ((this.state.pageSize * this.state.currentPage) > this.state.totalCount ? this.state.totalCount : (this.state.pageSize * this.state.currentPage))
                                    }
                                </strong>
                                {' of '}
                                <strong>
                                    {this.state.totalCount}
                                </strong>
                                {' Products'}
                            </div>
                            <ul className="product-list-pagination">
                                {
                                    this.state.currentPage > 1 ?
                                        <li className="action prev">
                                            <button onClick={event => this.prevPage()}>{'Prev Page'}</button>
                                        </li>
                                        :
                                        <li className="action prev disabled">
                                            <button onClick={event => this.prevPage()}>{'Prev Page'}</button>
                                        </li>

                                }
                                {
                                    (this.state.pageSize * this.state.currentPage) > this.state.totalCount ?
                                        <li className="action next disabled">
                                            <button onClick={event => this.nextPage()}>{'Next Page'}</button>
                                        </li>
                                        :
                                        <li className="action next">
                                            <button onClick={event => this.nextPage()}>{'Next Page'}</button>
                                        </li>
                                }
                            </ul>
                            <ul className="product-list-items">
                                {this.state.products.map(product => {

                                    const thumbnail = product.custom_attributes.find(custom_attribute => custom_attribute.attribute_code === "image");

                                    return (
                                        <ProductListItem
                                            key={product.id}
                                            sku={product.sku}
                                            name={product.name}
                                            click={event => this.addToCart(product.sku)}
                                            price={product.price}
                                            imgSrc={this.state.mediaFolder + thumbnail.value}
                                            itemId={product.item_id}
                                        />
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        count: state.counter.count
    };
}

export default connect(mapStateToProps)(Catalog);
