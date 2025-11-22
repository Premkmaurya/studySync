import React from 'react'
import Image from "../components/home/hero/Image"
import Nav from '../components/home/hero/Nav'
import BottomRight from '../components/home/hero/BottomRight'
import BottomLeft from '../components/home/hero/BottomLeft'
import BottomCenter from '../components/home/hero/BottomCenter'

const Home = () => {
  return (
    <div className='relative w-screen h-screen'>
      <Nav />
      <Image />
      <BottomLeft />
      <BottomCenter />
      <BottomRight />
    </div>
  )
}

export default Home
