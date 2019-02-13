import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'

import { PRODUCTS_QUERY } from '../../queries'
import { DELETE_PRODUCT } from '../../mutations'

import Success from '../Alerts/Success'

class Products extends Component {
  state = {
    alert: {
      show: false,
      message: ''
    }
  }

  render() {
    const {alert: {show, message}} = this.state

    const alert = (show) ? <Success message={message} /> : ''

    return (
      <Fragment>
        <h1 className="text-center mb-5">List of Products!</h1>
        {alert}
        <Query query={PRODUCTS_QUERY} pollInterval={1000}>
          {
            ({ loading, error, data, startPolling, stopPolling }) => {
              if (loading) return "Loading..."
              if (error) return `Error: ${error.message}`
              console.log(data)
              return (
                <table className="table">
                  <thead>
                    <tr className="table-primary">
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Stock</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.getProducts.map((item) => {
                      const {id} = item;

                      return (
                        <tr key={id}>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                          <td>{item.stock}</td>
                          <td>
                            <Link to={`/products/edit/${id}`} className="btn btn-success">
                              Edit Product
                            </Link>
                          </td>
                          <td>
                            <Mutation
                              mutation={DELETE_PRODUCT}
                              onCompleted={(data) => {
                                // Show an alert
                                this.setState({
                                  alert: {
                                    show: data.deleteProduct,
                                    message: 'Product deleted successfully'
                                  }
                                }, () => {
                                  setTimeout(() => {
                                    this.setState({
                                      alert: {
                                        show: false,
                                        message: ''
                                      }
                                    })
                                  }, 3000)
                                })
                              }}
                              >
                              {deleteProduct => (
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={ () => {
                                    if (window.confirm('Are you sure of delete this product?')) {
                                      deleteProduct({
                                        variables: {id}
                                      })
                                    }
                                  }}
                                  >
                                    &times; Delete
                                </button>
                              )}
                            </Mutation>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )

            }}
          </Query>
      </Fragment>
    )
  }
}

export default Products
