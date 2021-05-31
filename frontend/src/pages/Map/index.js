import React, { memo, useState, useCallback, useEffect } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
// Components
// Stylesheet
import './index.scss'

const containerStyle = {
  width: window.innerWidth,
  height: window.innerHeight,
}

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  })
  const [center, setCenter] = useState({})

  const initialLocaltion = {
    lat: -8.096328999999999,
    lng: -34.927513499999996,
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
  }, [])

  const onLoad = useCallback((newMap) => {
    const bounds = new window.google.maps.LatLngBounds()
    newMap.fitBounds(bounds)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center || initialLocaltion}
      zoom={16}
      onLoad={onLoad}
      onUnmount={() => {}}
    />
  ) : (
    <></>
  )
}

export default memo(MyComponent)
