import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo'

import { CUSTOMERS_QUERY } from '../queries'
import { DELETE_CUSTOMER } from '../mutations'

const Contacts = () => (
  <Query query={CUSTOMERS_QUERY} pollInterval={1000}>
    {
      ({ loading, error, data, startPolling, stopPolling }) => {
        if (loading) return "Loading..."
        if (error) return `Error: ${error.message}`

        return (
          <Fragment>
            <h2 className="text-center">Customers List</h2>
            <ul className="list-group mt-4">
              { data.getCustomers.map(item => (
                <li key={item.id} className="list-group-item">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-8 d-flex justify-content-between align-items-center">
                      { item.name } { item.surname } - { item.company }
                    </div>
                    <div className="col-md-4 d-flex justify-content-end">
                      <Mutation mutation={DELETE_CUSTOMER}>
                        { deleteCustomer => (
                          <button
                            type="button"
                            className="btn btn-danger d-block d-md-inline-block mr-2"
                            onClick={() => {
                              if (window.confirm('Are you sure to delete this customer?')) {
                                const {id} = item

                                deleteCustomer({
                                  variables: {id}
                                })
                              }
                            }}
                            >
                            &times; Delete
                          </button>
                        ) }
                      </Mutation>
                      <Link to={`/customers/edit/${item.id}`} className="btn btn-success d-block d-md-inline-block">
                        Edit Customer
                      </Link>
                    </div>
                  </div>
                </li>
              )) }
            </ul>
          </Fragment>
        )
      }
    }
  </Query>
)


export default Contacts
