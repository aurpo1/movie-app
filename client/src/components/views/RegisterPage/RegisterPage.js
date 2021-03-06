
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import Axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';


function RegisterPage(props) {

  const dispatch = useDispatch();

  //서버에 보내고자하는 값들
  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [PW_confirm, setPW_confirm] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onPW_confirmHandler = (event) => {
    setPW_confirm(event.currentTarget.value)
  }

  let navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지 refresh 막기 위함

    if(Password !== PW_confirm) {
      return alert('비밀번호와 비밀번호 확인이 다릅니다.')
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
    }

    dispatch(registerUser(body))
      .then(response => {
        if(response.payload.success) {
          navigate("/login")
        } else {  
          alert('Failed to sign up')
        }
      })

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

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="Password" value={Password} onChange={onPasswordHandler} />

        <label>PW_confirm</label>
        <input type="PW_confirm" value={PW_confirm} onChange={onPW_confirmHandler} />

        <br />
        <button>
          Sigh Up
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
