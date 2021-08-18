import React, {Component} from "react";
import '../css/about.css';
import crop from '../imgs/crop.png';
import deal from '../imgs/deal.jpg';
import weather from '../imgs/weather.png';
import news from '../imgs/news.png';
import member1 from '../imgs/pp.jpg';
import member2 from '../imgs/sudheer.jpeg';
import member3 from '../imgs/prudhvi.jpeg';
import member4 from '../imgs/dinesh.jpeg';
import member5 from '../imgs/pranith.jpeg';

class About extends Component{
    render(){
        return(
           <div className='about text-success  text-center' style={{fontFamily:'Lucida Console'}}>
			   <div className='cover main-content border border-light m-5 rounded'>
                   <span className='h3 p-3 border border-light rounded m-2'>About Farmify</span><br/>
                   <div className='text-light m-5 text-start' >
                       Here we support farmers and dealers to maintain there relationship online.Farmers can showcase their crops
                       here and deals can choose between them. Also Dealers can publish their deals here and farmers can request for the 
                       attention of dealer.
                   </div>
               </div>
               <div className="text-start text-light h4 mx-5">Features Supporting ....</div>

               <div className="cover text-start text-light mx-5 my-3 border border-light rounded p-3 d-flex justify-content-between">
                   <div className="content">
                       <h5><a href='/add-crop' className='text-light p-2'>Add Crop</a><code>(For Farmers)</code></h5>
                       <hr/>
                       <div className="explanation">
                           <ul>
                                <li>Farmers can add crops , so that every dealer in the farmify can see the crops added in the account.</li>
                                <li>It will ask basic information about the crop like size, quantity and price etc.</li>
                                <li>That added crop will be added in your account.</li>
                           </ul>
                       </div>
                   </div>
                   <div className="pic m-4" style={{borderLeft:'2px solid white'}}>
                       <img src={crop}  style={{width:'150px',borderRadius:'50%',padding:'10px'}} alt='Crop Not Found'/>
                   </div>
               </div>


               <div className="cover text-start text-light mx-5 my-3 border border-light rounded p-3 d-flex justify-content-between">
                    <div className="pic m-4" style={{borderRight:'2px solid white'}}>
                       <img src={deal}  style={{width:'150px',borderRadius:'50%',padding:'10px'}} alt='Deal Not Found'/>
                    </div>
                   <div className="content">
                       <h5><a href='/add-deal' className='text-light p-2'>Add Deal</a><code>(For Dealers)</code></h5>
                       <hr/>
                       <div className="explanation">
                           <ul>
                                <li>Dealers can add deals , so that every farmer in the farmify can see the deals added in the account.</li>
                                <li>It will ask basic information that your are expecting about the deal like size, quantity and price etc.</li>
                                <li>That added deal will be added in your account.</li>
                           </ul>
                       </div>
                   </div>
                   
               </div>


               <div className="cover text-start text-light mx-5 my-3 border border-light rounded p-3 d-flex justify-content-between">
                   <div className="content">
                       <h5><a href='/weather' className='text-light p-2'>Weather Report</a><code>(For All)</code></h5>
                       <hr/>
                       <div className="explanation">
                           <ul>
                                <li>Farmers can add crops , so that every dealer in the farmify can see the crops added in the account.</li>
                                <li>It will ask basic information about the crop like size, quantity and price etc.</li>
                                <li>That added crop will be added in your account.</li>
                           </ul>
                       </div>
                   </div>
                   <div className="pic m-4" style={{borderLeft:'2px solid white'}}>
                       <img src={weather}  style={{width:'150px',borderRadius:'50%',padding:'10px'}} alt='Weather Not Found'/>
                   </div>
               </div>


               <div className="cover text-start text-light mx-5 my-3 border border-light rounded p-3 d-flex justify-content-between">
                    <div className="pic m-4" style={{borderRight:'2px solid white'}}>
                       <img src={news}  style={{width:'150px',borderRadius:'50%',padding:'10px'}} alt='News Not Found'/>
                    </div>
                   <div className="content">
                       <h5><a href='/news' className='text-light p-2'>New Feed</a><code>(For All)</code></h5>
                       <hr/>
                       <div className="explanation">
                           <ul>
                                <li>Farmers can add crops , so that every dealer in the farmify can see the crops added in the account.</li>
                                <li>It will ask basic information about the crop like size, quantity and price etc.</li>
                                <li>That added crop will be added in your account.</li>
                           </ul>
                       </div>
                   </div>
                   
               </div>

                <div className="text-light m-4 h5">Team Members....</div>
               <div className="cover text-start text-light mx-5 my-3 border border-light rounded p-3 m-1">
                        <div className='spec-member glowing-border p-2'>
                            <div className='pic text-center'>
                                <img src={member1} style={{width:'150px', borderRadius:'50%'}} alt='Praveen Not Found'/><br/>
                                Praveen Pallagani
                            </div>
                            <div className='content p-2 w-50 m-auto text-start'>
                                Created the backend server routes to communicate with the backend.
                                <br/>
                                Password encryption and jwt auth token.
                                <br/>
                                News API Integration to the application.

                            </div>
                        </div>
                        <hr></hr>
                  <div className="box1 d-flex justify-content-between m-3"> 
                        <div className='member d-flex justify-content-between glowing-border p-2 m-1'>
                            <div className='pic text-center '>
                                <img src={member2} style={{width:'150px',height:'150px', borderRadius:'50%'}} alt='Sudheer Not Found'/>
                                Sudheer Kumar Puppala
                            </div>
                            <div className='content p-2'>
                                I implemented the frontend part for the farmer using React.<br/>
                                Authentication of users and protecting the routes.<br/>
                                Weather API Integration to the application.
                            </div>
                        </div>
                        <div className='member d-flex justify-content-between glowing-border p-2 m-1'>
                            <div className='content p-2'>
                                I implemented the frontend part for the dealer using React.<br/>
                                Creation of components like AddDeal,Profile etc...<br/>
                                Notifications in the application.
                                
                            </div>
                            <div className='pic text-center'>
                                <img src={member3} style={{width:'150px',height:'150px', borderRadius:'50%'}} alt='Prudhvi Not Found'/>
                                Prudhvi Dharmireddi
                            </div>
                        </div>
                   </div>

                   <hr></hr>
                   <div className="box2 d-flex justify-content-between m-3"> 

                        <div className='member dinesh d-flex justify-content-between glowing-border p-2 m-1'>
                            <div className='pic text-center '>
                                <img src={member4} style={{width:'150px', borderRadius:'50%'}} alt='Dinesh Not Found'/>
                                Dinesh Kumar Koppala
                            </div>
                            <div className='content p-2'>
                                MongoDB User Collection Schema Definitions and static methods implementation.<br/>
                                Backend Routes Intergration.<br/>
                                Saving the notifications in the application.
                            </div>
                        </div>

                        <div className='member pranith d-flex justify-content-between glowing-border p-2 m-1'>
                            <div className='content p-2'>
                                Express Server Organization and Modularization.<br/>
                                Error callbacks setup between client and the server.<br/>
                                Bootstrap for the styling of the components.
                            </div>
                            <div className='pic text-center '>
                                <img src={member5} style={{width:'150px', borderRadius:'50%'}} alt='Pranith Not Found'/>
                                Pranith Lingala
                            </div>
                        </div>
                   </div>

               </div>

		   </div>
        );
    }
}

export default About;