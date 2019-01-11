import React, { Component } from 'react';
import './App.scss';
import Input from './components/Input';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Input} />
        </div>
      </Router>
    );
  }
}

export default App;
