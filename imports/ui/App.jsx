import React, { Component } from 'react';
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Questions } from '../api/questions.js';
import Question from './Question.jsx';
import { Session } from 'meteor/session';


 ////////////
// Header //
////////////

class Header extends React.Component{
  render() {
    return (
      <header className="Header">
      <Logo/>
      <Navigation />
      <Search onSubmit={this.props.onSubmit} />
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
      </ul>
      </nav>
      </div>
      );
  }
};

// Search
class Search extends React.Component{
  render() {
    return (
      <form onSubmit={this.props.onSubmit} id="search" className="Search">
      <input type="search" placeholder="Search for a question..." />
      </form>
      );
  }
};
//////////
// Hero //
//////////

class Hero extends React.Component{
  
  render() {
    return (
      <div id="hero" className="Hero" style={{backgroundImage: 'url(https://images.alphacoders.com/633/633643.jpg)'}}>
      <div className="content">
      <img className="logo" src="http://www.returndates.com/backgrounds/narcos.logo.png" alt="" />
      <h2>Season 2 now available</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque id quam sapiente unde voluptatum alias vero debitis, magnam quis quod.</p>
      <div className="button-wrapper">
      <HeroButton primary={true} text="Watch now" />
      <HeroButton primary={false} text="+ My list" />
      </div>
      </div>
      <div className="overlay"></div>
      </div>
      );
  }
}

// Hero Button
class HeroButton extends React.Component{
  render() {
    return (
      <a className="Button" data-primary={this.props.primary}>{this.props.text}</a>
      );
  }
}
// App component - represents the whole app
class App extends Component {

  performSearch(e) {
    // stop form from submitting
    e.preventDefault();
    
    // get the value
    var val = $('.Search input').val();
    Session.set('query', val);
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
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderQuestions() {
    return this.props.questions.map((question) => (
      <Question key={question._id} question={question} />
      ));
  }


  render() {
    return (
      <div className = "container">
      <Header onSubmit={this.performSearch.bind(this)} />
      <div id="hero" className="Hero" style={{backgroundImage: 'url(https://itbok.files.wordpress.com/2011/03/shutterstock_20850556_resize.jpg)'}}>
      <div className="content">
       <ul>
          {this.renderQuestions()}
        </ul>
      <h1> Pregunta lo que quieras, cuando quieras</h1>
      <p>Con Aski puedes preguntar y responder cientos de preguntas de todas partes del mundo. Solo create una cuenta y accede a la mejor red de preguntas.</p>
      <div className="button-wrapper">
      <HeroButton primary={true} text="Accede ahora" />
      </div>
      </div>
      <div className="overlay"></div>
      </div>
      </div>
      );
  }
}
App.propTypes = {
  questions: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Session.setDefault("query","");
  return {
    questions: Questions.find({question: {'$regex': Session.get("query")}}, { sort: { publishedAt: -1 }}).fetch(),
  };
}, App);