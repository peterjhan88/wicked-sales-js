import React from 'react';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const params = {
      productId: this.props.productId
    };
    this.props.onClick('details', params);
  }

  render() {
    return (
      <div className='col-md-3 my-3 mx-3 d-flex align-items-center card overflow-hidden' onClick={this.handleClick}>
        <img src={this.props.imgUrl} alt="product Image" className='card-img-top image-contain' />
        <div className='card-body'>
          <h3 className='card-title'>{this.props.name}</h3>
          <div className='card-text text-price text-weight-bold'>{`$ ${(this.props.price / 100).toFixed(2)}`}</div>
          <div className='card-text text-short-description'>{this.props.shortDescription}</div>
        </div>
      </div>
    );
  }
}
