/* eslint-disable max-len */
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchLogout, fetchUserList, formSlice, fetchCreateUser, fetchLoginUser } from '../../store/reducers/userform'

import styles from './styles.module.css'

export function UserForm () {
  const dispatch = useDispatch()
  const username = useSelector((state) => state.userform.username)
  const sessionId = useSelector((state) => state.userform.sessionid)
  const [isActiveLoginForm, setActiveLoginForm] = useState(false)
  const [isActiveSignupForm, setActiveSignupForm] = useState(false)
  const [isActiveSubmitButton, setActiveSubmitButton] = useState(true)
  const [signupValue, setSignupValue] = useState()
  const [loginValue, setLoginValue] = useState()

  function handleLoginChange () {
    setLoginValue({
      email: document.getElementById('loginEmail').value,
      password: document.getElementById('loginPassword').value,
    })
  }

  function handleSignupChange () {
    setSignupValue({
      email: document.getElementById('signupEmail').value,
      password: document.getElementById('signupPassword').value,
      username: document.getElementById('signupName').value,
    })
  }

  function handleLoginOpenClose () {
    setActiveLoginForm(!isActiveLoginForm)
    document.getElementById('loginEmail').value = ''
    document.getElementById('loginPassword').value = ''
  }

  function handleSignupOpenClose () {
    setActiveSignupForm(!isActiveSignupForm)
    document.getElementById('signupEmail').value = ''
    document.getElementById('signupPassword').value = ''
    document.getElementById('signupName').value = ''
  }

  function handleSubmitButton () {
    setActiveSubmitButton(!isActiveSubmitButton)
  }

  const handleLoginSubmit = useCallback(() => {
    handleLoginOpenClose()
    dispatch(fetchUserList(loginValue))
    dispatch(fetchLoginUser(loginValue))
    handleSubmitButton()
  }, [loginValue])

  const handleSignupSubmit = useCallback(() => {
    handleSignupOpenClose()
    dispatch(fetchCreateUser(signupValue))
  }, [signupValue])

  const handleLogout = useCallback(() => {
    handleSubmitButton()
    dispatch(formSlice.actions.clearState())
    dispatch(fetchLogout(sessionId))
  }, [sessionId])

  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <div className={styles.buttonsBox}>
        <button className={isActiveSubmitButton ? styles.menu_buttons_disactive : styles.menu_buttons} onClick={handleLogout}>Log out</button>
        <button className={isActiveSubmitButton ? styles.menu_buttons : styles.menu_buttons_disactive} onClick={handleLoginOpenClose}>Log in</button>
        <button className={isActiveSubmitButton ? styles.menu_buttons : styles.menu_buttons_disactive} onClick={handleSignupOpenClose}>Sign up</button>
      </div>
      <div className={isActiveLoginForm ? styles.popup_active : styles.popup}>
        <div className={styles.popup_container}>
          <h2 className={styles.popup_title}>Enter your data</h2>
          <form className={styles.popup_form}>
            <input className={styles.popup_textInput} id='loginEmail' type='email' placeholder='Enter your email' onChange={handleLoginChange}></input>
            <input className={styles.popup_textInput} id='loginPassword' type='password' placeholder='Enter your password' onChange={handleLoginChange}></input>
            <input className={styles.popup_submitButton} type='button' onClick={handleLoginSubmit} value='Submit'></input>
          </form>
          <button className={styles.close_icon} onClick={handleLoginOpenClose}></button>
        </div>
      </div>
      <div className={isActiveSignupForm ? styles.popup_active : styles.popup}>
        <div className={styles.popup_container}>
          <h2 className={styles.popup_title}>Enter your data</h2>
          <form className={styles.popup_form}>
            <input className={styles.popup_textInput} id='signupName' type='text' placeholder='Enter your name' onChange={handleSignupChange}></input>
            <input className={styles.popup_textInput} id='signupEmail' type='email' placeholder='Enter your email' onChange={handleSignupChange}></input>
            <input className={styles.popup_textInput} id='signupPassword' type='password' placeholder='Enter your password' onChange={handleSignupChange}></input>
            <input className={styles.popup_submitButton} type='button' onClick={handleSignupSubmit} value='Submit'></input>
          </form>
          <button className={styles.close_icon} onClick={handleSignupOpenClose}></button>
        </div>
      </div>
    </div>
  )
}
