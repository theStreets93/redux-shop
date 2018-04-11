import React from 'react';

const MinicartItems = props => {
  return (
    <li className="minicart-list-item">
      <div className="minicart-item-info">
        <div className="minicart-item-title">{props.qty}{' x '}{props.title}</div>
        <div className="minicart-item-price">
          {props.price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}{' '}
          <span className="minicart-item-currency">USD</span>
        </div>
      </div>
      <button className="minicart-item-button" onClick={props.click}>{'x'}</button>
    </li>
  );
};

export default MinicartItems;
