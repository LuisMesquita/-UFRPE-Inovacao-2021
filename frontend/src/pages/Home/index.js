import React from 'react'
import Map from '../Map'
import CalamityModal from '../../components/Modals/CalamityModal'

function Home() {
  return (
    <div className='home'>
      <Map />
      <CalamityModal />
    </div>
  )
}

export default Home