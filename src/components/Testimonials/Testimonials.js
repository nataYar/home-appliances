import React from 'react';
import './Testimonials.scss';

export default function Testimonials() {
    const testimonialsArray  = [
        {
          text: "They fixed my Time Machine and a Vaccum Chamber in one day. Loved that they accepted payment with twigs and almonds",
          name: 'Gavin SchSch',
          location: "LB, CA",
        },
        {
            text: "David reset my cat feeder and now i can eat every 10 minutes! Great service, we'll call them again!!!",
            name: 'Elara',
            location: "LB, CA",
        },
        {
        text: "Nothing was done, hate the service. Didn't call them though, but couldn't they just read my mind? ",
        name: 'Don\'t wanna be named ',
        location: "Sfjbsjkd, NZ",
        },

      ]


  return (
    <>
      {
        testimonialsArray.map((el, key) => {
          return (
            <div className="reference-container" key={key}>
              <div>{el.text} </div>
              <div className='reference-btm-text'>
                <p className='reference-name'>{el.name} </p>
                <p>{el.location} </p>
              </div>
            </div>
          )
        })
      }
    </>
  )
}
