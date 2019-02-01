import gql from 'graphql-tag'

export const CUSTOMERS_QUERY = gql`{
  getCustomers{
    id
    name
    surname
    company
  }
}`

export const CUSTOMER_QUERY = gql`
  query CheckCustomer($id: ID) {
    getCustomer(id: $id){
      id
      name
      surname
      company
      age
      type
      emails {
        email
      }
    }
  }
`
