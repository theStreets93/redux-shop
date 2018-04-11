import React, { Component }  from 'react';
import { connect } from 'react-redux';
import {removeFromCart, getCart, getCartItems} from "../../store/reducers/actions/cartActions";
import CartItems from './checkout/CartItems.jsx';

class Cart extends Component {
    componentDidMount() {
        if(!this.props.minicartId){
            this.props.getCart();
        }else{
            this.props.getCartItems(this.props.minicartId);
        }
    }

    render() {
        return (
            <main className="main checkout-cart-index">
                <h1 className="cart-title">{'Cart'}</h1>
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
                    <div className="cart-totals"></div>
                </div>
                <div className="cart-subtitle"><strong>{'Cart ID: '}</strong><span>{ this.props.minicartId }</span></div>
            </main>
        );
    }
}

function mapStateToProps(state){
    return {
        minicartId: state.cart.minicartId,
        minicartItems: state.cart.minicartItems
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getCart: (minicartId,itemid,sku) => dispatch(getCart(minicartId,itemid,sku)),
        getCartItems: (minicartId,item,sku) => dispatch(getCartItems(minicartId,item,sku)),
        removeFromCart: (minicartId,itemid,sku) => dispatch(removeFromCart(minicartId,itemid,sku))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);