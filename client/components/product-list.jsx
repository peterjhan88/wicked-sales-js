import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  getProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(jsonData => {
        this.setState({ products: jsonData });
      })
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const allProducts = this.state.products.map(product => {
      return (
        <ProductListItem
          key={product.productId}
          productId={product.productId}
          imgUrl={product.image}
          name={product.name}
          price={product.price}
          shortDescription={product.shortDescription}
          onClick={this.props.setView}
        />
      );
    });
    return (
      <div className='row flex-wrap justify-content-around px-3 py-3 bg-light col-12'>
        {allProducts}
      </div>
    );
  }
}
