import React, { Component } from 'react';
import './App.css';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import SiteHeader from './components/SiteHeader';
import PrescriptionsList from './features/prescriptions/PrescriptionsList';
import { fetchPersistLogin } from './services/Utils';
import LoginForm from './components/LoginForm';
import { setHc } from './features/hc/HcSlice';
import { setPrescriptions } from './features/prescriptions/PrescriptionsSlice';
import CompletedRxList from './features/prescriptions/CompletedRxList';

class App extends Component {

  componentDidMount() {
    if(localStorage.token) {
      fetchPersistLogin(localStorage.token)
        .then(this.handleResponse)
    } else {
      this.props.history.push('/')
    }
  }


  handleResponse = (response) => {
    if(!response.message) {
      let {id, name} = response.hc
      let {token} = response
      this.props.dispatch(setHc({id, name, token}))
      this.props.dispatch(setPrescriptions(response.hc))
    } else {
        localStorage.clear()
      }
    }

  renderHome = () => {
    if(localStorage.token) {
      return <PrescriptionsList/>
    } else {
      return <LoginForm/>
    }
  }

  renderCompleted = () => {
    if(localStorage.token) {
      return <CompletedRxList/>
    } else {
      return <LoginForm/>
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SiteHeader/>
          <hr/>
        </header>
        <main className="App-main">
          <Switch>
            <Route path='/' exact render={this.renderHome}/>
            <Route path='/completed' exact render={this.renderCompleted}/>
          </Switch>
        </main>
      </div>
    );
  }
}
  

export default connect(state => state)(withRouter(App));