/* eslint-disable no-unused-vars */
import React, { memo, useState, useCallback, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, HeatmapLayer } from '@react-google-maps/api'
// Components
// Stylesheet
import './index.scss'
import { useCalamities } from '../../api/calamities'

const containerStyle = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const googleMapsLibraries = ['drawing', 'visualization', 'places']

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: googleMapsLibraries,
  })

  const [center, setCenter] = useState({})
  const [marks, setMarks] = useState()

  const initialLocaltion = {
    lat: -8.096328999999999,
    lng: -34.927513499999996,
  }

  const { data } = useCalamities()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
  }, [])

  //   useEffect(() => {
  //     const { google } = window
  //     if (data && isLoaded) {
  //       setMarks(
  //         data.calamities.map((calamity) => ({
  //           location: google.maps.LatLng(calamity.latitude, calamity.longitude),
  //           weight: 2,
  //         })),
  //       )
  //     }
  //   }, [data, isLoaded])

  const onLoad = useCallback((newMap) => {
    const { google } = window
    const bounds = new google.maps.LatLngBounds()
    newMap.fitBounds(bounds)
    setMarks([
      {
        location: google.maps.LatLng(-8.096328999999999, -34.927513499999996),
        weight: 2,
      },
    ])
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center || initialLocaltion}
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
