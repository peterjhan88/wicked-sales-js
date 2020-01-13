import React from 'react';

export default class ProductListItem extends React.Component {
  render() {
    return (
      <div className='col-md-3 mx-5 my-3 d-flex align-items-center card'>
        <img src={this.props.imgUrl} alt="product Image" className='card-img-top image-contain' />
        <div className='card-body'>
          <h3 className='card-title'>{this.props.productName}</h3>
          <div className='card-text text-price text-weight-bold'>{`$ ${(this.props.price / 100).toFixed(2)}`}</div>
          <div className='card-text text-short-description'>{this.props.shortDescription}</div>
        </div>
      </div>
    );
  }
}
