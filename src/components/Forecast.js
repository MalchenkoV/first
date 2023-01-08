import React, { useEffect, useState } from 'react'

import { getForecast } from '../api'

function pad (num, size) {
  num = num.toString()
  while (num.length < size) num = `0${num}`
  return num
}

export function Forecast () {
  const [dayParams, setDayParams] = useState({})
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const date = new Date()

  useEffect(() => {
    async function fetchForecast () {
      const { data } = await getForecast()
      setDayParams({
        time: `${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}`,
        day: `${pad(date.getDate(), 2)} ${months[date.getMonth()]} ${date.getFullYear()}`,
        temperature: data.current_weather.temperature,
        windSpeed: data.current_weather.windspeed,
      })
    }

    fetchForecast()
  }, [])

  return (
    <div className='data-box'>
      <h2 className='header'>Tbilisi</h2>
      <h2 className='dayToday'>{dayParams.day}</h2>
      <h2 className='time'>{dayParams.time}</h2>
      <h2 className='temp'>Temperature is {dayParams.temperature} °C</h2>
      <h2 className='wind'>Wind speed is {dayParams.windSpeed} km/h</h2>
    </div>
  )
}
