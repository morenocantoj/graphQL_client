import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo'

import { CUSTOMERS_QUERY } from '../../queries'
import { DELETE_CUSTOMER } from '../../mutations'

import Paginate from '../Paginate'

class Customers extends Component {

  limit = 5

  state = {
    paginate: {
      offset: 0,
      actual: 1,
    }
  }

  PreviousPage = () => {
    this.setState({
      paginate: {
        offset: this.state.paginate.offset - this.limit,
        actual: this.state.paginate.actual - 1
      }
    })
  }

  NextPage = () => {
    this.setState({
      paginate: {
        offset: this.state.paginate.offset + this.limit,
        actual: this.state.paginate.actual + 1
      }
    })
  }

  render() {
    return (
      <Query query={CUSTOMERS_QUERY} pollInterval={1000} variables={{limit: this.limit, offset: this.state.paginate.offset}}>
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

                <Paginate
                  actual={this.state.paginate.actual}
                  total={data.totalCustomers}
                  limit={this.limit}
                  PreviousPage={this.PreviousPage}
                  NextPage={this.NextPage}/>
              </Fragment>
            )
          }
        }
      </Query>
    )
  }
}

export default Customers
