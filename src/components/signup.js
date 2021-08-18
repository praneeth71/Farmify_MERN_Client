import React,{Component} from 'react';
import '../css/signup.css';
import {Redirect} from 'react-router-dom';
import {AuthContext} from '../contexts/AuthContext';


class SignUP extends Component {
    static contextType = AuthContext;
    state = {
        isDealer:false,
        username:'',
        adhaar_id:'',
        contactno:'',
        password:'',
    };

    

    changeRole = (e)=>{
        this.setState(prevState=>({
            ...prevState,
            isDealer:e.target.checked,
        }));
    }

    handleChange = (e)=>{
        e.preventDefault();
        this.setState(prevState=>({
            ...prevState,
            [e.target.name]:e.target.value
        }));
    }

    
    handleSubmit = async (e)=>{
        e.preventDefault();
        document.getElementById('username').textContent = '';
        document.getElementById('adhaar_id').textContent = '';
        document.getElementById('contactno').textContent = '';
        document.getElementById('password').textContent = '';
        document.getElementById('request-error').textContent = '';
        const creds = this.state;
            try{
                const res =  await fetch('/signup', {
                    method: 'POST',
                    body: JSON.stringify(creds),
                    headers: {'Content-Type': 'application/json'}
                });
                const data = await res.json();
                if(data.user){
                    this.setState({redirect:true});
                }
                else if(data.err.rules){
                    console.log('Voilating the rules',data.err.rules);
                    if('username' in data.err.rules){
                        document.getElementById('username').textContent = data.err.rules.userid;
                    }
                    if('adhaar_id' in data.err.rules){
                        document.getElementById('adhaar_id').textContent = data.err.rules.adhaar_id;
                    }
                    if('contactno' in data.err.rules){
                        document.getElementById('contactno').textContent = data.err.rules.contactno;
                    }
                    if('password' in data.err.rules){
                        document.getElementById('password').textContent = data.err.rules.password;
                    } 
                }
                else if(data.err.mongo_error){
                    
                    if('adhaar_id' in data.err.mongo_error.keyPattern){
                        document.getElementById('adhaar_id').textContent = 'This Adhaar Id Already Exists';
                    }
                    if('contactno' in data.err.mongo_error.keyPattern){
                        document.getElementById('contactno').textContent = 'This Conntact No Already Exists';
                    }
                }
                else{
                    console.log(data);
                }
            }catch(e){
                document.getElementById('request-error').textContent = 'Unable To Make Request To Server';
                console.log('signup error : '+e);
            }
    }


    render(){
        const {redirect} = this.state; 
        const {isAuthenticated} = this.context;
        if (redirect || isAuthenticated) {
            return <Redirect to='/login'/>;
          }
        return(
            <div className="signup-form text-light  p-4 border border-light">
                <span id='request-error' className='text-danger h5 text-center'></span>
                <div className="login-heading d-flex justify-content-between">
                    <h3 className="text-start m-4">SignUP To Farmify As {this.state.isDealer===false  ? 'Farmer' : 'Dealer'}</h3>
                    <div className="switch">
                        <div className="custom-control custom-switch border border-light px-2">
                            <input type="checkbox" className="custom-control-input" id="customSwitch" onChange={this.changeRole}/>
                            <label className="custom-control-label px-2  py-3 " htmlFor="customSwitch1"><b>Are You A Dealer ?</b></label>
                        </div>
                    </div>
                </div>
                <form className="container" onSubmit={this.handleSubmit}>
                        <div className="mb-3 row">
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">{this.state.isDealer===false  ? 'Farmer' : 'Dealer'} Name</label>
                            <div className="col-sm-10">
                            <input type="text"  className="form-control" placeholder="Enter Your ID......" name='username' onChange={this.handleChange} required={true} value={this.state.username}/>
                            <small id="username" className="text-light"></small>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="inputAadhar" className="col-sm-2 col-form-label">Aadhar NO</label>
                            <div className="col-sm-10">
                            <input type="number" className="form-control" id="Aadharinput" placeholder="Enter Your Aadhar ID...." name='adhaar_id' onChange={this.handleChange} required={true} value={this.state.adhaar_id}/>
                            <small id="adhaar_id" className="text-light"></small>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="inputContact" className="col-sm-2 col-form-label">Contact NO</label>
                            <div className="col-sm-10">
                            <input type="number" className="form-control" id="Contactinput" placeholder="Enter Your Contact Here...." name='contactno' onChange={this.handleChange} required={true} value={this.state.contactno}/>
                            <small id="contactno" className="text-light"></small>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputPassword" placeholder="Enter Your Password Here...." name='password' onChange={this.handleChange} required={true} value={this.state.password}/>
                            <small id="password" className="text-light"></small>
                            </div>
                        </div>
                       
                    <input type="submit" className="btn btn-success" value="Submit"/>
                    <input type="reset" className="btn btn-danger mx-2" value="Clear"/>
                </form>
               
            </div>
        );
    }
}


export default SignUP;