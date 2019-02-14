import gql from 'graphql-tag'

export const CUSTOMERS_QUERY = gql`
  query getCustomers($limit: Int, $offset: Int) {
    getCustomers(limit: $limit, offset: $offset){
      id
      name
      surname
      company
    }
    totalCustomers
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

export const PRODUCTS_QUERY = gql`
  query getProducts($limit: Int, $offset: Int) {
    getProducts(limit: $limit, offset: $offset){
      id
      name
      price
      stock
    }
    totalProducts
}`

export const PRODUCT_QUERY = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      name
      price
      stock
    }
  }
`
