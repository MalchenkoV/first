import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchLocation, fetchMaps } from '../../store/reducers/maps'

export function Maps () {
  const dispatch = useDispatch()
  const latitude = useSelector((state) => state.maps.latitude)
  const longitude = useSelector((state) => state.maps.longitude)
  const map = useSelector((state) => state.maps.image)

  useEffect(() => {
    dispatch(fetchLocation())
    dispatch(fetchMaps({ latitude, longitude }))
  }, [latitude, longitude])
  return (
    <div>
      <img></img>
    </div>
  )
}

