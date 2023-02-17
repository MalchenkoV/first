import { UploadOutlined } from '@ant-design/icons'
import { Button, Card, Upload } from 'antd'
import Meta from 'antd/es/card/Meta'
import Title from 'antd/es/typography/Title'
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
        <Title className={styles.title}>Upload file</Title>
        <Upload>
          <Button icon={<UploadOutlined />} onChange={onChange} onClick={handleGetServerData}>Select File</Button>
        </Upload>
        <Button
          disabled={file === ''}
          type='primary'
          onClick={handleUploadFile}
          style={{
            marginTop: 16,
          }}
        >Upload File</Button>
        <div className={styles.filesgrid}>
          {fileList.map((item) => (
            <Card
              hoverable
              className={styles.file}
              cover={<img alt='file' className={styles.file_image} />}>
              <Meta title={item.name} />
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

// добавить иконку загрузки файла
