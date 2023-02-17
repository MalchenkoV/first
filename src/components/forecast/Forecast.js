import { DatabaseOutlined, FieldTimeOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import Title from 'antd/es/typography/Title'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchDate, fetchEarthquakes, fetchForecast, fetchLocation, fetchSuntimes } from '../../store/reducers/forecasts'

import styles from './styles.module.css'

export default function Forecast () {
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
    <>
      <div className={styles.databox}>
        <Title className={styles.title}>{city}</Title>
        <Paragraph className={styles.parameter}>{day}</Paragraph>
        <Paragraph className={styles.parameter}>{time}</Paragraph>
        <Paragraph className={styles.parameter}>Temperature is {temp} °C</Paragraph>
        <Paragraph className={styles.parameter}>Wind speed is {wind} km/h</Paragraph>
        <Paragraph className={styles.parameter}>Sunrise at {sunrise}</Paragraph>
        <Paragraph className={styles.parameter}>Sunset at {sunset}</Paragraph>
        <Paragraph className={styles.parameter}>Earthquakes for the last month: {count}</Paragraph>

        <Button type='primary' onClick={onClick}>Обновить</Button>
      </div>

    </>
  )
}

