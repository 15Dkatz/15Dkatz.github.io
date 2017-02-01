import React, {Component} from 'react';
import PortfolioItem from './PortfolioItem';
import ContactFooter from './ContactFooter';
import '../styles/App.css';
import mhacks from '../img/mhacks.png';
import pennApps from '../img/pennApps.png';
import civicHacks from '../img/civicHacks.png';
import codeDay from '../img/codeDay.png';
import spaceApps from '../img/SpaceApps.png';
import wicsAthon from '../img/WIcsathon.png';
import technovation from '../img/technovation.png';
import reactJSImage from '../img/reactJS_courseImage.png';
import reactNativeImage from '../img/reactNative_courseImage.jpeg';

const hackathonItems = [
  {description: 'Mhacks 8 | Addle - Ads for Apple', pic: mhacks, link: 'http://devpost.com/software/addle'},
  {description: 'PennApps XIV | PicSpeak - Hear a picture in any language', pic: pennApps, link: 'http://devpost.com/software/picspeak-5l9bko'},
  {description: 'SF Civic Data Hackathon | 2nd Place | Hobs - find affordable homes and jobs', pic: civicHacks, link: 'http://hackathon.sfsu.edu/'},
  {description: 'Code Day Bay Area | Winner - Most Promising App | Hackhype - the place for coding jokes, tips, and events', pic: codeDay, link: 'https://itunes.apple.com/us/app/hackhype/id1116490451?ls=1&mt=8'},
  {description: 'NASA SpaceAppsSF | Winner | Dronership - know "weather" to fly", spaceApps', pic: spaceApps, link: 'https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1109455719&mt=8'},
  {description: 'WICSathon | Winner | Flexiback - trade USF meal plan money', pic: wicsAthon, link: 'https://itunes.apple.com/us/app/flexiback/id1105199135?mt=8'},
  {description: 'Technovation | Coach | Waterwise - Helped three 10-yo girls make an app to fight the CA drought', pic: technovation, link: 'https://www.youtube.com/watch?v=ErI6bvsSBes'}
]

const onlineItems = [
  {description: 'ReactJS & Redux - Mastering Web Apps', pic: reactJSImage, link: 'http://udemy.com/course/react-js-and-redux-mastering-web-apps'},
  {description: 'React Native: Build Your Own Mobile Apps', pic: reactNativeImage, link: 'https://www.udemy.com/react-native-build-your-own-mobile-apps/'}
]


class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      id: null
    }
  }

  render() {
    return (
      <div className='App-portfolio'>
        <div className="h-3 fade-3">Hackathons & Competitions</div>
        <div className="projects">
          {
            hackathonItems.map((item, index) => {
              const { description, pic, link } = item;
              return (
                <PortfolioItem
                  key={index}
                  id={index}
                  description={description}
                  pic={pic}
                  link={link}
                />
              )
            })
          }
        </div>
        <br />
        <div className="h-3 fade-3">Online Courses</div>
        <div className="projects">
          {
            onlineItems.map((item, index) => {
              const { description, pic, link } = item;
              return (
                <PortfolioItem
                  key={index}
                  id={index}
                  description={description}
                  pic={pic}
                  link={link}
                />
              )
            })
          }
        </div>
        <br/>
        <ContactFooter />
      </div>
    )
  }
}

export default Portfolio;
