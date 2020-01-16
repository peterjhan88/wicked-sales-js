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
    if (!this.goodToSubmit()) {
      // eslint-disable-next-line no-console
      console.log('Invalid Inputs! Either input values are invalid or no items in the cart!');
      return false;
    }
    var orderDetails = {};
    orderDetails.name = this.state.name;
    orderDetails.creditCard = this.state.creditCard.replace(' ', '');
    orderDetails.shippingAddress = this.state.shippingAddress;
    this.props.placeOrder(orderDetails);
    this.props.setView('catalog', {});
    return true;
  }

  handleChange(event) {
    const selectedInput = event.target.getAttribute('id');
    const currentValue = event.target.value;
    const newState = {};
    newState[selectedInput] = currentValue;
    this.setState(newState);
  }

  validateInputs(value) {
    if (value === '' || value.match(/^\s*$/g)) {
      return false;
    }
    return true;
  }

  validateCreditCard(creditCard) {
    if (!creditCard || creditCard.match(/[^\s|^\d]/g)) {
      return false;
    }
    return creditCard.match(/\d/g).join('').length === 16;
  }

  goodToSubmit() {
    return (
      this.validateInputs(this.state.name) &&
      this.validateInputs(this.state.shippingAddress) &&
      this.validateCreditCard(this.state.creditCard) &&
      this.props.numberOfItemsInCart !== 0
    );
  }

  render() {
    return (
      <div className='cart-items-container col-11 mx-auto'>
        <div className='col-12 back-to-catalog my-3 cursor-pointer'
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
              className={this.validateInputs(this.state.name) ? 'col-8 order-input valid-input' : 'col-8 order-input invalid-input'}
              id='name'
              value={this.state.name}
              onChange={this.handleChange}
            />
            {
              this.validateInputs(this.state.name)
                ? <div className='valid-input-comment ml-3'>Name is provided.</div>
                : <div className='invalid-input-comment ml-3'>Name is not provided. Please enter name.</div>
            }
          </div>
          <div className='form-group flex-wrap col-12'>
            <label className='col-12 input-title'>Credit Card Number</label>
            <input
              type='text'
              className={this.validateCreditCard(this.state.creditCard) ? 'col-8 order-input valid-input' : 'col-8 order-input invalid-input'}
              id='creditCard'
              value={this.state.creditCard}
              onChange={this.handleChange}
            />
            {
              this.validateCreditCard(this.state.creditCard)
                ? <div className='valid-input-comment ml-3'>Valid credit card number</div>
                : <div className='invalid-input-comment ml-3'>Invalid number</div>
            }
          </div>
          <div className='form-group flex-wrap col-12'>
            <label className='col-12 input-title'>Shipping Address</label>
            <textarea
              type='text'
              className={this.validateInputs(this.state.shippingAddress) ? 'col-8 order-textarea-address valid-input' : 'col-8 order-textarea-address invalid-input'}
              id='shippingAddress'
              value={this.state.shippingAddress}
              onChange={this.handleChange}
              rows='4'
            >
            </textarea>
            {
              this.validateInputs(this.state.shippingAddress)
                ? <div className='valid-input-comment ml-3'>Address is provided.</div>
                : <div className='invalid-input-comment ml-3'>Address is not provided. Please enter address.</div>
            }
          </div>
        </form>
        <div className='col-10 d-flex justify-content-start'>
          <button className='btn btn-info' onClick={this.handlePlaceOrder}>Place Order</button>
          {

          }
        </div>
      </div>
    );
  }
}
