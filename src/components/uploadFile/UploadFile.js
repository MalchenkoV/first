import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchServerUrl, fetchUploadFile } from '../../store/reducers/uploadfile'

import styles from './styles.module.css'

export function UploadFile () {
  const dispatch = useDispatch()
  const url = useSelector((state) => state.uploadfiles.serverUrl)
  const sessId = useSelector((state) => state.uploadfiles.sessId)
  //   const fileList = useSelector((state) => state.uploadfiles.fileList)
  const fileValue = document.getElementById('file')
  const [file, setFiles] = useState({})

  const handleGetServerData = useCallback(() => {
    dispatch(fetchServerUrl())
  }, [])

  useEffect(() => {
    const newfile = fileValue
    setFiles(newfile)
    console.log(newfile)
  }, [fileValue])

  const handleUploadFile = useCallback(() => {
    dispatch(fetchUploadFile({ url, sessId, file }))
  }, [file, url, sessId])

  return (
    <div className={styles.databox}>
      <h2 className={styles.title}>You can upload file</h2>
      <form encType='multipart/form-data' className={styles.form}>
        <input type='file' id='file' multiple className={styles.choosefile} onClick={handleGetServerData}></input>
        <input type='button' className={styles.button} value='Upload' onClick={handleUploadFile}></input>
        <input type='reset' className={styles.button} value='Clear'></input>
      </form>
      {/* <form className={styles.form}>
        <label for='file-select' className={styles.choosefile}>Choose the file: </label>
        <select id='file-select'>
          {fileList.map((item) => (
            <option key={item.name} className={styles.choosefile}>{item.name}</option>
          ))}
        </select>
      </form> */}
    </div>
  )
}
