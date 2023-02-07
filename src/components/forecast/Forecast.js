import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchDate, fetchEarthquakes, fetchForecast, fetchLocation, fetchSuntimes } from '../../store/reducers/forecasts'

import styles from './styles.module.css'

export function Forecast () {
  const dispatch = useDispatch()
  const temp = useSelector((state) => state.forecast.temperature)
  const wind = useSelector((state) => state.forecast.windspeed)
  const time = useSelector((state) => state.forecast.time)
  const day = useSelector((state) => state.forecast.day)
  const city = useSelector((state) => state.forecast.city)
  const latitude = useSelector((state) => state.forecast.latitude)
  const longitude = useSelector((state) => state.forecast.longitude)
  const sunrise = useSelector((state) => state.forecast.sunrise)
  const sunset = useSelector((state) => state.forecast.sunset)
  const count = useSelector((state) => state.forecast.earthquakes)

  useEffect(() => {
    const timeUpdt = () => {
      dispatch(fetchDate())
    }
    dispatch(fetchLocation())
    dispatch(fetchForecast({ latitude, longitude }))
    dispatch(fetchSuntimes({ latitude, longitude }))
    dispatch(fetchEarthquakes({ latitude, longitude }))
    // const timer = setInterval(timeUpdt, 1000)

    // return () => clearInterval(timer)
  }, [latitude, longitude])

  async function onClick () {
    dispatch(fetchForecast())
    dispatch(fetchEarthquakes({ latitude, longitude }))
  }

  return (
    <div className={styles.databox}>
      <h2 className={styles.title}>{city}</h2>
      <h2 className={styles.parameter}>{day}</h2>
      <h2 className={styles.parameter}>{time}</h2>
      <h2 className={styles.parameter}>Temperature is {temp} °C</h2>
      <h2 className={styles.parameter}>Wind speed is {wind} km/h</h2>
      <h2 className={styles.parameter}>Sunrise at {sunrise}</h2>
      <h2 className={styles.parameter}>Sunset at {sunset}</h2>
      <h2 className={styles.parameter}>Earthquakes for the last month: {count}</h2>

      <button onClick={onClick}>Обновить</button>
    </div>
  )
}

