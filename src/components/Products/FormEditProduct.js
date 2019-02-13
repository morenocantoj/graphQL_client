import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { UPDATE_PRODUCT } from '../../mutations'

const initialState = {
  name: '',
  price: '',
  stock: ''
}

class FormEditProduct extends Component {

  state = {
    ...this.props.product.getProduct
  }

  cleanState = () => {
    this.setState({
      ...initialState
    })
  }

  updateState = e => {
    const {name, value} = e.target

    this.setState({
      [name]: value
    })
  }

  validateForm = () => {
    const {name, price, stock} = this.state

    const noValid = !name || !price || !stock

    return noValid
  }

  updateProductForm = (e, updateProduct) => {
    e.preventDefault()

    updateProduct().then(data => {
      this.setState({
        ...initialState
      })
    })
  }

  render() {
    const {name, price, stock} = this.state
    const {id} = this.props
    const input = {
      id,
      name,
      price: Number(price),
      stock: Number(stock)
    }
    return (
      <Mutation
        mutation={UPDATE_PRODUCT}
        variables={{input}}
        key={id}
        onCompleted={() => this.props.refetch().then(() => {
          // Redirect to products list
          this.props.history.push('/products')
        })}
        >
        {( updateProduct, {loading, error, data} ) => {
          return (
            <form
              className="col-md-8"
              onSubmit={e => this.updateProductForm(e, updateProduct)} >
              <div className="form-group">
                <label>Name:</label>
                <input
                  onChange={this.updateState}
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Product's name"
                  value={name}
                />
              </div>
              <div className="form-group">
                <label>Price:</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">$</div>
                  </div>
                  <input
                    onChange={this.updateState}
                    type="number"
                    name="price"
                    className="form-control"
                    placeholder="Product's price"
                    value={price}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Stock:</label>
                <input
                  onChange={this.updateState}
                  type="number"
                  name="stock"
                  className="form-control"
                  placeholder="Quantity of stock"
                  value={stock}
                />
              </div>
              <button
                disabled={ this.validateForm() }
                type="submit"
                className="btn btn-success float-right">
                Apply changes
              </button>
            </form>
          )
        }}
      </Mutation>
    )
  }
}

export default withRouter(FormEditProduct)
