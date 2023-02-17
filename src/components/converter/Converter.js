import { UploadOutlined } from '@ant-design/icons'
import { Button, Radio, Space, Spin, Upload } from 'antd'
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
      <div className={styles.databox}>
        <div>
          <Title level={2} className={styles.title}>Upload file</Title>
          <Space>
            <Upload>
              <Button icon={<UploadOutlined />} onChange={onChangeFile} style={{ marginTop: 20 }}>Select File</Button>
            </Upload>
            <Button
              disabled={file === ''}
              type='primary'
              style={{ marginTop: 20 }}
              onClick={handleUpload}
            >Upload File</Button>
          </Space>
        </div>
        <div className={styles.radiobox}>
          <Title level={2} className={styles.title}>Choose formats</Title>
          <div>
            <Radio.Group onChange={onChangeInput} style={{ marginRight: 20 }}>
              <Title level={3} className={styles.radiotitle}>From</Title>
              <Space direction='vertical'>
                <Radio value='doc'>DOC</Radio>
                <Radio value='txt'>TXT</Radio>
                <Radio value='pdf'>PDF</Radio>
                <Radio value='jpg'>JPG</Radio>
                <Radio value='png'>PNG</Radio>
                <Radio value='svg'>SVG</Radio>
              </Space>
            </Radio.Group>
            <Radio.Group onChange={onChangeOutput} style={{ marginRight: 20, marginLeft: 20 }}>
              <Title level={3} className={styles.radiotitle}>To</Title>
              <Space direction='vertical'>
                {formatsList.map((item) => (
                  <Radio value={item.to_format}>{item.to_format.toUpperCase()}</Radio>
                ))}
              </Space>
            </Radio.Group>
            <Button type='primary' onClick={handleConvert} style={{ marginLeft: 20, alignSelf: 'center' }}>Convert</Button>
          </div>
        </div>
        <div className={styles.loadbox}>
          <Title level={2} className={styles.title}>Download file</Title>
          <Spin className={isLoading ? styles.spinner : styles.disable} />
          <Link href={url} style={{ marginTop: 30, fontSize: 20 }} target='_blank'>{urlTitle}</Link>
        </div>
      </div>
    </>
  )
}
