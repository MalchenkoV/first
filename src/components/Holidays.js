import React, { useEffect, useState } from 'react'

import { getHolidays } from '../api'
import { pad } from '../utils'

export function Holidays () {
  const [dayToday, setDayToday] = useState('')
  const date = new Date()

  useEffect(() => {
    async function fetchHolidays () {
      const { data } = await getHolidays()
      const dateFormat = `${date.getFullYear()}-${pad((date.getMonth() + 1), 2)}-${pad(date.getDate(), 2)}`

      const holiday = data.find((item) => item.date === dateFormat)
      setDayToday(holiday ? holiday.name : 'Just ordinary day:(')
    }
    fetchHolidays()
  }, [])

  return (
    <div className='data-box'>
      <h2 className='header'>Today is</h2>
      <h2 className='today-is'>{dayToday}</h2>
    </div>
  )
}
