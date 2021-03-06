import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/Layout/Header'
import Customers from './components/Customers/Customers'
import NewCustomer from './components/Customers/NewCustomer'
import EditCustomer from './components/Customers/EditCustomer'

import NewProduct from './components/Products/NewProduct'
import Products from './components/Products/Products'
import EditProduct from './components/Products/EditProduct'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({networkError, graphQLErrors}) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Fragment>
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Customers} />
                <Route exact path="/customers" component={Customers} />
                <Route exact path="/customers/edit/:id" component={EditCustomer} />
                <Route exact path="/customers/new" component={NewCustomer} />
                <Route exact path="/products/new" component={NewProduct} />
                <Route exact path="/products" component={Products} />
                <Route exact path="/products/edit/:id" component={EditProduct} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
