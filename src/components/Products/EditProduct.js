import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'

import FormEditProduct from './FormEditProduct'

import { PRODUCT_QUERY } from '../../queries'

class EditProduct extends Component {

  state = { }



  render() {
    // Product id
    const {id} = this.props.match.params

    return (
      <Fragment>
        <h1 className="text-center">Edit Product</h1>
        <div className="row justify-content-center">
          <Query query={PRODUCT_QUERY} variables={{id}}>
            {({ loading, error, data, refetch }) => {
              if (loading) return "Loading..."
              if (error) return `Error: ${error.message}`
              return (
                <FormEditProduct
                  product={data}
                  id={id}
                  refetch={refetch}
                />
              )
            }}
          </Query>
        </div>
      </Fragment>
    )
  }
}

export default EditProduct
