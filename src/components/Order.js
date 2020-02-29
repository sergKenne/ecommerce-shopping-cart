import React, { Component } from 'react'

export default class Order extends Component {
    state = {
        order:"select"
    }

    handleChangeOrder = (e) => {

        new Promise( (res) => {
            this.setState({
                order : e.target.value   
            });
           res()
        }).then( () => {
             this.props.order( this.state.order);  
        })
       
    }

    render() {
        return (
            <div>
                <span>Order by</span>
                <select className="custom-select" value={this.state.order} onChange={this.handleChangeOrder}>
                    <option value="Select">Select</option>
                    <option value="Lowest to highest">Lowest to highest</option>
                    <option value="Highest to lowest">Highest to lowest</option>
                </select>
            </div>
        )
    }
}
