import React from 'react';

export default class ProductListItem extends React.Component {
  render() {
    return (
      <div className='col-3 mx-4 my-3 d-flex align-items-center card'>
        <img src={this.props.imgUrl} alt="product Image" className='card-img-top image-contain' />
        <div className='card-body'>
          <h5 className='card-title'>{this.props.productName || 'Product Name'}</h5>
          <p className='card-text text-price text-weight-bold'>{`$ ${(this.props.price / 100).toFixed(2)}` || '0.00'}</p>
          <p className='card-text'>{this.props.shortDescription || 'Short description sit amet, consectetur adipsicing elit...'}</p>
        </div>
      </div>
    );
  }
}
