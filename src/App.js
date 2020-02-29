import React, {Component} from 'react';
import './App.css';
import Products from './components/Products';
import {db} from './db';
import Filter from './components/Filter';
import Order from './components/Order';
import SizeFilter from './components/SizeFilter';
import Basket from './components/Basket';
import {formatPrice} from './util';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      products: [],
      filteredProducts: [],
      cartProducts: [],
      sum: 0,
    } 
    this.select = [...db.products];
  }

  componentDidMount() {
    this.setState({ 
        products: db.products,
        filteredProducts: db.products,
        cartProducts: JSON.parse(localStorage.getItem('cartItems')) ,
        sum: formatPrice(JSON.parse(localStorage.getItem('sum')))  
    });
  }

  sortByOrder = (order) => {

      if( order === "Lowest to highest" ) {
        this.setState({
          products: this.state.products.sort(( a,b) => {
            return (a.price - b.price);
          })
        })
        
      } else if (order === "Highest to lowest") {
        this.setState({
          products: this.state.products.sort(( a,b) => {
            return (b.price - a.price);
          })
        })
      }
      else if (order === "Select") {
        this.setState({
          products: this.select
        })
      }
  }

  sortBySize = (size) => {
    const items = [...db.products];
    size === "ALL" ? this.setState({products: items}) : this.setState({
      products: items.filter(product => {
        return product.availableSizes.indexOf(size) >= 0;
      })
    }) 
  }

  addProducts = (product) => {
    this.setState(state => {
      const cartItems = state.cartProducts;
      let productAlreadyInCart = false;
   
      cartItems.forEach(cp => {
        if (cp.id === product.id) {
          cp.count += 1;
          productAlreadyInCart = true;
        }
      });

      if (!productAlreadyInCart) {
        cartItems.push({ ...product, count: 1 });
      }

     let sum = this.sumCartItem(this.state.cartProducts);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("sum", JSON.stringify(sum));
      
      return { 
        cartProducts: JSON.parse(localStorage.getItem('cartItems') ) , 
        sum: formatPrice( JSON.parse(localStorage.getItem('sum')) )
      };
 
    });
  };

  deleteProducts = (id) => {
    this.setState( () => {

      let filterItem = JSON.parse(localStorage.getItem("cartItems")).filter(item => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(filterItem));
      let sum = this.sumCartItem(filterItem);
      localStorage.setItem("sum", JSON.stringify(sum) );
      
      return {
        cartProducts: filterItem ,
        sum: formatPrice(JSON.parse(localStorage.getItem('sum')) ) 
      }
    })
  }

  sumCartItem = (products) => {
    let sum = 0;
    products.forEach(item => {
      sum += item.price*item.count;
    })
   
    return sum;
  }

  render() {

    return (
      <div className="container">
        <h1>Ecommerce Shopping Cart</h1>
        <hr className="bg-dark" />
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-4">
                <Filter count ={this.state.products.length}/>
              </div>
              <div className="col-md-4">
                <Order order ={this.sortByOrder} />
              </div>
              <div className="col-md-4 ">
                <SizeFilter size={this.sortBySize} />
              </div>
            </div>
            <hr className="bg-dark"/>
            <Products products={this.state.products} addProducts={this.addProducts}  />
          </div>
          <div className="col-md-4">
            <Basket 
              cartProducts={this.state.cartProducts} 
              deleteProducts={this.deleteProducts} 
              sum={this.state.sum}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
