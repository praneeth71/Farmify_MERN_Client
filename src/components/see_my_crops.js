import React, { Component } from 'react'
import {AuthContext} from '../contexts/AuthContext';
import {Types} from 'mongoose';
import '../css/see-my-crops.css'

class SeeMyCrops extends Component {
    static contextType = AuthContext;
    state = { 
        // all user added crops
        crops:[],
        response:false,
        content:false,
     }

    getMyCrops = async (adhaar_id)=>{
        try{
            const res = await fetch('/get-my-crops',{
                method: 'POST',
                body: JSON.stringify({adhaar_id}),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            
            this.setState({
                crops:data.crops,
                response:true,
                content:true,
            });

        }catch(e){
            console.log(e.message);
            this.setState({
                crops:[],
                response:true,
                content:false,
            });
        }
    }
    
   render()  { 
        const {isAuthenticated,user} = this.context;
        if(!isAuthenticated || user.isDealer){
            return (
                <div className='text-light h5 text-center'>Login As Farmer To See Your Crops :(</div>
            );
        }
        else{
            this.getMyCrops(user.adhaar_id);
            const crops = this.state.response ? (
                this.state.content ? (
                    this.state.crops.map((crop,index)=>(
                        <div key={index} className='crop rounded m-3 p-2 d-flex justify-content-between border border-light'>
                            <div className='cropname'><a href={'/crop-details/'+crop['_id']}>{crop['cropname']} crop</a> by {user.username}<span className='text-dark px-2 py-1 m-3 rounded bg-light'>Request Count : 0</span></div>
                            <div className='text-info'>{Types.ObjectId(crop['_id']).getTimestamp().toDateString()}</div>
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
                    <div className='h5 m-3'>{user.username} Your Crops......</div>
                    {crops}
                </div>
             );
        }
    }
}
 
export default SeeMyCrops;