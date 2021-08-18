import React from 'react';
import '../css/explore.css';
import {AuthContext} from '../contexts/AuthContext';
import Notify from './notify';


const Explore =  (props) => {
        const data = React.useContext(AuthContext);
        
        if(!data.isAuthenticated){
            return <div className="text-light h2 text-center m-3">
                Login To See The Explore Page
            </div>;
           
        }
        else{
            return(
                <div className="explore">
          
                <div className="contents d-flex justify-content-around">
                     <div className="farmer-explore text-light">
                        <div className="card text-light bg-dark border border-success m-2" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title text-success">Farmer</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{data.user.isDealer ? 'See All Crops' : 'Track All Your Crops'}</h6>
                                <p className="card-text">This card given you the information about the <code> CROPS </code>submitted to the <code>FARMIFY </code>.</p>
                                {
                                    data.user.isDealer ? (<>
                                    <a href="see-crops" className="card-link text-light btn btn-outline-success">See Crops</a>
                                    
                                    </>):(<div className="d-flex">
                                        <a href="/add-crop" className="card-link text-light btn btn-outline-success">Add Crop</a>
                                        <a href="/see-my-crops" className="card-link text-light btn btn-outline-success">See Requests</a>
                                    </div>)
                                }
                                
                            </div>
                        </div>
                     </div>
                     <div className="dealer-explore text-light">
                        <div className="card text-light bg-dark border border-warning m-2" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title text-warning">Dealer</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{data.user.isDealer ? 'Track All Your Deals':'See Deals'}</h6>
                                <p className="card-text">This card given you the information about the <code>DEALS</code> submitted to the <code>FARMIFY</code> .</p>
                                {
                                    data.user.isDealer ? (<div className="d-flex">
                                        <a href="/add-deal" className="card-link text-light btn btn-outline-warning">Add Deal</a>
                                        <a href="see-my-deals" className="card-link text-light btn btn-outline-warning">See Requests</a>
                                    </div>):(<div>
                                        <a href="/see-deals" className="card-link text-light btn btn-outline-warning">See Deals</a>
                               
                                    </div>)
                                }
                                
                            </div>
                        </div>
                     </div>
                </div>
    
                <div className='ad-bar'>
                    <h4 className='text-start p-2'>Notifications</h4>
                    {/* <ul>
                        <li>First Notification</li>
                        <li>Second Notification</li>
                        <li>Third Notification</li>
                        <li>Fourth Notification</li>
                        <li>Fiveth Notification</li>
                        <li>Sixth Notification</li>
                    </ul> */}
                    <Notify/>
                </div>
               
            </div>
    );
            }
}

export default Explore;
