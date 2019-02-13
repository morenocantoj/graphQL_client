import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'

import { PRODUCTS_QUERY } from '../../queries'

class Products extends Component {
  state = { }

  render() {
    return (
      <Fragment>
        <h1 className="text-center mb-5">List of Products!</h1>
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
                            <button
                              type="button"
                              className="btn btn-danger">
                              &times; Delete
                            </button>
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
