import React, { Component } from 'react';
import '../styles/App.css';

class ContactFooter extends Component {
  render() {
    return (
      <div className="contact">
        <div className="inline">Github: <a className="blue-link" target='_blank' href="https://github.com/15Dkatz">15Dkatz</a></div>
        <div className="inline">LinkedIn: <a className="blue-link" target='_blank' href="https://www.linkedin.com/in/david-katz-sf">david-katz-sf</a></div>
        <div className="inline">Twitter: <a className="blue-link" target='_blank' href="https://twitter.com/dkcodehelper">dkcodehelper</a></div>
        <div className="inline">Email: <a className="blue-link" target='_blank' href="mailto:dtkatz@dons.usfca.edu">dtkatz</a></div>
      </div>
    )
  }
}

export default ContactFooter;
