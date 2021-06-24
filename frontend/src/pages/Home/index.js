import React from 'react'
import Map from '../Map'
import CalamityModal from '../../components/Modals/CalamityModal'
import Filters from '../../components/Filters'

function Home() {
  return (
    <div className='home'>
      <Map />
      <CalamityModal />
      <Filters />
    </div>
  )
}

export default Home
