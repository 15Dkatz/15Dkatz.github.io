import React, { Component } from 'react';
import './styles/App.css';
import About from './components/About';
import Portfolio from './components/Portfolio';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePage: 'About'
    }
  }

  navigate(page) {
    console.log('navigate to', page);
    this.setState({activePage: page});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="header-e header-left">&#123; David_Katz&#8725;&#125;</div>
          <div className="header-e header-right">
            <div
              onClick={() => this.navigate('About')}
              className={this.state.activePage === 'About' ? "header-e selected cursor" : "header-e cursor"}>About</div>
            <div
              className={this.state.activePage === 'Portfolio' ? "header-e selected cursor" : "header-e cursor"}
              onClick={() => this.navigate('Portfolio')}>Portfolio</div>
          </div>
        </div>
        {
          this.state.activePage === 'About' ? <About/> : <Portfolio />
        }
      </div>
    );
  }
}

export default App;
