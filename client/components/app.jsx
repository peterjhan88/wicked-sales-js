import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(result => result.json())
      .then(jsonData => {
        this.setState({ cart: jsonData });
      })
      .catch(err => {
        console.error(err);
      });
  }

  addToCart(product) {
    const productToAdd = {
      productId: product.productId
    };
    const headersToAdd = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productToAdd)
    };
    fetch('/api/cart', headersToAdd)
      .then(response => response.json())
      .then(jsonData => {
        this.setState(previousState => {
          var newCart = previousState.cart;
          newCart.push(jsonData);
          return { cart: newCart };
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.getCartItems();
  }

  render() {
    return (
      <>
        <Header cartItemCount={this.state.cart.length}/>
        {
          this.state.view.name === 'catalog'
            ? <ProductList
              setView={this.setView}
            />
            : <ProductDetails
              params={this.state.view.params}
              setView={this.setView}
              addToCart={this.addToCart}
            />
        }
      </>
    );
  }
}
