import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchLocation, fetchMaps } from '../../store/reducers/maps'

import styles from './styles.module.css'

export function Maps () {
  const dispatch = useDispatch()
  const latitude = useSelector((state) => state.maps.latitude)
  const longitude = useSelector((state) => state.maps.longitude)
  const map = useSelector((state) => state.maps.image)
  const src = `data:image/jpeg;base64,${map}`

  useEffect(() => {
    dispatch(fetchLocation())
    dispatch(fetchMaps({ latitude, longitude }))
  }, [map, latitude, longitude])

  return (
    <div className={styles.databox}>
      <img src={src} id='image' className={styles.image} alt='Map'></img>
    </div>
  )
}

