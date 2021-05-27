import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.css";
import StudentList from './Components/StudentsList';
import DetailsView from './Components/DetailsView';
import NavLinks from './Components/NavLinks';
import RegLink from './Components/RegisterView';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>React</h2>
        <img src={logo} className="App-logo" alt="logo" />
        <h2>MVC</h2>
      </header>
      <Router>
      <NavLinks />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/StudentList" component={StudentList} />
          <Route exact path="/StudentDetails/:id" component={DetailsView} />
          <Route exact path="/RegLink" component={RegLink} />
        </Switch>
      </Router>

     </div>
  );
}

export default App;
