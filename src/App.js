import React, { Component } from 'react';
import ReactGA from 'react-ga';
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Contact from './Components/Contact';
import Portfolio from './Components/Portfolio';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      foo: 'bar',
      resumeInfo: {}
    };

    ReactGA.initialize('UA-110570651-1');
    ReactGA.pageview(window.location.pathname);

  }

  getResumeData(){
    $.ajax({
      url:'./resumeData.json',
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({resumeInfo: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount(){
    this.getResumeData();
  }

  render() {
    return (
      <div className="App">
        <Header data={this.state.resumeInfo.main}/>
        <About data={this.state.resumeInfo.main}/>
        <Resume data={this.state.resumeInfo.resume}/>
        <Portfolio data={this.state.resumeInfo.portfolio}/>
        <Contact data={this.state.resumeInfo.main} repos={this.state.resumeInfo.portfolio}/>
        <Footer data={this.state.resumeInfo.main}/>
      </div>
    );
  }
}

export default App;
