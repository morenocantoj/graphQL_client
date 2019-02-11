import React, { Component, Fragment } from 'react'

import { NEW_CUSTOMER } from '../../mutations'
import { Mutation } from 'react-apollo'

class NewCustomer extends Component {
  state = {
    customer: {
      name: '',
      surname: '',
      company: '',
      email: '',
      type: ''
    },
    error: false,
    emails: []
  }

  // Adds a new dynamic email input
  newField = () => {
    this.setState({
      emails: this.state.emails.concat([{email: ''}])
    })
  }

  // Deletes an existing dynamic email input
  deleteField = i => () => {
    this.setState({
      emails: this.state.emails.filter((email, index) => i !== index)
    })
  }

  // Reads an email from dynamic input
  readField = i => e => {
    const newEmail = this.state.emails.map((email, index) => {
      if (i !== index) return email
      return {
        ...email,
        email: e.target.value
      }
    })
    this.setState({
      emails: newEmail
    })
  }

  render() {
    const { error } = this.state
    let response = (error) ? <p className="alert alert-danger p3 text-center">All fields are required</p> : '';
    return (
      <Fragment>
        <h2 className="text-center">New Customer</h2>
        {response}
        <div className="row justify-content-center">
          <Mutation
            mutation={NEW_CUSTOMER}
            onCompleted={() => this.props.history.push('/')}
            >
            { createCustomer => (
              <form
                className="col-md-8 m-3"
                onSubmit={(e) => {
                  e.preventDefault()

                  const {name, surname, company, age, type} = this.state.customer
                  const {emails} = this.state

                  if (name === '' || surname === '' || company === '' || age === '' || type === '') {
                    this.setState({
                      error: true
                    })
                    return
                  }

                  this.setState({
                    error: false
                  })

                  const input = {
                    name,
                    surname,
                    company,
                    type,
                    age: Number(age),
                    emails
                  }

                  createCustomer({
                    variables: {input}
                  })
                }} >
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      onChange={(e) => {
                        this.setState({
                          customer: {
                            ...this.state.customer,
                            name: e.target.value
                          }
                        })
                      }}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Surname</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Surname"
                      onChange={(e) => {
                        this.setState({
                          customer: {
                            ...this.state.customer,
                            surname: e.target.value
                          }
                        })
                      }}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label>Company</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company"
                      onChange={(e) => {
                        this.setState({
                          customer: {
                            ...this.state.customer,
                            company: e.target.value
                          }
                        })
                      }}
                    />
                  </div>
                  {this.state.emails.map((input, index) => (
                    <div key={index} className="form-group col-md-12">
                      <label>Email: {index + 1}</label>

                      <div className="input-group">
                        <input
                          type="email"
                          placeholder="Email"
                          className="form-control"
                          onChange={this.readField(index)}
                        />

                        <div className="input-group-append">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={this.deleteField(index)}>
                            &times; Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="form-group d-flex justify-content-center col-md-12">
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={this.newField}>
                      + Add Email
                    </button>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Age</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Age"
                      onChange={(e) => {
                        this.setState({
                          customer: {
                            ...this.state.customer,
                            age: e.target.value
                          }
                        })
                      }}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Customer Type</label>
                    <select
                      className="form-control"
                      onChange={(e) => {
                        this.setState({
                          customer: {
                            ...this.state.customer,
                            type: e.target.value
                          }
                        })
                      }}
                      >
                      <option value="">Choose one...</option>
                      <option value="PREMIUM">PREMIUM</option>
                      <option value="BASIC">BASIC</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-success float-right">Add Customer</button>
              </form>
            )}
          </Mutation>
        </div>
      </Fragment>
    )
  }
}

export default NewCustomer
