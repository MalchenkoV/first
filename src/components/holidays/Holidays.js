import { Space } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import Title from 'antd/es/typography/Title'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchHolidays } from '../../store/reducers/holidays'

export default function Holidays () {
  const dispatch = useDispatch()
  const holidayName = useSelector((state) => state.holidays.holidays)
  useEffect(() => {
    dispatch(fetchHolidays())
  }, [])

  return (
    <>
      <Space direction='vertical'>
        <Title>Today is</Title>
        <Paragraph strong type='secondary' style={{ fontSize: 24 }}>{holidayName}</Paragraph>
      </Space>
    </>
  )
}
