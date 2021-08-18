import React, { Component } from 'react';
import {AuthContext} from '../contexts/AuthContext';

class CropView extends Component {
    static contextType = AuthContext;
    state = { 
        crop:null,
        response:false,
        content:false,
     }

     async componentDidMount() {
        document.getElementById('msg').textContent  = '';
        const {crop_id} = this.props.match.params;
        try{
            const res = await fetch('/get-crop-view',{
                method: 'POST',
                body: JSON.stringify({crop_id}),
                headers: {'Content-Type': 'application/json'}
            });
            
            const data = await res.json();
            console.log(data);
            if('crop' in data){
                this.setState({
                    crop:data.crop,
                    response:true,
                    content:true,
                });
            }
            else{
                this.setState({
                    crop:null,
                    response:true,
                    content:false,
                });
            }
            

            
        }
        catch(e) {
            document.getElementById('msg').textContent = 'Unable To Make The Request';
        }
     }

    render() { 
        const crop = this.state.response ? (
            this.state.content ? (
                <ul className="list-group text-dark">
                    <li className="list-group-item"><span className="text-success">Crop Name : </span>{this.state.crop['cropname']} crop from <span className="text-primary">#{this.state.crop.adhaar_id}</span></li>
                    <li className="list-group-item"><span className="text-success">Quantity : </span>{this.state.crop['quantity']} {this.state.crop['units']}</li>
                    <li className="list-group-item"><span className="text-success">Expected Price : </span>{this.state.crop['expected_price']} /-</li>
                    <li className="list-group-item"><span className="text-success">Contact No : </span>+91 {this.state.crop['contactno']}</li>
                   
                </ul>
            ):(
                <div className="h5 text-center text-danger border border-danger p-3 m-3 bg-light">
                    Crop Not Found
                </div>
            )
        ):(
            <div>Loading.....</div>
        );
        return ( 
            <div className='crop-view text-light m-3'>
                <div id='msg' className='text-light h5 text-center'></div>
                {crop} 
            </div>
         );
    }
}
 
export default CropView;