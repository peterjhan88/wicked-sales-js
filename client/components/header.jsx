import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <header className='bg-dark d-flex header-height align-items-center'>
        <div className='header-logo'><i className="fas fa-dollar-sign"></i></div>
        <div className='header-name mr-auto'>Wicked Sales</div>
        <div className='mr-5 shopping-cart'><span>{this.props.cartItemCount} items</span> <i className='fas fa-shopping-cart'></i></div>
      </header>
    );
  }
}
