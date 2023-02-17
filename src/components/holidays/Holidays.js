import Paragraph from 'antd/es/typography/Paragraph'
import Title from 'antd/es/typography/Title'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchHolidays } from '../../store/reducers/holidays'

import styles from './styles.module.css'

export default function Holidays () {
  const dispatch = useDispatch()
  const holidayName = useSelector((state) => state.holidays.holidays)
  // useEffect(() => {
  //   dispatch(fetchHolidays())
  // }, [])

  return (
    <>
      <div className={styles.databox}>
        <Title className={styles.title}>Today is</Title>
        <Paragraph className={styles.todayIs}>{holidayName}</Paragraph>
      </div>
    </>
  )
}
