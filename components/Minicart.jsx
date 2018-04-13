import React, { Component }  from 'react';
import { connect } from 'react-redux';
import {removeFromCart, getCart, getCartItems, getCartInfo} from "../store/reducers/actions/cartActions";
import MinicartItems from '../modules/views/checkout/MinicartItems';

class Minicart extends Component {
    componentDidMount() {
        if(!this.props.minicartId){
            this.props.getCart();
        }else{
            this.props.getCartItems(this.props.minicartId);
            this.props.getCartInfo(this.props.minicartId);
        }
    }

    minicartState = () => {
        (this.state.minicartState ? this.setState({minicartState: false}) :  this.setState({minicartState: true})  )
    };

    state = {
        minicartState: false
    };

    render() {
        return (
            <div className="minicart">
                <div className={this.state.minicartState ? 'minicart-title active' : 'minicart-title'}><button onClick={this.minicartState}>{'Minicart'} { this.props.minicartQty > 0 ? <strong>{ this.props.minicartQty }</strong> : '' }</button></div>
                <div className="minicart-table">
                    { this.props.minicartItems.length ?
                        <div className="minicart-subtitle">
                            {this.props.minicartQty} ITEMS IN YOUR CART
                        </div>
                    :
                        ''
                    }

                    <ul className="minicart-table-items">
                        { this.props.minicartItems.length ?
                            this.props.minicartItems.map(product => {
                                return (
                                    <MinicartItems
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

                    { console.log(this.props.minicartItems) }

                    { this.props.minicartTotals ?
                        <div className="minicart-totals">
                            <div className="minicart-totals-value">
                                <strong>{'Cart Total: '}</strong><span>{this.props.minicartTotals.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' USD' }</span>
                            </div>
                            <button className="button-primary">{'Proceed to Checkout'}</button>
                        </div>
                    :
                        ''
                    }
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Minicart);