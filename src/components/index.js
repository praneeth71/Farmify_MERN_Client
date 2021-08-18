import React from 'react';
import '../css/index.css';
import {Route,Link} from 'react-router-dom';
import Home from './home';
import Login from './login';
import SignUP from './signup';
import Explore from './explore';
import Weather from './weather';
import News from './news';
import {AuthContext} from '../contexts/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import AddCrop from './add-crop';
import AddDeal from './add-deal';
import Profile from './profile';
import About from './about';
import SeeMyCrops from './see_my_crops';
import SeeMyDeals from './see_my_deals';
import CropView from './crop_view';

class Index extends React.Component {

    static contextType = AuthContext;

    logout = async (e)=>{
        e.preventDefault();
        try{
            await fetch('/logout',{
                method: 'GET',
                headers: {'Content-Type':'application/json'},
            });
            return true;
        }
        catch(e){
            console.log(e);
            return false;
        }
        
       
    }

    render() {      
        const {isAuthenticated,user,setAuthState} = this.context;
        const makeLogout = async (e)=>{
            const loggout = await this.logout(e);
            if(loggout===true){
                setAuthState(null);
            }
            
        }
            return(
                <div className='index' style={{fontFamily:'Lucida Console'}}>
                <nav className="navbar navbar-expand-lg navbar-dark ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><b>Farmify</b></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                             <a className="nav-link active" aria-current="page" href="/">Home</a>
                             </li>
                             <li className="nav-item">
                             <a className="nav-link" href="/explore">Explore</a>
                             </li>
                             <li className="nav-item">
                             <a className="nav-link" href="/contact">Contact</a>
                             </li>
                             <li className="nav-item">
                             <a className="nav-link" href="/news">News</a>
                             </li>
                            
                         </ul>
                         <form className="d-flex">
                             <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                             <button className="btn btn-outline-success" type="submit">Search</button>
                         </form>
                             {
                                 isAuthenticated ? (
                                     <>
                                        <button className="btn btn-outline-primary text-light mx-1" type="submit"><a href='/profile'>{user.username}</a></button>
                                        <button className="btn btn-outline-danger  text-light mx-1" type="submit" onClick={makeLogout}>Logout</button>
                                     </>
                                 ):(<>
                                        <button className="btn btn-outline-primary text-light mx-1" type="submit"><Link to='/login'>Login</Link></button>
                                        <button className="btn btn-outline-danger  text-light mx-1" type="submit"><Link to='/signup'>SignUP</Link></button>
                                 </>)
                             } 
                         </div>
                     </div>
                     </nav>
                     <div className='main d-flex'>
                         <div className='sidebar'>
                             <ul>
                                 <li data-toggle="tooltip" data-placement="right" title="Shows You The Cost Graph">Cost Garphs <FontAwesomeIcon icon={faQuestionCircle}/></li>
                                 <li data-toggle="tooltip" data-placement="right" title="Shows You The weather Report"><Link to='/weather'>Weather Report <FontAwesomeIcon icon={faQuestionCircle}/></Link></li>
                                 <li data-toggle="tooltip" data-placement="right" title="Shows You SomeThing">Weather Report <FontAwesomeIcon icon={faQuestionCircle}/></li>
                                 <li data-toggle="tooltip" data-placement="right" title="Shows You SomeThing">Weather Report <FontAwesomeIcon icon={faQuestionCircle}/></li>
                                 <li data-toggle="tooltip" data-placement="right" title="Shows You SomeThing">Weather Report <FontAwesomeIcon icon={faQuestionCircle}/></li>
                             </ul>
                         </div>
                         <div className='content-div'>
                             <Route exact path="/" component={Home}/>
                             <Route path="/login" component={Login}/>
                             <Route path="/signup" component={SignUP}/>
                             <Route path="/explore" component={Explore}/>
                             <Route path="/weather" component={Weather}/>
                             <Route path="/news" component={News}/>
                             <Route path="/add-crop" component={AddCrop}/>
                             <Route path="/add-deal" component={AddDeal}/>
                             <Route path="/profile" component={Profile}/>
                             <Route path="/about" component={About}/>
                             <Route path="/see-my-crops" component={SeeMyCrops}/>
                             <Route path="/see-my-deals" component={SeeMyDeals}/>
                             <Route path="/crop-details/:crop_id" component={CropView}/>
                         </div>
                     </div>
                 </div>
               
        );
    }
}

export default Index;

