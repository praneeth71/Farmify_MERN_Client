import React,{Component} from 'react';
import {AuthContext} from '../contexts/AuthContext';




class Profile extends Component {
    static contextType = AuthContext;
    state = {
        crop_count : 0,
        deal_count: 0,
    }
    capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    getCropCount = async (adhaar_id)=>{
        try{
            const res = await fetch('/get-crop-count',{
                method: 'POST',
                body: JSON.stringify({adhaar_id}),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            if('count' in data) {
                this.setState({crop_count:data.count});
            }
            else{
                this.setState({crop_count:0});
            }
        }
        catch(e){
            this.setState({crop_count:0});
        }
        
    }

    getDealCount = async (adhaar_id)=>{
        try{
            const res = await fetch('/get-deal-count',{
                method: 'POST',
                body: JSON.stringify({adhaar_id}),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            if('count' in data) {
                this.setState({deal_count:data.count});
            }
            else{
                this.setState({deal_count:0});
            }
        }
        catch(e){
            this.setState({deal_count:0});
        }
        
    }

    render(){
        const {isAuthenticated,user} = this.context;
        
        if(isAuthenticated){
            const color =  user.isDealer ? 'warning' : 'success';
            if(!user.isDealer){
                this.getCropCount(user['adhaar_id']);
            }
            else if(user.isDealer){
                this.getDealCount(user['adhaar_id']);
            }
            return(
                <div className="profile text-light p-2 m-2 rounded" style={{fontFamily:'Lucida Console',borderColor:'#9ecaed',boxShadow:'0 0 10px #9ecaed'}}>
                        <h4 className='m-3'>{this.capitalize(user.username)} Profile Page</h4>
                    <div className="profile-content d-flex justify-content-between rounded m-3" style={{borderColor:'#9ecaed',boxShadow:'0 0 10px #9ecaed'}}>
                        <div className="profile-one m-4 flex-1 w-100">
                            <>
                                <h5 className={'text-'+color}>User Name</h5>
                                <small>{user.username.toUpperCase()}</small>
                            </>
                            <hr/>
                            <>
                                <h5 className={'text-'+color}>Adhaar ID</h5>
                                <small>{user.adhaar_id}</small>
                            </>
                            <hr/>
                            <>
                                <h5 className={'text-'+color}>Contact No</h5>
                                <small>{user.contactno}</small>
                            </>
                            
                        </div>
                        <div className="profile-two m-4">
                            <>
                                    <h5 className={'text-'+color}>Role</h5>
                                    <small>{user.isDealer ? 'Dealer' : 'Farmer'}</small>
                            </>
                            <hr/>
                            <>
                                <h5 className={'text-'+color}>Password (encrypted) :)</h5>
                                <small>{user.password}</small>
                            </>
                        </div>
                    </div>

                    <h4 className='m-3'>Account Details....</h4>
                    <div className="profile-content d-flex justify-content-between rounded m-3" style={{borderColor:'#9ecaed',boxShadow:'0 0 10px #9ecaed'}}>
                    <div className="profile-one m-4 flex-1 w-100">
                        {
                            user.isDealer ? (
                            <>
                                <div>
                                    <h5 className={'text-'+color}>No Of Deals</h5>
                                    <small>{this.state.deal_count +' deals'}</small>
                                </div>
                                <hr/>
                                <div>
                                    <h5 className={'text-'+color}>Go To Deals</h5>
                                    <a className='btn btn-light' href='/see-my-deals'>Deals</a>
                                </div>
                            </>
                            ):(
                            <>
                                <div>
                                    <h5 className={'text-'+color}>No Of Crops</h5>
                                    <small>{ this.state.crop_count+' crops'}</small>
                                </div>
                                <hr/>
                                <div>
                                    <h5 className={'text-'+color}>Go To Crops</h5>
                                    <a className='btn btn-light' href='/see-my-crops'>Crops</a>
                                </div>
                            </>
                            )
                        }
                            
                        </div>
                    </div>
                   
                </div>
            );
        }
        else{
            return(
                <div className="profile text-light text-center h5">
                    Login To See Your Profile
                </div>
            );
        }
        
       
        
    }
}

export default Profile;