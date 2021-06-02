import React, { memo, useState, useCallback, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, HeatmapLayer } from '@react-google-maps/api'
import { useQuery } from 'react-query'
// Components
// Stylesheet
import './index.scss'

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
  const [data, setData] = useState()

  const initialLocaltion = {
    lat: -8.096328999999999,
    lng: -34.927513499999996,
  }
 
  useEffect(() => {
    useQuery('calamities', async () => {
        const response = await fetch('http://localhost:8000/calamity')
        if (!response.ok) {
        throw new Error('Network response was not ok')
        }
        return setData(data)
    })
  }, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
  }, [])

  useEffect(() => {
    const { google } = window
    if (data && isLoaded) {
      setMarks(
        data.calamities.map((calamity) =>
          google.maps.LatLng(calamity.lat, calamity.longitude),
        ),
      )
    }
  }, [data, isLoaded])

  const onLoad = useCallback((newMap) => {
    const { google } = window
    const bounds = new google.maps.LatLngBounds()
    newMap.fitBounds(bounds)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center || initialLocaltion}
      zoom={2}
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
