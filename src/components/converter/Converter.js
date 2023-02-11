import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchConvert, fetchDownload, fetchUpload } from '../../store/reducers/converter'

import styles from './styles.module.css'

export function Converter () {
  const dispatch = useDispatch()
  const startId = useSelector((state) => state.converter.taskStartId)
  const finishId = useSelector((state) => state.converter.taskFinishId)
  const url = useSelector((state) => state.converter.taskUrl)
  const [file, setFiles] = useState({})

  const onChangeFile = useCallback((e) => {
    const newfile = e.target.files[0]
    setFiles(newfile)
  }, [])

  //   const onChangeRadio = useCallback((e) => {

  //   })

  const handleUpload = useCallback(() => {
    dispatch(fetchUpload(file))
  }, [file])

  const handleConvert = useCallback(() => {
    dispatch(fetchConvert({ startId }))
  })

  const handleDownload = useCallback(() => {
    dispatch(fetchDownload(finishId))
  })

  return (
    <div className={styles.databox}>
      <h2 className={styles.title}>Upload file</h2>
      <form encType='multipart/form-data' className={styles.form}>
        <input type='file' id='file' multiple className={styles.choosefile} onChange={onChangeFile}></input>
        <input type='button' className={styles.button} value='Upload' onClick={handleUpload}></input>
        <input type='reset' className={styles.button} value='Clear'></input>
      </form>
      <h2 className={styles.title}>Choose formats</h2>
      <h2 className={styles.title}>From/to</h2>
      <div className={styles.radiobox}>
        <form className={styles.radioform}>
          <div className={styles.radioinput}>
            <input type='radio' id='doc'></input>
            <label for='doc'>doc</label>
          </div>
          <div className={styles.radioinput}>
            <input type='radio' id='jpg'></input>
            <label for='jpg'>jpg</label>
          </div>
        </form>
        <form className={styles.radioform}></form>
        <button className={styles.button}>Convert</button>
      </div>
      {/* здесь сделать радио-кнопки на разные форматы from/to и кнопку для конвертирования */}
      <h2 className={styles.title}>Download file</h2>
      <div>
        <a href={url} className={styles.link}>Congrats</a>
      </div>
      {/* сюда вывести ссылку на скачивание */}
    </div>
  )
}
