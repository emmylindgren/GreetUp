import React from 'react'
import BackButton from '../components/BackButton'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ADRESS } from '../config';
import AuditRequestCard from '../components/AuditRequestCard';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'


const requestcardStyle = {
    marginBottom:'2rem',
}

// Fix so when button is pressed, page autoupdates and the request is removed. 
function Audit() {
    const [requests, setRequests] = useState([]);
    const [state, setState] = useState('loading');
    const [updateRequest,setUpdateRequest] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { stateInfo } = location.state;
    const sendState = ({eventId : stateInfo.eventId, returnTo: stateInfo.returnTo});

    useEffect(()=>{
        async function getRequests(){

        
        setState('loading')
            axios.defaults.headers.common = {
                "ApiKey": localStorage.getItem("ApiKey"),
              };
            axios.get(API_ADRESS + '/api/event/requests/'+ stateInfo.eventId)
            .then(res =>{
                setState('loaded')
                setRequests(res.data)
                console.log(res.data)
            })
            .catch(err =>{
                setState('error')
            })
        }
  
       getRequests()
    },[updateRequest])

    let renderRequests = (requests) =>{

        return requests.map(request => {
               return (
                <div>
                    <div key={request.pr_Firstname} style={requestcardStyle}><AuditRequestCard userID={request} eventID={stateInfo.eventId} states ={setUpdateRequest}/></div>
                </div>
                )
        })
    }

    let navigateTo = () => {
        navigate("../event-information")
    }
  return (
    <div className='page-container'>
        <div className='page-content'>
        <BackButton text={'Overview'} onClick ={() => {navigate("../event-information")}} state={sendState} to={"../event-information"}/>
        <h1 style={{color:'var(--black)', marginTop:'1rem',}}>Audit</h1>
        <h3 style={{marginBottom:'1rem',}}>Requested invites</h3>
        {state == 'loaded' ? renderRequests(requests):"" }
        </div>
    </div>
  )
}

export default Audit
