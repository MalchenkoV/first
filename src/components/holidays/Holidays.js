import React, { useEffect, useState } from 'react'

import { getHolidays } from '../../api'
import { pad } from '../../utils'

import styles from './styles.module.css'

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
    <div className={styles.databox}>
      <h2 className={styles.title}>Today is</h2>
      <h2 className={styles.todayIs}>{dayToday}</h2>
    </div>
  )
}
