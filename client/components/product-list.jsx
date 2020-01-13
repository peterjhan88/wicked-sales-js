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
          productName={product.name}
          price={product.price}
          shortDescription={product.shortDescription}
        />
      );
    });
    return (
      <div className='col-12 d-flex flex-wrap justify-content-center bg-light'>
        {allProducts}
      </div>
    );
  }
}
