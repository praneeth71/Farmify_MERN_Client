import React, { Component } from 'react';
import '../css/notification.css';
import {AuthContext} from '../contexts/AuthContext';

class Notify extends Component {
    static contextType = AuthContext;
    state = { 
        notifications:[],
        response:false,
        content:false,
     }
    async componentDidMount(){
        try{
            const res = await fetch('/get-notifications',{
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            this.setState(prevState=>({
                ...prevState,
                response: true,
                content: true,
                notifications: data.notifications
            }));
        }
        catch(e){
            this.setState(prevState=>({
                ...prevState,
                response: true,
                content: false,
            }));
        }
    }

    render() { 
        const {user} = this.context;
        const notifys = this.state.response ? (
            this.state.content ? (
                this.state.notifications.map((notification,index) => (
                    
                   <div className="notification px-2 border border-light m-2" key={index}>
                       <div className="text-info"><b>Owner : </b>{String(notification['adhaar_id'])===user['adhaar_id'] ? 'you' : notification['adhaar_id']}</div>
                       <div><b>message :</b> {notification['action']}</div>
                   </div>
                ))
            ):(
                <div>Failed To Load Notifications</div>
            )
        ) : (
            <div>Loading....</div>
        );

        return ( 
            <div className='notify text-light'>
                {notifys}
            </div>
         );
    }
}
 
export default Notify;