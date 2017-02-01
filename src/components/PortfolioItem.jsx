import React, { Component } from 'react';
import test from '../img/test.jpeg';

class PortfolioItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null
    }
  }

  render() {
    return (
      <div
        className="portfolio_pic"
        onMouseEnter={() => this.setState({id: this.props.id})}
        onMouseLeave={() => this.setState({id: null})}
      >
        <img
          src={this.props.pic == null ? test : this.props.pic}
          className={this.state.id === this.props.id ? "portfolio_img darken-img" : "portfolio_img"}
          alt='[hip, hip C]'
        />
        <p className={this.state.id === this.props.id ? "portfolio_text" : "no_text"}>
          <a className='no-link-dec' target='_blank' href={this.props.link}>{this.props.description}</a>
        </p>
      </div>
    )
  }
}

export default PortfolioItem;
