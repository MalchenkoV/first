import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchDate, fetchForecast } from '../../store/reducers/forecasts'

import styles from './styles.module.css'

export function Forecast () {
  const dispatch = useDispatch()
  const temp = useSelector((state) => state.forecast.temperature)
  const wind = useSelector((state) => state.forecast.windspeed)
  const time = useSelector((state) => state.forecast.time)
  const day = useSelector((state) => state.forecast.day)

  useEffect(() => {
    const timeUpdt = () => {
      dispatch(fetchDate())
    }
    const timer = setInterval(timeUpdt, 1000)

    return () => clearInterval(timer)
  }, [])

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

