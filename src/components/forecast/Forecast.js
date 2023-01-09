import React, { useEffect, useState } from 'react'

import { getForecast } from '../../api'
import { pad } from '../../utils'

import styles from './styles.module.css'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function Forecast () {
  const [dayParams, setDayParams] = useState({})
  const [timeParams, setTimeParams] = useState({})

  useEffect(() => {
    async function fetchForecast () {
      const { data } = await getForecast()
      setDayParams({
        temperature: data.current_weather.temperature,
        windSpeed: data.current_weather.windspeed,
      })
    }
    fetchForecast()
  }, [])

  useEffect(() => {
    function timeUpdate () {
      const date = new Date()
      setTimeParams({
        time: `${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}:${pad(date.getSeconds(), 2)}`,
        day: `${pad(date.getDate(), 2)} ${months[date.getMonth()]} ${date.getFullYear()}`,
      })
    }

    const timer = setInterval(timeUpdate, 1000)
    timeUpdate()

    return () => clearInterval(timer)
  }, [])

  return (
    <div className={styles.data-box}>
      <h2 className={styles.title}>Tbilisi</h2>
      <h2 className={styles.dayToday}>{timeParams.day}</h2>
      <h2 className={styles.time}>{timeParams.time}</h2>
      <h2 className={styles.temp}>Temperature is {dayParams.temperature} °C</h2>
      <h2 className={styles.wind}>Wind speed is {dayParams.windSpeed} km/h</h2>

      <button onClick={fetchForecast}>Обновить</button>
    </div>
  )
}

