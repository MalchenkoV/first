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
        <h2 className={styles.title}>Upload file</h2>
        <form encType='multipart/form-data' className={styles.form}>
          <input type='file' id='file' multiple className={styles.choosefile} onChange={onChangeFile}></input>
          <input type='button' className={styles.button} value='Upload' onClick={handleUpload}></input>
          <input type='reset' className={styles.button} value='Clear' onClick={clearValues}></input>
        </form>
        <h2 className={styles.title}>Choose formats</h2>
        <div className={styles.radiobox}>
          <form className={styles.radioform} onChange={onChangeInput}>
            <h3 className={styles.radiotitle}>From</h3>
            <div className={styles.radioinput}>
              <input type='radio' name='input' value='doc'></input>
              <label>doc</label>
            </div>
            <div className={styles.radioinput}>
              <input type='radio' name='input' value='txt'></input>
              <label>txt</label>
            </div>
            <div className={styles.radioinput}>
              <input type='radio' name='input' value='pdf'></input>
              <label>pdf</label>
            </div>
            <div className={styles.radioinput}>
              <input type='radio' name='input' value='jpg'></input>
              <label>jpg</label>
            </div>
            <div className={styles.radioinput}>
              <input type='radio' name='input' value='png'></input>
              <label>png</label>
            </div>
            <div className={styles.radioinput}>
              <input type='radio' name='input' value='svg'></input>
              <label>svg</label>
            </div>
          </form>
          <form className={styles.radioform} onChange={onChangeOutput}>
            <h3 className={styles.radiotitle}>To</h3>
            {formatsList.map((item) => (
              <div className={styles.radioinput} key={item.to_format}>
                <input type='radio' name='output' value={item.to_format}></input>
                <label>{item.to_format}</label>
              </div>
            ))}
          </form>
          <button className={styles.button} onClick={handleConvert}>Convert</button>
        </div>
        <h2 className={styles.title}>Download file</h2>
        <div className={styles.loadbox}>
          <div className={isLoading ? styles.spinner : styles.disable}></div>
          <a href={url} className={styles.link} target='_blank'>{urlTitle}</a>
        </div>
      </div>
    </>
  )
}
