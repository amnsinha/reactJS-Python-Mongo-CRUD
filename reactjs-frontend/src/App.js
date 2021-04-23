import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListUniversityComponent from './components/ListUniversityComponent';
import HeaderComponent from './components/HeaderComponent';
import CreateUniversityComponent from './components/CreateUniversityComponent';
import ViewUniversityComponent from './components/ViewUniversityComponent';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListUniversityComponent}></Route>
                          <Route path = "/university" component = {ListUniversityComponent}></Route>
                          <Route path = "/add-university/:id" component = {CreateUniversityComponent}></Route>
                          <Route path = "/view-university/:id" component = {ViewUniversityComponent}></Route>
                    </Switch>
                </div>

        </Router>
    </div>
    
  );
}

export default App;
