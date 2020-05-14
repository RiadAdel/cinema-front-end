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
import { getUserCookies, setUserCookies, removeUserCookies } from './modules/cookies';
const links = [
  {
    name: "home",
    to: "/",
  },
  {
    name: "browse",
    to: "/browse",
  },
]

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showLogIn: false,
      showSignIn: false,
      signed:false,
      username:"",
      type:""
    }
    this.handleToken = this.handleToken.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleToken(user){
    console.log("login",user)
    setUserCookies(user)
    this.setState({showLogIn:false,showSignIn:false,signed:true,username:user.username,type:user.type})
  }
  handleSignOut(){
    removeUserCookies();
    this.setState({signed:false,username:"",type:""})
    window.location.replace("/")
  }
  componentDidMount(){    
    let user = getUserCookies();
    console.log(user);
    if(user.token)
      this.setState({signed:true,username:user.username,type:user.type})
  }
  render() {
    if(this.state.type === "Admin"){
      links.push(  {
        name: "taskmanager",
        to: "/taskmanager",
      })
    }
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
          <Navbar items={links} signed = {this.state.signed} username ={this.state.username} companyName="The cinema" signout = {this.handleSignOut} signUp={() => this.setState({ showSignIn: true })} logIn={() => this.setState({ showLogIn: true })} itemClick={(item) => console.log(item)} />
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route path="/browse" component={BrowseScreen} />
            <Route path="/reserve" component={ReserveScreen} />
            {
              this.state.type === "Admin"?(
                <Route path="/taskmanager" component={TaskScreen} />
              ):null
            }
            <Route path="/movieshow" component={MovieShowScreen} />
          </Switch>
        </Router>
      </div>
    );
  }
}
