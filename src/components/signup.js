import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import Cookies from 'js-cookie';
export default class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            username:'',
            firstname:'',
            lastname:'',
            email:'',
            password:'',
            passwordConfirm:'',
            birthdate:'',
        }
        this.handleUsername = this.handleUsername.bind(this);
        this.handleFirstname = this.handleFirstname.bind(this);
        this.handleLastname = this.handleLastname.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleBirthdate = this.handleBirthdate.bind(this);
        this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUsername(event){
        this.setState({username:event.target.value});
    }
    handleFirstname(event){
        this.setState({firstname:event.target.value});
    }
    handleLastname(event){
        this.setState({lastname:event.target.value});
    }
    handleEmail(event){
        this.setState({email:event.target.value});
    }
    handleBirthdate(event){
        this.setState({birthdate:event.target.value});
    }
    handlePassword(event){
        this.setState({password:event.target.value});
    }
    handlePasswordConfirm(event){
        this.setState({passwordConfirm:event.target.value});
    }
    handleToken(user){
        if(this.props.token)
            this.props.handleToken(user)
    }
    handleSubmit(event){
        event.preventDefault();
        console.log("Hello")
        if(this.state.password !== this.state.passwordConfirm){
            alert('password does not match');
            return
        }
        let user = {
            username:this.state.username,
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            email:this.state.email,
            birthdate:this.state.birthdate,
            password:this.state.password,
        }
        console.log(user)
        fetch("/api/register", {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => data.json()).then(
            data=>{
                console.log(data)
                if(data.success){
                    let user = {
                        username:this.state.username,
                        type:"Customer",
                        apiToken:data.success.token,
                    }
                    this.handleToken(user);
                }
            }
        ).catch(e=>console.log(e))
    }
    render() {
        return (
            <div className="card px-5 py-3">
                <form className="card-body" method="post" onSubmit = {this.handleSubmit}>
                    <h3 className="card-title text-center">Sign up</h3>
                    <div className="form-row">
                        <div className="col form-group">
                            <input id="1" name="username" type="text" className="form-control" placeholder="username" required value = {this.state.username} onChange={this.handleUsername}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col form-group">
                            <input id="1" name="firstname" type="text" className="form-control" pattern="([A-Za-z]).{2,}" placeholder="First name" required value = {this.state.firstname} onChange={this.handleFirstname}/>
                        </div>
                        <div className="col form-group">
                            <input id="1" name="lastname" type="text" className="form-control" pattern="([A-Za-z]).{2,}" placeholder="Last name" required value = {this.state.lastname} onChange={this.handleLastname}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col form-group">
                            <input id="1" name="email" type="email" className="form-control" placeholder="Email" required value = {this.state.email} onChange={this.handleEmail}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col form-group">
                            <input id="1" name="birthdate" type="date" className="form-control" min="1940-01-01" max="2005-12-31" required value = {this.state.birthdate} onChange={this.handleBirthdate}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col form-group">
                            <input name="password" type="password" className="form-control" placeholder="Password" required value = {this.state.password} onChange={this.handlePassword}/>
                        </div>
                        <div className="col form-group">
                            <input name="passwordConfirm" type="password" className="form-control" placeholder="Confirm password" required value = {this.state.passwordConfirm} onChange={this.handlePasswordConfirm}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col text-center">
                            <button className="btn btn-danger" type="submit" value="Submit">sign up</button>
                        </div>
                    </div>

                </form>
            </div>
        );
    }
}
