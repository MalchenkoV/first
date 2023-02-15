import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchServerUrl, fetchUploadFile } from '../../store/reducers/uploadfile'

import styles from './styles.module.css'

export default function UploadFile () {
  const dispatch = useDispatch()
  const url = useSelector((state) => state.uploadfiles.serverUrl)
  const sessId = useSelector((state) => state.uploadfiles.sessId)
  const fileList = useSelector((state) => state.uploadfiles.fileList)
  const [file, setFiles] = useState({})

  const handleGetServerData = useCallback(() => {
    dispatch(fetchServerUrl())
  }, [])

  const onChange = useCallback((e) => {
    const newfile = e.target.files[0]
    setFiles(newfile)
  }, [])

  const handleUploadFile = useCallback(() => {
    dispatch(fetchUploadFile({ url, sessId, file }))
  }, [file])

  return (
    <>
      <div className={styles.databox}>
        <h2 className={styles.title}>Upload file</h2>
        <form encType='multipart/form-data' className={styles.form}>
          <input type='file' id='file' multiple className={styles.choosefile} onChange={onChange} onClick={handleGetServerData}></input>
          <input type='button' className={styles.button} value='Upload' onClick={handleUploadFile}></input>
          <input type='reset' className={styles.button} value='Clear'></input>
        </form>
        <div className={styles.filesgrid}>
          {fileList.map((item) => (
            <div key={item.fileCode} className={styles.file}>
              <img className={styles.file_image}></img>
              <div>
                <h3 className={styles.file_title}>{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

