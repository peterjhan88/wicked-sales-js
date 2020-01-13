import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <header className='bg-dark d-flex header-height align-items-center'>
        <div className='header-logo'>$</div>
        <div className='header-name'>Wicked Sales</div>
      </header>
    );
  }
}
