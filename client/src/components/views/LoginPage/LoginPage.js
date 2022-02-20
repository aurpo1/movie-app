
import Axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_action';

function LoginPage(props) {
  const dispatch = useDispatch();

  //서버에 보내고자하는 값들
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  let navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지 refresh 막기 위함


    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
      .then(response => {
        if(response.payload.loginSuccess) {
          navigate('/')
        } else { 
          alert('Error')
        }
      })

    //backend로 보내기
    //Axios.post('/api/user/login', body)
    //.then(response)

  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>

      <form style={{ display: 'flex', flexDirection: 'column'}}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="Password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
