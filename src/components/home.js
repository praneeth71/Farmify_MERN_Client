import React from 'react';
import wheat from '../imgs/wheat.png';
import Arrows from '../animations/arrows.js';

const Home = (props) => {
    return (
        <div className="home-widget">
        <div className="home-content">
            <div className="content p-5">
                <h1>Welcome To Farmify</h1>
                <h4 className="py-5">
                    Our Farmify was Intented to help all the farmers
                    in our country to sell their crops online.
                </h4>
                <button className="btn btn-light  text-dark mx-1 px-3 py-2 border border-primary" onClick={()=>{props.history.push('/about')}}>
                    <b>About US</b>
                    <Arrows/>
                </button>  
            </div>

            <div className="pic text-center">
                <img src={wheat} alt='bird.png' style={{width:"400px"}}/>
            </div>

        </div>
    </div>
    );
}

export default Home;