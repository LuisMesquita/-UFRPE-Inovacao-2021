/* eslint-disable no-unused-vars */
import React, { memo, useState, useCallback, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, HeatmapLayer } from '@react-google-maps/api'
// Components
// Stylesheet
import './index.scss'
import { getCalamities } from '../../api/calamities'

const containerStyle = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const initialLocaltion = {
  lat: -8.096328999999999,
  lng: -34.927513499999996,
}

const googleMapsLibraries = ['drawing', 'visualization', 'places']

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: googleMapsLibraries,
  })

  const [center, setCenter] = useState(initialLocaltion)
  const [marks, setMarks] = useState()
  const { data } = getCalamities()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
  }, [])

  const onLoad = useCallback(
    (newMap) => {
      const { google } = window

      if (data && isLoaded) {
        const bounds = new google.maps.LatLngBounds()
        newMap.fitBounds(bounds)
        setMarks(
          data.calamities.map((calamity) => ({
            location: google.maps.LatLng(calamity.latitude, calamity.longitude),
            weight: 2,
          })),
        )
      }
    },
    [data],
  )
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={4}
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
