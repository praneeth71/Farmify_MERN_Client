import React, { Component, createContext } from 'react';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
    state = {
        isAuthenticated: false,
        user:null,
    };

    async componentDidMount() {
        const res  = await fetch('/getAuthState',{
            method:'GET',
            headers:{'Content-Type':'application/json'},
        });
        const data = await res.json();
       if('user' in data){
           this.setAuthState(data.user);
       }
       else{
           this.setAuthState(null);
       }
    }

    setAuthState = (user)=>{
        if(user){
            this.setState({
                isAuthenticated:true,
                user:user
            });
        }
        else{
            this.setState({
                isAuthenticated:false,
                user:null,
            });
        }
    }


    render(){
        return (
            <AuthContext.Provider value={{...this.state,setAuthState:this.setAuthState}}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}


export default AuthContextProvider;
