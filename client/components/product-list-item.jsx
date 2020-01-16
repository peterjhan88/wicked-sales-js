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
      <div className='col-md-3 my-3 mx-3 pt-3 d-flex align-items-center card card-list overflow-hidden' >
        <div className='image-container-list cursor-pointer' onClick={this.handleClick}>
          <img src={this.props.imgUrl} alt={this.props.name} className='image-contain' />
        </div>
        <div className='card-body card-body-list-item'>
          <h3 className='card-title'>{this.props.name}</h3>
          <div className='card-text text-price text-weight-bold'>{`$ ${(this.props.price / 100).toFixed(2)}`}</div>
          <div className='card-text text-short-description'>{this.props.shortDescription}</div>
        </div>
      </div>
    );
  }
}
