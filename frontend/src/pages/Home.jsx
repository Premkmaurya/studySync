import React from 'react'
import Nav from '../components/home/hero/Nav'
import BottomRight from '../components/home/hero/BottomRight'
import BottomLeft from '../components/home/hero/BottomLeft'
import BottomCenter from '../components/home/hero/BottomCenter'

const Home = () => {
  return (
    <div className='relative w-screen h-screen'>
      <div className='absolute top-0 left-0 w-full h-full'>
        <img className='w-full h-full bg-cover' src="/img/group-study.jpg" alt="" />
      </div>
      <Nav />
      <div className='w-screen h-[60vh] rounded-b-4xl bg-transparent overflow-hidden'></div>
      <BottomLeft />
      <BottomCenter />
      <BottomRight />
    </div>
  )
}

export default Home
