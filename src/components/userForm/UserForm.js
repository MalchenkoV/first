/* eslint-disable max-len */
import { LockOutlined } from '@ant-design/icons'
import { MailOutlined, UserOutlined } from '@ant-design/icons/lib/icons'
import { Button, Drawer, Form, Input } from 'antd'
import Title from 'antd/es/typography/Title'
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
  const [isActivePopup, setActivePopup] = useState(false)
  const [isLogin, setisLogin] = useState(false)
  const [isRegister, setIsRegister] = useState(true)
  const [isError, setIsError] = useState(false)
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    name: '',
  })

  // описываем открытие и закрытие попапа

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
    setIsError(false)
    dispatch(formSlice.actions.clearState())
  }

  // функция смены кнопок menu_buttons => установка сообщения об ошибке

  useEffect(() => {
    if (sessionId !== '') {
      setisLogin(true)
    } else {
      setisLogin(false)
    }
  }, [sessionId])

  useEffect(() => {
    if (errMessage !== '') {
      setIsError(!isError)
    }
  }, [errMessage])

  // ловим изменения в инпутах

  function handleChange () {
    setInputValue({
      email: document.getElementsByName('email').value,
      password: document.getElementById('password').value,
      name: document.getElementById('username').value,
    })
  }

  // кнопка сабмита внутри формы логина/регистрации

  const handleSubmit = useCallback(() => {
    if (isRegister === true) {
      dispatch(fetchCreateUser(inputValue))
    } else {
      dispatch(fetchLoginUser(inputValue))
      dispatch(fetchUserList(inputValue))
    }
  }, [inputValue])

  // функции на кнопках menu_buttons

  function handleClickLoginButton () {
    handleOpen()
    setIsRegister(false)
  }

  function handleClickRegisterButton () {
    handleOpen()
    setIsRegister(true)
  }

  const handleLogout = useCallback(() => {
    dispatch(fetchLogout(sessionId))
  }, [sessionId])

  const handleDelete = useCallback(() => {
    dispatch(fetchDelete(userId))
  }, [userId])

  return (
    <>
      <Title level={2}>Welcome, {username}!</Title>
      <Button className={isLogin ? styles.disactive : styles.menu_buttons} type='primary' onClick={handleClickLoginButton}>Log in</Button>
      <Button className={isLogin ? styles.disactive : styles.menu_buttons} type='primary' onClick={handleClickRegisterButton}>Sign up</Button>
      <Button className={isLogin ? styles.menu_buttons : styles.disactive} type='primary' onClick={handleLogout}>Log out</Button>
      <Button className={isLogin ? styles.menu_buttons : styles.disactive} type='primary' onClick={handleDelete}>Delete account</Button>
      <Drawer title="Enter your data" placement="right" onClose={handleClose} open={isActivePopup}>
        <Title level={2} className={isError ? styles.popup_error : styles.disactive}>Error! {errMessage}</Title>
        <Form
          name="normal_login"
        >
          <Form.Item
            name="username"
            className={isRegister ? styles.popup_textInput : styles.disactive}
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input
              onChange={handleChange}
              value={inputValue.name}
              prefix={<UserOutlined />}
              placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input
              onChange={handleChange}
              value={inputValue.email}
              prefix={<MailOutlined />}
              placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={inputValue.password}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={handleSubmit} type="primary" htmlType="submit" className={styles.popup_submitButton}>
              {isRegister ? 'Sign Up' : 'Log In'}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}

