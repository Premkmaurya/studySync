import React from 'react'

const details = [
    {
        value: '+1234567890',
        imgSrc: '/icons/email.png',
        desc:"Reach out to us for more information."
    },
    {
        desc:"Receive prompt assistance for urgant issues.",
        value: 'example@example.com',
        imgSrc: '/icons/email.png'
    },
    {
        desc:"24 gomtinagar, Lucknow, UP",
        value: 'Gen AI Tech',
        imgSrc: '/icons/email.png'
    }
]

const ContactDetails = () => {
  return (
    <div>
        {details.map((detail, index) => (
            <div key={index} className="text-black flex flex-col gap-2 mb-6 ">
                <img src={detail.imgSrc} alt={detail.label} className="contact-icon" />
                <div>{detail.value}</div>
                <div>{detail.desc}</div>
            </div>
        ))}
    </div>
  )
}

export default ContactDetails