import React from 'react'
import './Login.scss'
import { toast, ToastContainer } from 'react-toastify'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
function Login() {
  const [data, setData] = useState([])
  const login = useRef()
  const pasword = useRef()
  useEffect(() => {
    fetch('https://dubaiavto.uz/login')
      .then(res => res.json())
      .then(ResData => {
        ResData && ResData.map((element) => {
          setData(element)
        })
      })
  }, [])
  const navigate = useNavigate()
  function handlerBtn() {
    if (login.current.value === data.Login && pasword.current.value === data.Password) {
      window.localStorage.setItem('OpenDashboard', login.current.value)
      navigate('/')
    } else {
      toast.error('Ошибка входа или пароля')
    }
  }
  return (
    <>
      <ToastContainer />
      <form className="login-form">
        <h3 className="title">Входить</h3>
        <input ref={login} type="text" placeholder='Логин' />
        <input ref={pasword} type="password" placeholder='Пароль' />
        <button type='button' onClick={handlerBtn}>Входить</button>
      </form>
    </>
  )
}

export default Login
