import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import styles from './styles.module.css'

export function Holidays () {
  const holidayName = useSelector((state) => state.holidays.holidays)

  return (
    <div className={styles.databox}>
      <h2 className={styles.title}>Today is</h2>
      <h2 className={styles.todayIs}>{holidayName}</h2>
    </div>
  )
}
