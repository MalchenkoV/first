import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchLocation, fetchMaps } from '../../store/reducers/maps'

import styles from './styles.module.css'

export default function Maps () {
  const dispatch = useDispatch()
  const latitude = useSelector((state) => state.maps.latitude)
  const longitude = useSelector((state) => state.maps.longitude)
  const map = `https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${latitude},${longitude}/10?mapSize=400,400&pp=${latitude},${longitude};66&mapLayer=Basemap,Buildings&key=AjhFzAhsDYFZisd16U3T_Y_H8-aK2T-6b6BN_CNgA1Vj3MdLsBqgsOlPJsivlOPt`
  // const src = `data:image/jpeg;base64,${map}`
  useEffect(() => {
    dispatch(fetchLocation())
  }, [latitude, longitude])

  return (
    <>
      <div className={styles.databox}>
        <img src={map} id='image' className={styles.image} alt='Map'></img>
      </div>
    </>
  )
}

