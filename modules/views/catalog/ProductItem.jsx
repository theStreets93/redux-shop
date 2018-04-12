import React from 'react';

const ProductListItem = props => {
  return (
    <li className="product-list-item">
      <div className="product-item-image">
        <img
          src={props.imgSrc}
          alt={props.name}
        />
      </div>
      <div className="product-item-info">
        <h2 className="product-item-title">{props.name}</h2>
        <div className="product-item-price">
          {props.price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}{' '}
          <span className="product-item-currency">USD</span>
        </div>
          { props.messageActive && props.currentProduct === props.id ?
              <button className="product-item-button">
                  Added
              </button>
              :
              <button className="product-item-button" onClick={props.addToCart}>
                  Add to Cart
              </button>
          }
      </div>
    </li>
  );
};

export default ProductListItem;
