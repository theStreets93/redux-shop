import React from 'react';

const CartItems = props => {
    return (
        <li className="cart-list-item">
            <div className="cart-item-info">
                <div className="cart-item-title">{props.title}</div>
                <div className="cart-item-qty">
                    <span className="label">{'Quantity: '}</span>
                    <span className="value">{props.qty}</span>
                </div>
                <div className="cart-item-price">
                    <span className="label">{'Unit price:'}</span>
                    <span className="cart-item-currency">{' $'}</span>
                    <span>{props.price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</span>
                </div>
            </div>
            <button className="cart-item-button" onClick={props.removeFromCart} title="Remove Item">{'x'}</button>
        </li>
    );
};

export default CartItems;