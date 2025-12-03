import React from 'react'

const data = [
  {
    img:"/img/powered-by.avif",
    title:"Powered by AI",
    desc:"Our platform leverages cutting-edge AI technology to provide personalized learning experiences, adapting to each student's unique needs and pace."
  },
  {
    img:"/img/powered-by.avif",
    title:"Powered by AI",
    desc:"Our platform leverages cutting-edge AI technology to provide personalized learning experiences, adapting to each student's unique needs and pace."
  },
  {
    img:"/img/powered-by.avif",
    title:"Powered by AI",
    desc:"Our platform leverages cutting-edge AI technology to provide personalized learning experiences, adapting to each student's unique needs and pace."
  },
]

const CoreCards = () => {
  return (
    <div className="flex gap-8 flex-col justify-center items-center h-full w-full px-6">
      {data.map((item, index) => (
        <div className='shadow-3xl border mb-8 border-gray-300 w-[90%] flex flex-col gap-3 p-1.5 rounded-2xl'>
          <div key={index} className="w-full bg-linear-to-t from-white via-blue-100 to-blue-200 border border-gray-300  rounded-2xl p-3 shadow-xl bg-white">
          <div className="w-32 h-22 shadow-2xl mb-3">
            <img src={item.img} alt={item.title} className='w-full h-full object-cover' />
          </div>
          <h1 className="text-2xl font-semibold leading-tight">{item.title}</h1>
          <p className="text-sm text-gray-500">{item.desc}</p>
        </div>
        </div>
      ))}
    </div>
  )
}

export default CoreCards