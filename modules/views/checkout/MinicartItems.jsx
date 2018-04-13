import React from 'react';

const MinicartItems = props => {
    return (
        <li className="minicart-list-item">
            <div className="minicart-item-info">
                <div className="minicart-item-title">{props.title}</div>
                <div className="minicart-item-qty">
                    <span className="label">{'Quantity: '}</span>
                    <span className="value">{props.qty}</span>
                </div>
                <div className="minicart-item-price">
                    <span className="label">{'Unit price: '}</span>
                    <span>{props.price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</span>
                    <span className="minicart-item-currency">{' USD'}</span>
                </div>
            </div>
            <button className="minicart-item-button" onClick={props.removeFromCart} title="Remove Item">{'x'}</button>
        </li>
    );
};

export default MinicartItems;
