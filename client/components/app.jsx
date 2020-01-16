import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

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
    this.placeOrder = this.placeOrder.bind(this);
    this.removeItem = this.removeItem.bind(this);
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

  placeOrder(orderDetails) {
    const headersToOrder = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    };
    fetch('/api/orders', headersToOrder)
      .then(response => response.json())
      .then(jsonData => {
        this.setState({ cart: [] });
      })
      .catch(err => {
        console.error(err);
      });
  }

  removeItem(cartItemId) {
    fetch(`/api/cartItems/${cartItemId}`, { method: 'DELETE' })
      .then(response => {
        this.setState(previousState => {
          var newCart = previousState.cart;
          for (var index = 0; index < newCart.length; index++) {
            if (newCart[index].cartItemId === cartItemId) {
              newCart.splice(index, 1);
            }
          }
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
    let renderingElement;
    if (this.state.view.name === 'catalog') {
      renderingElement = <ProductList setView={this.setView} />;
    } else if (this.state.view.name === 'details') {
      renderingElement = (
        <ProductDetails
          params={this.state.view.params}
          setView={this.setView}
          addToCart={this.addToCart}
        />
      );
    } else if (this.state.view.name === 'cart') {
      renderingElement = (
        <CartSummary
          cart={this.state.cart}
          setView={this.setView}
          removeItem={this.removeItem}
        />
      );
    } else if (this.state.view.name === 'checkout') {
      renderingElement = (
        <CheckoutForm
          setView={this.setView}
          placeOrder={this.placeOrder}
          orderTotal={this.state.cart.length === 0 ? 0 : this.state.cart.reduce((acc, item) => acc + item.price, 0)}
          numberOfItemsInCart={this.state.cart.length}
        />
      );
    }
    return (
      <>
        <Header
          cartItemCount={this.state.cart.length}
          setView={this.setView}
        />
        { renderingElement }
      </>
    );
  }
}
