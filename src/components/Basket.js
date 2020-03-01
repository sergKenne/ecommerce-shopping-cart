import React, { Component } from 'react';


class Basket extends Component {

    render() {
      const headMessage = this.props.cartProducts.length
                            ? 
                                `You have ${this.props.cartProducts.length} items in the basket.`
                            : `Basket is empty`;

   
       return (
           <div className="alert alert-info p-4">

               <p className="h6">{headMessage}</p><br/>
                
               <ul className="pl-3">
                   {this.props.cartProducts.map( (cartProduct) => {
                       return (
                           <li key={cartProduct.id}>
                                <p className="d-inline-block h6">{cartProduct.title}</p> 
                                <button className="btn btn-danger btn-sm d-inline-block float-right" onClick={() => this.props.deleteProducts(cartProduct.id)}>X</button>
                       <div><span>{cartProduct.count}</span> X <span>${cartProduct.price}</span></div>
                            </li>
                       )
                   })}
                   
               </ul>
               { this.props.cartProducts.length !==0
                ? 
                    <div>
                        <span className="mr-3 h5">Sum: {this.props.sum}</span>
                        <button className="btn btn-primary" onClick={()=> alert("are you sure!")}>checkout</button>
                    </div>
                : ""
                    
               }
           </div>
       )
    }
}

export default Basket;
