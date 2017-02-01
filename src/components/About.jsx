import React, {Component} from 'react';
import { Link } from 'react-router';
import profile from '../img/profile.jpg';
import '../styles/App.css';

import ContactFooter from './ContactFooter';

class About extends Component {
  render() {
    return (
      <div className="App-body">
        <img src={profile} className="profile" alt="[hip, hip]"/>
        <div className="intro">
          <div className="h fade-5"> Hello world !</div>
          <p>I'm David - a native San Franciscan and biracial American. I study computer science at the University of San Francisco.</p>
          <p>I'm a self-taught full-stack developer hoping to become a software engineer. In my spare time, I make apps of all kind. </p>
          <p>I've used technologies like ReactJS, React Native, NodeJS, and plenty more to build my applications.</p>
          <p>Also, because the programming community has given me so much, I spend a lot of time teaching.</p>
          <p>At MVCodeClub, I help kids make games and learn to code. Their "ah-hah" moments always make my day.</p>
          <p>I also published three Udemy courses! One on&nbsp;
            <a target='_blank' href="https://www.udemy.com/react-js-and-redux-mastering-web-apps/">React Js and Redux</a>,
            another on <a target='_blank' href="https://www.udemy.com/react-native-build-your-own-mobile-apps/">React Native</a>, and one more on <a target="_blank" href="https://www.udemy.com/essentials-in-javascript-es6">ES6</a>.
          </p>
          <br/>
          <p>I'm always looking to work on a meaningful project! Here's my <a target='_blank' href="https://docs.google.com/document/d/1prpwpKFW4PhYCo2vVOsBHTCg_zMCWUlyVBwkKisZgQ0/edit?usp=sharing">resume</a>.</p>
          <Link to={'tictactoe'} target="_blank"><p>Also, how about a quick game of tic-tac-toe?</p></Link>
        </div>
        <ContactFooter />
      </div>
    )
  }
}

export default About;
