import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchDate, fetchForecast, forecastSlice } from '../../store/reducers/forecasts'
import { pad } from '../../utils'

import styles from './styles.module.css'

export function Forecast () {
  const dispatch = useDispatch()
  const temp = useSelector((state) => state.forecast.temperature)
  const wind = useSelector((state) => state.forecast.windspeed)
  const time = useSelector((state) => state.forecast.time)
  const day = useSelector((state) => state.forecast.day)

  // const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  // const [timeParams, setTimeParams] = useState({})

  // useEffect(() => {
  //   function timeUpdate () {
  //     const date = new Date()
  //     const currentTime = `${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}:${pad(date.getSeconds(), 2)}`
  //     const currentDay = `${pad(date.getDate(), 2)} ${months[date.getMonth()]} ${date.getFullYear()}`
  //     setTimeParams({
  //       time: currentTime,
  //       day: currentDay,
  //     })
  //   }

  //   const timer = setInterval(timeUpdate, 1000)
  //   timeUpdate()

  //   return () => clearInterval(timer)
  // }, [])

  useEffect(() => {
    dispatch(fetchForecast())
  })

  // useEffect(() => {
  //   const timer = setInterval(dispatch(fetchDate()), 1000)
  //   dispatch(fetchDate())

  //   return () => clearInterval(timer)
  // }, [])

  async function onClick () {
    dispatch(fetchForecast())
  }

  return (
    <div className={styles.databox}>
      <h2 className={styles.title}>Tbilisi</h2>
      <h2 className={styles.dayToday}>{day}</h2>
      <h2 className={styles.time}>{time}</h2>
      <h2 className={styles.temp}>Temperature is {temp} °C</h2>
      <h2 className={styles.wind}>Wind speed is {wind} km/h</h2>

      <button onClick={onClick}>Обновить</button>
    </div>
  )
}

