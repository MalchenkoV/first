/* eslint-disable max-len */
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchLogout, fetchUserList, fetchCreateUser, fetchLoginUser, fetchDelete, formSlice } from '../../store/reducers/userform'

import styles from './styles.module.css'

export function UserForm () {
  const dispatch = useDispatch()
  const username = useSelector((state) => state.userform.username)
  const sessionId = useSelector((state) => state.userform.sessionid)
  const userId = useSelector((state) => state.userform.id)
  const errMessage = useSelector((state) => state.userform.error)
  const email = useSelector((state) => state.userform.email)
  const [isActivePopup, setActivePopup] = useState(false)
  const [isLogin, setisLogin] = useState(false)
  const [isRegister, setIsRegister] = useState(true)
  const [isError, setIsError] = useState(false)
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    name: '',
  })

  function handleChange () {
    setInputValue({
      email: document.getElementById('Email').value,
      password: document.getElementById('Password').value,
      name: document.getElementById('Name').value,
    })
  }

  function handleOpen () {
    setActivePopup(true)
  }

  function handleClose () {
    setActivePopup(false)
    setInputValue({
      email: '',
      password: '',
    })
    setIsRegister(true)
  }

  useEffect(() => {
    if (sessionId !== '') {
      setisLogin(true)
    } else {
      setisLogin(false)
    }
  }, [sessionId])

  useEffect(() => {
    if (email !== '') {
      handleClose()
    }
  }, [email])

  function handleClickLoginButton () {
    handleOpen()
    setIsRegister(false)
  }

  function handleClickRegisterButton () {
    handleOpen()
    setIsRegister(true)
  }

  function handleClickCloseIcon () {
    handleClose()
    setIsError(false)
    dispatch(formSlice.actions.clearState())
  }

  const handleSubmit = useCallback(() => {
    if (isRegister === true) {
      dispatch(fetchCreateUser(inputValue))
    } else {
      dispatch(fetchLoginUser(inputValue))
      dispatch(fetchUserList(inputValue))
    }
  }, [inputValue])

  useEffect(() => {
    if (errMessage !== '') {
      setIsError(!isError)
    }
  }, [errMessage])

  const handleLogout = useCallback(() => {
    dispatch(fetchLogout(sessionId))
  }, [sessionId])

  const handleDelete = useCallback(() => {
    dispatch(fetchDelete(userId))
  }, [userId])

  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <div className={styles.buttonsBox}>
        <button className={isLogin ? styles.disactive : styles.menu_buttons} onClick={handleClickLoginButton}>Log in</button>
        <button className={isLogin ? styles.disactive : styles.menu_buttons} onClick={handleClickRegisterButton}>Sign up</button>
        <button className={isLogin ? styles.menu_buttons : styles.disactive} onClick={handleLogout}>Log out</button>
        <button className={isLogin ? styles.menu_buttons : styles.disactive} onClick={handleDelete}>Delete account</button>
      </div>
      <div className={isActivePopup ? styles.popup : styles.disactive}>
        <div className={styles.popup_container}>
          <h2 className={styles.popup_title}>Enter your data</h2>
          <h2 className={isError ? styles.popup_title : styles.disactive}>Error! {errMessage}</h2>
          <form className={isError ? styles.disactive : styles.popup_form}>
            <input className={isRegister ? styles.popup_textInput : styles.disactive} id='Name' type='text' value={inputValue.name} placeholder='Enter your name' onChange={handleChange}></input>
            <input className={styles.popup_textInput} id='Email' type='email' value={inputValue.email} placeholder='Enter your email' onChange={handleChange}></input>
            <input className={styles.popup_textInput} id='Password' type='password' value={inputValue.password} placeholder='Enter your password' onChange={handleChange}></input>
            <input className={styles.popup_submitButton} type='button' onClick={handleSubmit} value='Submit'></input>
          </form>
          <button className={styles.close_icon} onClick={handleClickCloseIcon}></button>
        </div>
      </div>
    </div>
  )
}
