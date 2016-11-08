import React from 'react';

import './footer.css';
import logo from './logo.png';

export default function Footer() {
  return (
    <div className="ui inverted vertical footer segment">
      <div className="ui center aligned container">
        <div className="ui stackable inverted divided grid">
          <div className="sixteen wide column">
            <h4 className="ui inverted header">Footer Header</h4>
            <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
          </div>
        </div>
        <div className="ui inverted section divider"></div>
        <img src={logo} className="ui centered mini image" />
        <div className="ui horizontal inverted small divided link list">
          <a className="item" href="#">Site Map</a>
          <a className="item" href="#">Contact Us</a>
          <a className="item" href="#">Terms and Conditions</a>
          <a className="item" href="#">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}
