import React from 'react';

export default class CartSummaryItem extends React.Component {
  render() {
    return (
      <div className='col-10 my-3 mx-3 py-3 d-flex align-items-center card row flex-wrap card-cart'>
        <div className='image-container-cart d-flex align-items-center justify-content-center'>
          <img src={this.props.item.image} alt={this.props.item.name} className='image-contain'/>
        </div>
        <div className='card-body d-flex flex-column card-body-cart'>
          <h3 className='cart-product-name'>{this.props.item.name}</h3>
          <div className='cart-product-price'>{`$ ${(this.props.item.price / 100).toFixed(2)}`}</div>
          <div className='mt-2 cart-product-short-description'>{this.props.item.shortDescription}</div>
        </div>
        <button className='btn btn-warning' onClick={() => { this.props.removeItem(this.props.item.cartItemId); }}>Remove Item</button>
      </div>
    );
  }
}
