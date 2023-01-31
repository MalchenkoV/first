/* eslint-disable max-len */
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import userform, { fetchLogout, fetchUserList, formSlice, fetchCreateUser, fetchLoginUser, fetchDelete } from '../../store/reducers/userform'

import styles from './styles.module.css'

export function UserForm () {
  const dispatch = useDispatch()
  const username = useSelector((state) => state.userform.username)
  const sessionId = useSelector((state) => state.userform.sessionid)
  const userId = useSelector((state) => state.userform.id)
  const [isActiveForm, setActiveForm] = useState(false)
  const [isActiveMenuButtons, setActiveMenuButtons] = useState(true)
  const [isActiveInput, setActiveInput] = useState(true)
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

  function handleOpenClose () {
    setActiveForm(!isActiveForm)
    setInputValue({
      email: '',
      password: '',
      name: '',
    })
  }

  function onClickSubmitButton () {
    setActiveMenuButtons(!isActiveMenuButtons)
  }

  function handleClickLoginButton () {
    handleOpenClose()
    setActiveInput(!isActiveInput)
  }

  function handleClickCloseIcon () {
    handleOpenClose()
    setActiveInput(true)
  }

  const handleSubmit = useCallback(() => {
    if (isActiveInput === true) {
      dispatch(fetchCreateUser(inputValue))
    } else {
      dispatch(fetchUserList(inputValue))
      dispatch(fetchLoginUser(inputValue))
      onClickSubmitButton()
    }
    handleOpenClose()
    setActiveInput(true)
  }, [inputValue])

  const handleLogout = useCallback(() => {
    onClickSubmitButton()
    dispatch(fetchLogout(sessionId))
  }, [sessionId])

  const handleDelete = useCallback(() => {
    onClickSubmitButton()
    dispatch(fetchDelete(userId))
  }, [userId])

  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <div className={styles.buttonsBox}>
        <button className={isActiveMenuButtons ? styles.menu_buttons : styles.disactive} onClick={handleClickLoginButton}>Log in</button>
        <button className={isActiveMenuButtons ? styles.menu_buttons : styles.disactive} onClick={handleOpenClose}>Sign up</button>
        <button className={isActiveMenuButtons ? styles.disactive : styles.menu_buttons} onClick={handleLogout}>Log out</button>
        <button className={isActiveMenuButtons ? styles.disactive : styles.menu_buttons} onClick={handleDelete}>Delete account</button>
      </div>
      <div className={isActiveForm ? styles.popup : styles.disactive}>
        <div className={styles.popup_container}>
          <h2 className={styles.popup_title}>Enter your data</h2>
          <form className={styles.popup_form}>
            <input className={isActiveInput ? styles.popup_textInput : styles.disactive} id='Name' type='text' value={inputValue.name} placeholder='Enter your name' onChange={handleChange}></input>
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
