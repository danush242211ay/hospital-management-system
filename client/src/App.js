import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Staff from './pages/Staff';
import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <div className="container">
            <Switch>
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/patients" component={Patients} />
              <PrivateRoute exact path="/appointments" component={Appointments} />
              <PrivateRoute exact path="/staff" component={Staff} />
            </Switch>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;