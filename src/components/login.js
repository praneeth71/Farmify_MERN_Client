import React from 'react';
import {Component} from 'react';
import '../css/login.css';
import coconut from '../imgs/coconut.png';
import {Redirect} from 'react-router-dom';
import {AuthContext} from '../contexts/AuthContext';

class Login extends Component {
    static contextType = AuthContext;
    state = {
        isDealer:false,
        adhaar_id:'',
        password:'',
        redirect:false,
    };

    changeRole = (e)=>{
        this.setState(prevState=>({
            ...prevState,
            isDealer:e.target.checked
        }));
    }

    handleChange = (e)=>{
        e.preventDefault();
        this.setState(prevState=>(
            {
                ...prevState,
                [e.target.name]:e.target.value,
            }
        ));
    }

    handleSubmit = async  (e,setAuthState)=>{
        e.preventDefault();
        document.getElementById('adhaar_id').textContent = '';
        document.getElementById('password').textContent = '';
        try{
            const res = await fetch('/login',{
                method:'POST',
                body:JSON.stringify(this.state),
                headers:{'Content-Type':'application/json'},
            });
            const data = await res.json();
            if('message' in data){
                const _res = await fetch('/getAuthState',{
                    method:'GET',
                    headers:{'Content-Type':'application/'},
                });
                const user = await _res.json();
                await setAuthState(user.user);
                this.setState({redirect:true});
            }
            if('error' in data){
                if(data.error==='Incorrect AdhaarId Given'){
                    document.getElementById('adhaar_id').textContent = data.error+'/Role';
                }
                if(data.error==='Incorrect Password Given'){
                    document.getElementById('password').textContent = data.error;
                }
            }
        }
        catch(e){
            console.log(`You have Error : ${e}`);
        }
        
    }

    render() {
        const {redirect} = this.state;
        const {setAuthState,isAuthenticated} = this.context;
        const makeLogin = (e)=>{
            this.handleSubmit(e,setAuthState);
        }
        if(redirect || isAuthenticated){
            return <Redirect to='/' />;
        }

        return(
            <div className="login-form text-light p-4 border  border-light">
                <div className="login-heading d-flex justify-content-between">
                    <h3 className="text-start m-4">Login To Farmify As {this.state.isDealer===false  ? 'Farmer' : 'Dealer'}</h3>
                    <div className="switch">
                        <div className="custom-control custom-switch border border-light px-2">
                            <input type="checkbox" className="custom-control-input" id="customSwitch" onChange={this.changeRole}/>
                            <label className="custom-control-label px-2  py-3 " htmlFor="customSwitch1"><b>Are You A Dealer ?</b></label>
                        </div>
                    </div>
                </div>
                <form className="container" onSubmit={makeLogin}>
                        <div className="mb-3 row">
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">{this.state.isDealer===false  ? 'Farmer' : 'Dealer'} Adhaar ID</label>
                            <div className="col-sm-10">
                            <input type="number"  className="form-control" placeholder="Enter Your Adhaar ID......   " value={this.state.adhaar_id} name='adhaar_id' onChange={this.handleChange} required={true}/>
                            <small id="adhaar_id" className="text-light"></small>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputPassword" placeholder="Enter Your Password Here...." value={this.state.password} name='password' onChange={this.handleChange} required={true}/>
                            <small id="password" className="text-light"></small>
                            </div>
                        </div>
                       
                    <input type="submit" className="btn btn-success" value="Submit"/>
                    <input type="reset" className="btn btn-danger mx-2" value="Clear"/>
                </form>
                <div className="animation-widget">
                    <img src={coconut} style={{width:'200px'}} alt='Coconut Not Found'/>
                </div>
            </div>
        );
    }
}

export default Login;