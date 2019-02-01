import gql from 'graphql-tag'

export const NEW_CUSTOMER = gql`
  mutation createCustomer($input: CustomerInput) {
    createCustomer(input: $input) {
      id
      name
      surname
    }
  }`

export const UPDATE_CUSTOMER = gql`
  mutation updateCustomer($input: CustomerInput) {
    updateCustomer(input: $input) {
      id
      name
      surname
      age
      company
      type
      emails {
        email
      }
    }
  }
`
