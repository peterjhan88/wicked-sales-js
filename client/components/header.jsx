import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <header className='bg-dark d-flex header-height flex-justify-start align-items-center'>
        <div className='ml-5 mr-2 d-flex align-items-center text-weight-bold text-white header-logo'>$</div>
        <div className='d-flex align-items-center text-white header-name'>Wicked Sales</div>
      </header>
    );
  }
}
