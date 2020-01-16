import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <header className='bg-dark d-flex header-height align-items-center'>
        <div className='ml-3 row mr-auto cursor-pointer' onClick={() => this.props.setView('catalog', {})}>
          <div className='header-logo'><i className="fas fa-dollar-sign"></i></div>
          <div className='header-name'>Wicked Sales</div>
        </div>
        <div className='mr-5 shopping-cart cursor-pointer' onClick={() => this.props.setView('cart', {})} >
          <span>{this.props.cartItemCount} items </span>
          <i className='fas fa-shopping-cart'></i>
        </div>
      </header>
    );
  }
}
