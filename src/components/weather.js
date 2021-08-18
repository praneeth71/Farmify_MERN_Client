import React,{Component} from 'react';
import axios from 'axios';
import '../css/weather.css';

import sun from '../imgs/sun.png';

class Weather extends Component {
    state = {
        polyid:"5fd7618a714b52f853e1ef74",
        apikey :"b3aa0b57395eee7a208bd59e53d65fc3",
        main:{
            temp:"",
            feels_like:"",
            temp_min:"",
            temp_max:"",
            pressure:"",
            humidity:"",
        },
        wind:{
            speed:"",
            deg:""
        },
        response:false,
        content:false,
    }

    componentDidMount(){
        // retrive the weather report here
        var url = 'http://api.agromonitoring.com/agro/1.0/weather?polyid='+this.state.polyid+'&appid='+this.state.apikey;
        axios.get(url).then(res=>{
            this.setState(prevState=>({
                ...prevState,
                main:{
                    ...prevState.main,
                    temp:res.data.main.temp,
                    feels_like:res.data.main.feels_like,
                    temp_min:res.data.main.temp_min,
                    temp_max:res.data.main.temp_max,
                    pressure:res.data.main.pressure,
                    humidity:res.data.main.humidity,
                },
                wind:{
                    ...prevState.wind,
                    speed:res.data.wind.speed,
                    deg:res.data.wind.deg
                },
                response:true,
                content:true,
            }))
        }).catch(err=>{
            this.setState(prevState=>({
                ...prevState,
                response:true,
                content:false,
            }));
        });
    }

    makeWeatherBlog = (data)=>{
        
        return <div className='weather-content m-3'>
                
                    <h5>Main Details <code className='float-right'>(from : https://agromonitoring.com/api)</code></h5>
                    <ul className="list-group text-dark">
                        <li className="list-group-item">Temperature : {data.main.temp} </li>
                        <li className="list-group-item">Feels Like : {data.main.feels_like} </li>
                        <li className="list-group-item">Min Temperature : {data.main.temp_min} </li>
                        <li className="list-group-item">Max Temperature : {data.main.temp_max} </li>
                        <li className="list-group-item">Pressure : {data.main.pressure} </li>
                        <li className="list-group-item">Humidity : {data.main.humidity} </li>
                    </ul>
                    <h5 className='mt-3'>Wind Details</h5>
                    <ul className="list-group text-dark">
                        <li className="list-group-item">Wind Speed : {data.wind.speed} </li>
                        <li className="list-group-item">Wind Direction : {data.wind.deg} </li>
                    </ul>
                </div>;
    }
    

    render() {
        var content = this.state.response ? 
        (this.state.content ? (this.makeWeatherBlog(this.state)):
        (<div className="h3 text-light text-center fail-msg">Report  Loading  Failed</div>)) 
        : (<div className="h3 text-light text-center">Loading.....</div>);
        return (
            <div className='weather d-flex'>
                {content}
                <div className="weather-image text-center m-3">
                    <img src={sun} style={{width: '250px',}} alt='Image Not Found'/>
                </div>
            </div>
        );
    }
}

export default Weather;