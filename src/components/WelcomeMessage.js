import React from 'react';
import './WelcomeMessage.css';

export default class WelcomeMessage extends React.Component {
  render() {
    return (
      <div>
        <h2 className="welcomeMSG">Welcome to Quote Catcher</h2>
        <p className="welcomeParagraph">This space is designed to store and organize noteworthy quotes you may find in books or while simply going throughout your day.</p>
      </div>
    );
  }
}