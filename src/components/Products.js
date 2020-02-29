import React, { Component } from 'react';
import {formatPrice} from '../util'

class Products extends Component {

    render() {
        const {products} = this.props;
        const productsItem = products.map( (product) => {
            return (
                <div className="col-md-4 mb-3" key={product.id}>
                    <div className="thumbnail text-center bg-dark py-2">
                        <a href={`#${product.id}`}>
                            <img src={`images/${product.sku}_2.jpg`}  alt={product.title}/>
                            <p className="pt-2">{product.title}</p>
                        </a>
                        <div className="mt-3">
                            <b>{ formatPrice(product.price) }</b>
                            <button className="btn btn-primary" onClick={ () => this.props.addProducts(product)}>Add to cart</button>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className="row">
               {productsItem}
            </div>
        )
    }
}

export default Products;
