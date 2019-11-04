import React, { Component } from 'react';

import Routes from './routes';

import Header from './components/header';
import Footer from './components/footer';

import './App.css';

class App extends Component {
  render() {
    const currentPath = window.location.pathname;
    return (
      <div>
        <Header />
        <Routes currentPath={currentPath} />
        <Footer />
      </div>
    );
  }
}

export default App;
