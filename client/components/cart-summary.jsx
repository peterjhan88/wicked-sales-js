import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  calculateTotal() {
    return this.props.cart.length === 0 ? 0 : this.props.cart.reduce((acc, item) => acc + item.price, 0);
  }

  render() {
    const cartItems = this.props.cart.map(item => {
      return (
        <CartSummaryItem
          key={item.cartItemId}
          item={item}
        />
      );
    });

    return (
      <div className='cart-items-container col-11 mx-auto'>
        <div className='col-12 back-to-catalog my-3' onClick={() => this.props.setView('catalog', {})}>
          <i className='fas fa-chevron-left'></i>{' Back to catalog'}
        </div>
        <div className='col-12 cart-title'>My Cart</div>
        {
          cartItems.length === 0
            ? <div className='empty-cart'>No Item to Display</div>
            : <div className='d-flex justify-content-center flex-wrap'>{cartItems}</div>
        }
        <div className='row col-10 d-flex align-items-center'>
          <div className='cart-total-price col-10 my-5 d-flex'>Item Total: ${(this.calculateTotal() / 100).toFixed(2)}</div>
          <button className='btn btn-info button-height col-2' onClick={() => this.props.setView('checkout', {})}>Place Order</button>
        </div>
      </div>
    );
  }
}
