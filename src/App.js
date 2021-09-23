import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import FilterSection from './components/FilterSection/FilterSection';
import NavHeader from './components/NavHeader/NavHeader';
import Listing from './components/Logs/Listing';
import Details from './components/Details/Details';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="main-wrapper">
            <div className="main-wrapper-inner">
              <div className="left-side-bar">
                <FilterSection />
              </div>
              <div className="right-content-wrapper">
                <NavHeader />
                <div className="container-switch">
                  {/* react router routes go here */}
                  <Switch>
                    <Route exact path='/' render={(props) => <Listing {...props} />} />
                    <Route exact path='/details' render={(props) => <Details {...props} />} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;