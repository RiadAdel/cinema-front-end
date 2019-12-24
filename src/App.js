import React from 'react';
import './App.css';
import './assets/color.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HomeScreen from './screens/homescreen';
import Navbar from './components/navbar';
import BrowseScreen from './screens/browsescreen';
import Overlay from './components/ovelay';
import Login from './components/login';
import SignUp from './components/signup';
import ReserveScreen from './screens/reservescreen';
import TaskScreen from './screens/taskscreen';
import MovieShowScreen from './screens/movieShowScreen';
import { getUserCookies, setUserCookies } from './modules/cookies';
const links = [
  {
    name: "home",
    to: "/",
  },
  {
    name: "browse",
    to: "/browse",
  },
  {
    name: "taskmanager",
    to: "/taskmanager",
  }
]

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showLogIn: false,
      showSignIn: false,
      signed:false,
    }
    this.handleToken = this.handleToken.bind(this);
  }

  handleToken(user){
    setUserCookies(user)
    this.setState({showLogIn:false,showSignIn:false,signed:true})
    console.log(getUserCookies())
  }
  componentDidMount(){
    
    let user = getUserCookies();
    console.log(user)
  }
  render() {
    return (
      <div className="App">
        <Router>
          {
            this.state.showLogIn ? (<Overlay hide={() => this.setState({ showLogIn: false })}>
              <Login handleToken = {this.handleToken}/>
            </Overlay>) : null
          }
          {
            this.state.showSignIn ? (<Overlay hide={() => this.setState({ showSignIn: false })}>
              <SignUp handleToken = {this.handleToken} />
            </Overlay>) : null
          }
          <Navbar items={links} signed = {this.state.signed} username ={this.state.username} companyName="The cinema" username="Riad Adel" signUp={() => this.setState({ showSignIn: true })} logIn={() => this.setState({ showLogIn: true })} itemClick={(item) => console.log(item)} />
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route path="/browse" component={BrowseScreen} />
            <Route path="/reserve" component={ReserveScreen} />
            <Route path="/taskmanager" component={TaskScreen} />
            <Route path="/movieshow" component={MovieShowScreen} />
          </Switch>
        </Router>
      </div>
    );
  }
}
