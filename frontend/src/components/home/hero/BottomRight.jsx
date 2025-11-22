import React from 'react'
import { FaInstagram,FaGithub,FaLinkedin} from "react-icons/fa";

const BottomRight = () => {
  return (
    <div className='absolute bottom-0 flex flex-col justify-center pr-8 items-end gap-5 right-0 w-[40vw] h-[35vh] '>
        <div className="w-[80%] h-14 bg-black rounded-3xl"></div>
        <div className="w-[45%] h-14 bg-black rounded-3xl"></div>
        <div className='w-[30%] h-10 flex gap-8 items-center justify-center pr-5'>
            <a href=""><FaInstagram size={22} /></a>
            <a href=""><FaGithub  size={22} /></a>
            <a href=""><FaLinkedin  size={22} /></a>
        </div>
    </div>
  )
}

export default BottomRight