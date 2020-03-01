import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Header } from 'components/Header'
import { Mainer } from 'components/Mainer'
import { Employees } from 'containers/Employees'
import { Home } from 'containers/Home'

function App() {
  return (
    <Router>
      <Header />
      <Mainer>
        <HelmetProvider>
          <Switch>
            <Route path='/employees' exact component={Employees} />
            <Route path='/' exact component={Home} />
          </Switch>
        </HelmetProvider>
      </Mainer>
    </Router>
  );
}

export default App;
