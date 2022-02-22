import React, {useEffect} from 'react'
import axios from 'axios';
import { response } from 'express';
import { Navigate, useNavigate } from 'react-router-dom';

function LandingPage() {

  useEffect(() => {
    axios.get('/api/hello')
    .then(response => console.log(response.data))
  }, [])

  let navigate = useNavigate();


  const onClickHandler = () => {
    axios.get('/api/user/logout')
    .then(response => {
      if(response.data.success) {
        navigate('/login')
      } else{
        alert("Failed to logout")
      }
    })
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <h2>시작 페이지</h2>
      <button onClick = { onClickHandler } >
        Logout 
      </button>
    </div>
  )
}

export default LandingPage
