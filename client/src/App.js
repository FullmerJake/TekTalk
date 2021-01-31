import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';


import Login from './pages/Login';
import Homepage from './pages/Homepage';

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

const  App = () => {

  return (
  <ApolloProvider client={client}>
    <Router>
      <div className="App"> 
        <main>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/homepage" component={Homepage} />
          </Switch>
        </main>
      </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
