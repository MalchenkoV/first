import { UploadOutlined } from '@ant-design/icons'
import { Button, Divider, Radio, Space, Spin, Upload } from 'antd'
import Link from 'antd/es/typography/Link'
import Title from 'antd/es/typography/Title'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { convertSlice, fetchConvert, fetchDownload, fetchFormats, fetchTaskStatus, fetchUpload } from '../../store/reducers/converter'

import styles from './styles.module.css'

export default function Converter () {
  const dispatch = useDispatch()
  const taskImportId = useSelector((state) => state.converter.taskImportId)
  const taskConvertId = useSelector((state) => state.converter.taskConvertId)
  const url = useSelector((state) => state.converter.taskUrl)
  const formatsList = useSelector((state) => state.converter.formatsList)
  const taskStatus = useSelector((state) => state.converter.taskStatus)
  const urlTitle = useSelector((state) => state.converter.urlTitle)
  const [file, setFiles] = useState({})
  const [inputValue, setInputValue] = useState()
  const [outputValue, setOutputValue] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const onChangeFile = useCallback((e) => {
    const newfile = e.target.files[0]
    setFiles(newfile)
  }, [])

  const onChangeInput = useCallback((e) => {
    const newInputValue = e.target.value
    setInputValue(newInputValue)
    dispatch(fetchFormats(newInputValue))
  }, [])

  const onChangeOutput = useCallback((e) => {
    const newOutputValue = e.target.value
    setOutputValue(newOutputValue)
  }, [])

  const handleUpload = useCallback(() => {
    dispatch(fetchUpload(file))
  }, [file])

  function clearValues () {
    dispatch(convertSlice.actions.clearState())
    setIsLoading(false)
    removeChecked()
  }

  const handleConvert = useCallback(() => {
    dispatch(fetchConvert({ taskImportId, inputValue, outputValue }))
  }, [inputValue, outputValue])

  function removeChecked () {
    for (const radio of document.getElementsByName('input')) {
      radio.checked = false
    }
  }

  useEffect(() => {
    if (taskConvertId !== '') {
      dispatch(fetchTaskStatus(taskConvertId))
      setIsLoading(true)
    }
  }, [taskConvertId])

  useEffect(() => {
    if (taskStatus === 'finished') {
      dispatch(fetchDownload(taskConvertId))
      clearValues()
      removeChecked()
    }
  }, [taskStatus])

  return (
    <>
      <Space className={styles.databox}>
        <Space direction='vertical'>
          <Title level={2}>Upload file</Title>
          <Divider className={styles.text} />
          <Upload>
            <Button icon={<UploadOutlined />} onChange={onChangeFile} className={styles.button}>Select File</Button>
          </Upload>
          <Button
            type='primary'
            className={styles.button}
            onClick={handleUpload}
          >Upload File</Button>
          <Button
            type='primary'
            className={styles.button}
            onClick={clearValues}
          >Clear All</Button>

        </Space>
        <Space direction='vertical' className={styles.radiobox}>
          <Title level={2}>Choose formats</Title>
          <Divider className={styles.text} />
          <Space align='start' className={styles.radio}>
            <Radio.Group onChange={onChangeInput}>
              <Title level={3} className={styles.text}>From</Title>
              <Space direction='vertical'>
                <Radio value='doc'>DOC</Radio>
                <Radio value='txt'>TXT</Radio>
                <Radio value='pdf'>PDF</Radio>
                <Radio value='jpg'>JPG</Radio>
                <Radio value='png'>PNG</Radio>
                <Radio value='svg'>SVG</Radio>
              </Space>
            </Radio.Group>
            <Radio.Group onChange={onChangeOutput}>
              <Title level={3} className={styles.text}>To</Title>
              <Space direction='vertical'>
                {formatsList.map((item) => (
                  <Radio value={item.to_format}>{item.to_format.toUpperCase()}</Radio>
                ))}
              </Space>
            </Radio.Group>
            <Button type='primary' className={styles.button} onClick={handleConvert}>Convert</Button>
          </Space>
        </Space>
        <Space direction='vertical' className={styles.loadbox}>
          <Title level={2}>Download file</Title>
          <Divider className={styles.text} />
          <Spin className={isLoading ? styles.spinner : styles.disable} />
          <Link href={url} className={styles.link} target='_blank'>{urlTitle}</Link>
        </Space>
      </Space>
    </>
  )
}
