import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import Cookies from 'js-cookie';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            done: false,
            notSigned: true,
        };
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUsername(event) {
        this.setState({ username: event.target.value });
    }
    handlePassword(event) {
        this.setState({ password: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        alert("Hello");
        let login = {
            username: this.state.username,
            password: this.state.password,
        }
        fetch('/api/login', {
            method: 'post',
            body: JSON.stringify(login),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            data => (data).json()
        ).then(
            data => {
                this.setState({ notSigned: false, done: data.success ? true : false });
                if (this.state.notSigned === false && this.state.done === true)
                    this.handleToken({ token: data.success.token, type: data.success.type, username: this.state.username });
            }
        )
    }
    handleToken(user) {
        console.log(user)
        if(this.props.handleToken)
            this.props.handleToken(user);
        // Cookies.set('apiToken', user.token)
        // Cookies.set('type', user.type)
        // Cookies.set('username', user.username)
        // console.log(Cookies.get('username'))
        //this.setState({notSigned:true,done:false,username:"",password:""});
        //this.props.handleToken(user);
    }
    render() {
        return (
            <div className="card px-5 py-3">
                <form className="card-body" method="post" onSubmit={this.handleSubmit}>
                    <h3 className="card-title text-center">Sign in</h3>
                    <div className="form-row">
                        <div className="col form-group">
                            <label>Username</label>
                            <input id="1" name="username" type="text" className="form-control" placeholder="" required value={this.state.username} onChange={this.handleUsername} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col form-group">
                            <label>Password</label>
                            <input name="password" type="password" className="form-control" placeholder="" required value={this.state.password} onChange={this.handlePassword} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col text-center">
                            <button className="btn btn-danger" type="submit" value="Submit">sign in</button>
                        </div>
                    </div>
                    <div className="form-row justify-content-center">
                        {
                            this.state.notSigned ? (
                                <small className='text-secondary p-1 mt-2 w-100'>Make sure that your info is correct.</small>
                            ) : this.state.done ? (
                                <small className='text-success p-1 mt-2 w-100'>Done! you are logged in</small>
                            ) : (
                                        <small className='text-danger p-1 mt-2 w-100'>The info that you've entered is incorrect.</small>
                                    )
                        }
                    </div>
                </form>
            </div>
        );
    }
}
