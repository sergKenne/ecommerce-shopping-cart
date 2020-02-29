import React, { Component } from 'react'

class SizeFilter extends Component {

    constructor(props) {
        super(props) 
        this.state= {
            value: ""
        }
        this.handleSizeChange = this.handleSizeChange.bind(this);
    }

    handleSizeChange(e) {
        new Promise( (res) => {
            this.setState({
                value : e.target.value   
            });
           res()
        }).then( () => {

            this.props.size( this.state.value);  
        })

    }

    render() {
 
        return (
            <div>
                <span>Filter Size</span>
                <select className="custom-select" value={this.state.value}  onChange={this.handleSizeChange}>
                    <option value="ALL">ALL</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXl</option>
                </select>
            </div>
        )
    }
}
export default SizeFilter;