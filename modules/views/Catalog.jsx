import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItems } from '../../store/reducers/actions/catalogActions';
import {addToCart, getCart} from "../../store/reducers/actions/cartActions";
import * as endpoints from '../../const/api';
import ProductItem from './catalog/ProductItem';

class Catalog extends Component {

    state = {
        messageActive: false,
        currentProduct: 0
    };

    componentDidMount() {

        this.props.fetchProducts();

        if(!this.props.minicartId){
            this.props.getCart();
        }
    };

    productAdded = (productid) => {
        this.setState({
            messageActive: true,
            currentProduct: productid.id
        });

        (!this.state.messageActive ? setTimeout(() => { this.setState({messageActive: false}) }, 500) : this.setState({messageActive: true}) )
    };

    render() {
        return (
            <main className="main">
                <div className="catalog-products">
                    <div className="catalog-products-sidebar">
                        <div className="sidebar-widget sidebar-widget-counter">
                            <h2 className="sidebar-widget-title">Total Products</h2>
                            <div className="sidebar-widget-content">
                                <p>{ 'Showed' }: <strong>{ this.props.productTotals }</strong> { 'on page'}</p>
                            </div>
                        </div>

                        <div className="sidebar-widget sidebar-widget-counter">
                            <h2 className="sidebar-widget-title">Counter Fetch</h2>
                            <div className="sidebar-widget-content">
                                <p>{ 'Current value is' }: <strong>{ this.props.count }</strong></p>
                            </div>
                        </div>
                    </div>
                    <div className="catalog-products-main">
                        <div className="product-list">
                            <div className="product-list-totals">
                                { this.props.productTotals + ' Products'}
                            </div>
                            <ul className="product-list-pagination">
                                <li className="action prev disabled">
                                    <button>{'Prev Page'}</button>
                                </li>
                                <li className="action next disabled">
                                    <button>{'Next Page'}</button>
                                </li>
                            </ul>
                            <ul className="product-list-items">
                                {this.props.productItems.map(product => {

                                    const thumbnail = product.custom_attributes.find(custom_attribute => custom_attribute.attribute_code === "image");

                                    return (
                                        <ProductItem
                                            key={product.id}
                                            id={product.id}
                                            sku={product.sku}
                                            name={product.name}
                                            click={this.props.addToCart}
                                            price={product.price}
                                            imgSrc={endpoints.MEDIA_ENDPOINT + thumbnail.value}
                                            itemId={product.item_id}
                                            addToCart={(event) => this.props.addToCart( this.props.minicartId, product.id, product.sku, this.productAdded(product))}
                                            messageActive={this.state.messageActive}
                                            currentProduct={this.state.currentProduct}
                                        />
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: () => dispatch(fetchItems()),
        getCart: (minicartId,item,sku) => dispatch(getCart(minicartId,item,sku)),
        addToCart: (minicartId,itemid,sku) => dispatch(addToCart(minicartId,itemid,sku))
    }
};

function mapStateToProps(state){
    return {
        count: state.counter.count,
        productItems: state.catalog.productItems,
        productTotals: state.catalog.productTotals,
        minicartId: state.cart.minicartId,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);