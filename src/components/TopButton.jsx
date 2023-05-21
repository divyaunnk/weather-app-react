import React from 'react'

function TopButton() {
    const cities =[
        {
        id:1,
        title: 'London'
    },
    {
        id:2,
        title: 'Sydney'
    },
    {
        id:3,
        title: 'Tokyo'
    },
    {
        id:4,
        title: 'Paris'
    },
    {
        id:5,
        title: 'New York'
    }
]
  return (
    <div className="flex justify-around my-6">
        {cities.map( city => (
            <button key={city.id}className="text-white text-lg font-medium">{city.title}</button>
        ) )}
    </div>
  )
}

export default TopButton;