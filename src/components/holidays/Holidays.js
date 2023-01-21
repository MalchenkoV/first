import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchHolidays } from '../../store/reducers/holidays'

import styles from './styles.module.css'

export function Holidays () {
  const dispatch = useDispatch()
  const holidayName = useSelector((state) => state.holidays.holidays)

  useEffect(() => {
    dispatch(fetchHolidays())
  }, [])

  return (
    <div className={styles.databox}>
      <h2 className={styles.title}>Today is</h2>
      <h2 className={styles.todayIs}>{holidayName}</h2>
    </div>
  )
}
