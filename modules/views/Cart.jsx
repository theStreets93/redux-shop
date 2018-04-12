import React, { Component }  from 'react';
import { connect } from 'react-redux';
import {removeFromCart, getCart, getCartItems, getCartInfo} from "../../store/reducers/actions/cartActions";
import CartItems from './checkout/CartItems.jsx';

class Cart extends Component {
    componentDidMount() {
        if(!this.props.minicartId){
            this.props.getCart();
        }else{
            this.props.getCartItems(this.props.minicartId);
            this.props.getCartInfo(this.props.minicartId);
        }
    }

    render() {
        return (
            <main className="main checkout-cart-index">
                <h1 className="cart-title">{'Your Shopping Cart'} { this.props.minicartQty > 0 ? '(' + this.props.minicartQty + ')' : '' }</h1>
                <div className="cart-table">
                    <ul className="cart-table-items">
                        { this.props.minicartItems.length ?
                            this.props.minicartItems.map(product => {
                                return (
                                    <CartItems
                                        key={product.item_id}
                                        removeFromCart={(event) => this.props.removeFromCart(this.props.minicartId,product.item_id,product.sku)}
                                        title={product.name}
                                        price={product.price}
                                        qty={product.qty}
                                    />
                                );
                            })
                        :
                            <li>{'You have no items in your shopping cart.'}</li>
                        }
                    </ul>

                    <div className="cart-sidebar">
                        <div className="cart-summary">
                            {this.props.minicartSubtotals ?
                                <div className="cart-summary-row cart-subtotals">
                                    <strong>{'Cart Subtotal: '}</strong><span>{this.props.minicartSubtotals.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' USD' }</span>
                                </div>
                                :
                                ''
                            }
                            { this.props.minicartDiscount ?
                                <div className="cart-summary-row cart-discount">
                                    <strong>{'Cart Discount: '}</strong><span>{this.props.minicartDiscount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' USD' }</span>
                                </div>
                                :
                                ''
                            }
                            {this.props.minicartShipping ?
                                <div className="cart-summary-row cart-shipping">
                                    <strong>{'Shipping: '}</strong><span>{this.props.minicartShipping.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' USD' }</span>
                                </div>
                                :
                                ''
                            }
                            {this.props.minicartTotals ?
                                <div className="cart-summary-row cart-totals">
                                    <strong>{'Cart Total: '}</strong><span>{this.props.minicartTotals.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' USD' }</span>
                                </div>
                                :
                                <div className="cart-summary-row cart-totals">
                                    0.00 USD
                                </div>
                            }
                        </div>

                        <div className="cart-actions">
                            {this.props.minicartTotals ?
                                <button className="button-primary">{'Proceed to Checkout'}</button>
                            :
                                ''
                            }
                        </div>
                    </div>
                </div>

                <div className="cart-subtitle"><strong>{'Cart ID: '}</strong><span>{ this.props.minicartId }</span></div>
            </main>
        );
    }
}

function mapStateToProps(state){
    return {
        minicartId: state.cart.minicartId,
        minicartItems: state.cart.minicartItems,
        minicartTotals: state.cart.minicartTotals,
        minicartSubtotals: state.cart.minicartSubtotals,
        minicartDiscount: state.cart.minicartDiscount,
        minicartShipping: state.cart.minicartShipping,
        minicartQty: state.cart.minicartQty,
        minicartCurrency: state.cart.minicartCurrency
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getCart: (minicartId,itemid,sku) => dispatch(getCart(minicartId,itemid,sku)),
        getCartItems: (minicartId,item,sku) => dispatch(getCartItems(minicartId,item,sku)),
        getCartInfo: (minicartId,item,sku) => dispatch(getCartInfo(minicartId,item,sku)),
        removeFromCart: (minicartId,itemid,sku) => dispatch(removeFromCart(minicartId,itemid,sku))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);