import React, { useEffect } from "react";
import Axios from 'axios';
import { useDispatch  } from "react-redux";
import { auth } from '../_actions/user_action';
import { Navigate, useNavigate } from "react-router-dom";


export default function (SpecificComponent, option, adminRoute = null) {
    
    //null : 아무나 출입 가능 페이지
    //true : 로그인한 유저만 출입 가능 페이지
    //false: 로그인한 유저는 출입 불가 페이지

    function AuthenticationCheck() {
        const dispatch = useDispatch();
        let navigate = useNavigate();

        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log(response)

                //로그인 하지 않은 상태이면
                if(!response.payload.isAuth) {
                    if(option) {
                        navigate('/login')
                    }
                } else { //로그인된 상태면 시작페이지로
                    //admin만 가능한 페이지에 접속하려할 때 
                    if(adminRoute && !response.payload.isAdmin) {
                        navigate('/')
                    } else {
                        //로그인한 유저는 출입 불가한 페이지에 접속하려할 때
                        if(option === false)
                            navigate('/')
                    }
                }
            })
        }, [])

        return(
            <SpecificComponent />
        )

    }

    return AuthenticationCheck
}