import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.setView('catalog', {});
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.params.productId}`)
      .then(response => response.json())
      .then(jsonData => {
        this.setState({ product: jsonData });
      })
      .catch(error => console.error(error));
  }

  render() {

    return !this.state.product ? null
      : (
        <div className='d-flex align-items-center justify-content-center flex-wrap card col-11 mx-5 my-3 py-3 bg-light'>
          <div className='row d-flex align-items-center justify-content-around'>
            <div className='col-12 back-to-catalog my-3' onClick={this.handleClick}>{'< Back to catalog'}</div>
            <img src={this.state.product.image} alt={this.state.product.name} className='image-detail'/>
            <div className='col-4'>
              <h3>{this.state.product.name}</h3>
              <div className='text-price text-weight-bold'>{`$ ${(this.state.product.price / 100).toFixed(2)}`}</div>
              <div className='text-short-description'>{this.state.product.shortDescription}</div>
            </div>
          </div>
          <div className='col-11 my-3'>{this.state.product.longDescription}</div>
        </div>
      );
  }
}
