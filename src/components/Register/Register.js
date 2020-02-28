import React,{Component} from 'react';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            registerEmail: '',
            registerPassword: '',
            registerName: ''
        }
    }
    onEmailChange = (event) =>{
        this.setState({registerEmail:event.target.value});
    }
    onPasswordChange = (event) => {
        this.setState({registerPassword:event.target.value});
    }
    onNameChange = (event) => {
        this.setState({registerName:event.target.value});
    }
    onSubmitForm = (event) => {
        fetch(process.env.REACT_APP_SERVER_URL+'/register',{
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({
                email: this.state.registerEmail,
                password: this.state.registerPassword,
                name: this.state.registerName
            })
        }).then(response => response.json()).then(
            user => {
                if(user.status===200) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            }
        ).catch(error =>console.log(error))
    }
    render() {
        return(
            <article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-300 w-100-m w-25-l center">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="text" name="name" id="name"
                                       onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="email" name="email-address" id="email-address"
                                onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="password" name="password" id="password"
                                onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitForm}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit" value="Register" />
                        </div>
                    </form>
                </main>
            </article>
        )
    }
}
export default Register;