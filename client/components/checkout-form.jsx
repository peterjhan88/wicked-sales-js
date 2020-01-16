import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handlePlaceOrder(event) {
    event.preventDefault();
    var orderDetails = {};
    orderDetails.name = this.state.name;
    orderDetails.creditCard = this.state.creditCard.replace(' ', '');
    orderDetails.shippingAddress = this.state.shippingAddress;
    this.props.placeOrder(orderDetails);
    this.props.setView('catalog', {});
  }

  handleChange(event) {
    const selectedInput = event.target.getAttribute('id');
    const currentValue = event.target.value;
    const newState = {};
    newState[selectedInput] = currentValue;
    this.setState(newState);
  }

  render() {
    return (
      <div className='cart-items-container col-11 mx-auto'>
        <div className='col-12 back-to-catalog my-3'
          onClick={() => this.props.setView('catalog', {})}
        >
          <i className='fas fa-chevron-left'></i>{' Back to catalog'}
        </div>
        <div className='col-12 cart-title'>My Cart</div>
        <div className='order-total-price col-10 my-5 d-flex'>
          Order Total: ${(this.props.orderTotal / 100).toFixed(2)}
        </div>
        <form className='d-flex flex-wrap col-10'>
          <div className='form-group flex-wrap col-12'>
            <label className='col-12 input-title text-weight-bold'>Name</label>
            <input
              type='text'
              className='col-8 order-input'
              id='name'
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group flex-wrap col-12'>
            <label className='col-12 input-title'>Credit Card Number</label>
            <input
              type='text'
              className='col-8 order-input'
              id='creditCard'
              value={this.state.creditCard}
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group flex-wrap col-12'>
            <label className='col-12 input-title'>Shipping Address</label>
            <textarea
              type='text'
              className='col-8 order-textarea-address'
              id='shippingAddress'
              value={this.state.shippingAddress}
              onChange={this.handleChange}
              rows='4'
            >
            </textarea>
          </div>
        </form>
        <div className='col-10 d-flex justify-content-start'>
          <button className='btn btn-info' onClick={this.handlePlaceOrder}>Place Order</button>
        </div>
      </div>
    );
  }
}
