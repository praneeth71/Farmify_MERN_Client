import React, { Component } from 'react'
import {AuthContext} from '../contexts/AuthContext';
import {Types} from 'mongoose';
import '../css/see-my-crops.css'

class SeeMyDeals extends Component {
    static contextType = AuthContext;
    state = { 
        // all user added Deals
        deals:[],
        response:false,
        content:false,
     }

    getMyDeals = async (adhaar_id)=>{
        try{
            const res = await fetch('/get-my-deals',{
                method: 'POST',
                body: JSON.stringify({adhaar_id}),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            
            this.setState({
                deals:data.deals,
                response:true,
                content:true,
            });

        }catch(e){
            console.log(e.message);
            this.setState({
                deals:[],
                response:true,
                content:false,
            });
        }
    }
    
   render()  { 
        const {isAuthenticated,user} = this.context;
        if(!isAuthenticated || !user.isDealer){
            return (
                <div className='text-light h5 text-center'>Login As Dealer To See Your Deals :(</div>
            );
        }
        else{
            this.getMyDeals(user.adhaar_id);
            const crops = this.state.response ? (
                this.state.content ? (
                    this.state.deals.map((deal,index)=>(
                        <div key={index} className='crop rounded m-3 p-2 d-flex justify-content-between border border-light'>
                            <div className='cropname'><a href={'/deal-details/'+deal['_id']}>{deal['cropname']} deal</a> by {user.username}<span className='text-dark px-2 py-1 m-3 rounded bg-light'>Request Count : 0</span></div>
                            <div className='text-info'>{Types.ObjectId(deal['_id']).getTimestamp().toDateString()}</div>
                        </div>
                    ))
                ):(
                    <div className="m-3">Failed Load Your Crops</div>
                )
            ) : (
                <div className="m-3">Loading Your Crops...</div>
            );
            return ( 
                <div className='seemycrops text-light'>
                    <div className='h5 m-3'>{user.username} Your Deals......</div>
                    {crops}
                </div>
             );
        }
    }
}
 
export default SeeMyDeals;