/* eslint-disable no-unused-vars */
import React, { memo, useState, useCallback, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, HeatmapLayer } from '@react-google-maps/api'
import { useSelector, useDispatch } from 'react-redux'
// Components
// Stylesheet
import './index.scss'
import { list } from '../../redux/actions/calamities.action'

const containerStyle = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const initialLocaltion = {
  lat: -8.096328999999999,
  lng: -34.927513499999996,
}

const googleMapsLibraries = ['drawing', 'visualization', 'places']

const loadMarks = (data, setMarks) => {
  const { google } = window
  setMarks(
    data.map(
      (calamity) =>
        new google.maps.LatLng(
          Number(calamity.latitude),
          Number(calamity.longitude),
        ),
    ),
  )
}

function MyComponent() {
  const dispatch = useDispatch()
  const { data } = useSelector((state) => state.calamities.filter)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: googleMapsLibraries,
  })

  const [center, setCenter] = useState(initialLocaltion)
  const [marks, setMarks] = useState()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
  }, [])

  useEffect(() => {
    if (data && isLoaded) {
      loadMarks(data, setMarks)
    } else {
      dispatch(list())
    }
  }, [data, isLoaded])

  const onLoad = useCallback(
    (newMap) => {
      const { google } = window

      if (data && isLoaded) {
        const bounds = new google.maps.LatLngBounds()
        newMap.fitBounds(bounds)
        loadMarks(data, setMarks)
      }
    },
    [data],
  )

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={onLoad}
      onUnmount={() => {}}
    >
      {marks && <HeatmapLayer data={marks} />}
    </GoogleMap>
  ) : (
    <></>
  )
}

export default memo(MyComponent)
