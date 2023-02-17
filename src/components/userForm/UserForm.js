/* eslint-disable max-len */
import { Button } from 'antd'
import Title from 'antd/es/typography/Title'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'

import { fetchLogout, fetchUserList, fetchCreateUser, fetchLoginUser, fetchDelete, formSlice } from '../../store/reducers/userform'

import styles from './styles.module.css'

export function UserForm () {
  const dispatch = useDispatch()
  const nodeRef = useRef(null)
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
      <Title level={2}>Welcome, {username}!</Title>
      <div className={styles.buttonsBox}>
        <Button className={isLogin ? styles.disactive : styles.menu_buttons} type='primary' onClick={handleClickLoginButton}>Log in</Button>
        <Button className={isLogin ? styles.disactive : styles.menu_buttons} type='primary' onClick={handleClickRegisterButton}>Sign up</Button>
        <Button className={isLogin ? styles.menu_buttons : styles.disactive} type='primary' onClick={handleLogout}>Log out</Button>
        <Button className={isLogin ? styles.menu_buttons : styles.disactive} type='primary' onClick={handleDelete}>Delete account</Button>
      </div>

      <CSSTransition
        in={isActivePopup}
        nodeRef={nodeRef}
        timeout={300}
        classNames={styles.popup}
        mountOnEnter
        unmountOnExit
      >
        <div className={isActivePopup ? styles.popup : styles.disactive} ref={nodeRef}>

          <div className={styles.popup_container}>
            <h2 className={styles.popup_title}></h2>
            <h2 className={isError ? styles.popup_error : styles.disactive}>Error! {errMessage}</h2>
            <form className={isError ? styles.disactive : styles.popup_form}>
              <input className={isRegister ? styles.popup_textInput : styles.disactive} id='Name' type='text' value={inputValue.name} placeholder='Enter your name' onChange={handleChange}></input>
              <input className={styles.popup_textInput} id='Email' type='email' value={inputValue.email} placeholder='Enter your email' onChange={handleChange}></input>
              <input className={styles.popup_textInput} id='Password' type='password' value={inputValue.password} placeholder='Enter your password' onChange={handleChange}></input>
              <input className={styles.popup_submitButton} type='button' onClick={} value='Submit'></input>
            </form>
            <button className={styles.close_icon} onClick={handleClickCloseIcon}></button>
          </div>
        </div>
      </CSSTransition>

    </div>
  )
}

<Modal title="Enter your data" open={isActivePopup} onOk={handleSubmit} onCancel={handleClickCloseIcon}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>