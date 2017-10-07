import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { createContainer } from "meteor/react-meteor-data";
import { Session } from "meteor/session";
import {Meteor} from "meteor/meteor"
///////////
// Header //
////////////

class Nav extends React.Component{

  performSearch(e) {
    // stop form from submitting
    e.preventDefault();

    // get the value
    var val = $(".Search input").val();
    Session.set("query", val);
    $(".Search input").val("") ;
  }
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Questions.insert({
      question: text,
      publishedAt: new Date(), // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = "";
  }

  renderQuestions() {
    return this.props.questions.map((question) => (
      <Question key={question._id} question={question} />
    ));
  }

  render() {
    return (
      <header className="Header">
        <Logo/>
        <Navigation currentUser={this.props.currentUser}/>
        <Search onSubmit={this.performSearch.bind(this)} />
      </header>
    );
  }
}
class Logo extends React.Component{
  render() {
    return (
      <div id="logo" className="Logo">
        <svg width="300" height="81.38" xmlns="http://www.w3.org/2000/svg">
          <g>
            <title>Layer 1</title>
            <text stroke="#000" textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize="24" id="svg_12" y="250.7" x="457.5" fillOpacity="null" strokeOpacity="null" strokeWidth="0" fill="#000000"/>
            <path id="svg_13" d="m373.5,241.7" opacity="0.5" fillOpacity="null" strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="none"/>
            <text fontStyle="normal" fontWeight="bold" stroke="#000" transform="matrix(5.457497378637608,0,0,3.228946107668764,-685.360303996764,-391.9010894248071) " textAnchor="start" fontFamily="'Palatino Linotype', 'Book Antiqua', Palatino, serif" fontSize="24" id="svg_14" y="143.212316" x="126.374748" strokeOpacity="null" strokeWidth="0" fill="#ff3426">Aski</text>
          </g>
        </svg>
      </div>
    );
  }
}

// Navigation
class Navigation extends React.Component{
  render() {
    return (
      <div id="navigation" className="Navigation">
        <nav>
          <ul>
            <li>Browse</li>
            <li>My Questions</li>
            <li>Top picks</li>
            {this.props.currentUser ?
              <div className="account pull-right">
              <img src="/img/profile_placeholder.svg" class="profile-pic"/>
              <div className="details">
              <p className="headline">Logged in as:</p>
              <p className="username text-primary">{this.props.currentUser.username}</p>
              </div>
              <li className="logout" onClick={() => Meteor.logout()}>Log Out</li>
              </div>
              : ""
            }
          </ul>
        </nav>
      </div>
    );
  }
}

// Search
class Search extends React.Component{
  render() {
    return (
      <form onSubmit={this.props.onSubmit} id="search" className="Search">
        <input type="search" placeholder="Search for a question..." />
      </form>
    );
  }
}

export default createContainer(() => {
  Session.setDefault("query","");
  return {
    currentUser:Meteor.user(),
  };
}, Nav);