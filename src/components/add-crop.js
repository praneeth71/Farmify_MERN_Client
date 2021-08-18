import React, { Component} from 'react';
import {AuthContext} from '../contexts/AuthContext';

class AddCrop extends Component {
    static contextType = AuthContext;
    state = {
        cropname:'',
        quantity:'',
        units:'',
        expected_price:'',
        contactno:'',
        adhaar_id:'',   
    }

    handleChange = (e)=>{
        e.preventDefault();
        this.setState(prevState=>({
            ...prevState,
            [e.target.name]:e.target.value,
        }))
    }

    resetState = ()=>{
        this.setState({
            cropname:'',
            quantity:'',
            units:'',
            expected_price:'',
            contactno:'',
            adhaar_id:'',  
        });
    }

    handleSubmit = async (e)=>{
        e.preventDefault();
        document.getElementById('msg').textContent = '';
        document.getElementById('cropname').textContent = ''; 
        document.getElementById('contactno').textContent = '';
        const adhaar_id = document.getElementById('adhaar_id').value;
        
        await this.setState(prevState=>({
            ...prevState,
            adhaar_id:adhaar_id,
        }));
        try{
            const res = await fetch('/add-crop',{
                method:'POST',
                body: JSON.stringify(this.state),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            console.log(data);
            if('message' in data){
                document.getElementById('msg').textContent = 'You Crop ID is '+data.message._id;
                this.resetState();
            }
            else if('err' in data){
                if('cropname' in data.err){
                    document.getElementById('cropname').textContent = data.err.cropname;
                }
                if('contactno' in data.err){
                    document.getElementById('contactno').textContent = data.err.contactno;
                }
            }
        }
        catch(e){
            document.getElementById('msg').textContent = e.message;    
        }
    }
    render(){
        const {isAuthenticated,user} = this.context;
        if(!isAuthenticated){
            return (
                <div className='text-light m-2 text-center'>
                    Login As A Farmer To Add Your Crop
                </div>
            );
        }
        if(user.isDealer){
            return (
                <div className='text-light m-2 text-center'>
                    As A Dealer You Can't Add Crops
                </div>
            );
        }
        else{
           
            return(
                <div className='add-crop text-light' style={{fontFamily:'Lucida Console'}}>

                    <div id='msg' className='text-danger h5 p-1'></div>

                    <h3 className='m-3 text-light'>Add Your Crop Here</h3>
                    <form className='m-2  border border-light p-3 rounded' onSubmit={this.handleSubmit}>

                        <div className='d-flex  justify-content-between'>
                            <div className='col-md-6 m-1'>
                                <div className="form-group">
                                    <label htmlFor="cropname">Crop Name</label>
                                    <input type="text" className="form-control" name='cropname' value={this.state.cropname} placeholder="Enter CropName" onChange={this.handleChange} required={true}/>
                                    <small id='cropname' className="text-danger"></small><br/>
                                    <small className="form-text text-muted">Ex : wheat , soya etc...</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="quantity">Quantity</label>
                                    <input type='number' name='quantity' className="form-control" value={this.state.quantity} placeholder="Enter Quantity Of The Crop" onChange={this.handleChange} required={true}/>
                                    <small className="form-text text-muted">Ex : 100kgs , 2 tones etc...</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="units">Units</label>
                                    <input type="text" name='units' className="form-control" value={this.state.units} placeholder="Enter Unit Of Measure For The Crop" onChange={this.handleChange} required={true}/>
                                    <small className="form-text text-muted">Ex : Kgs, Liters, Gallons etc...</small>
                                </div>
                            </div>
                            <div className='col-md-6 m-1'>
                                <div className="form-group">
                                    <label htmlFor="expected_price">Expected Price</label>
                                    <input type="number" className="form-control" name='expected_price' value={this.state.expected_price} placeholder="Enter  Expected Price Here..." onChange={this.handleChange} required={true}/>
                                    <small  className="form-text text-muted">Ex : 2000/- , 3000/- rupees etc...</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contactno">Contact No</label>
                                    <input type="number" className="form-control" name='contactno' value={this.state.contactno} placeholder="Enter Contact No..." onChange={this.handleChange}  required={true}/>
                                    <small id='contactno' className="text-danger"></small><br/>
                                    <small className="form-text text-muted">Enter Your 10 digit Phone Number Here...</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="adhaar_id">Adhaar-ID Of Farmer</label>
                                    <input type="number" className="form-control" name='adhaar_id' id='adhaar_id' value={user.adhaar_id} placeholder="Password" readOnly={true} />
                                    <small className="form-text text-muted">Don't Try To Change This Field...</small>
                                </div>
                            </div>
                           
                        </div>
                            <button type="submit" className="btn btn-primary mt-2">Submit</button>&nbsp;&nbsp;
                            <button type="reset" className="btn btn-danger mt-2 ">Submit</button>
                    </form>
                </div>
            );
        }
    }
}


export default AddCrop;