import React from 'react'
const noteObj = [
    {
        "id": 1,
        "name": "Item 1",
        "details": [
          { "info": "Detail 1-1" },
          { "info": "Detail 1-2" }
        ]
      }
]


const Objects = () => {
  return (
    <div>
          <div>
      {noteObj.map((item, index) => (
        <div key={index}>
          <h2>{item.name}</h2>
          <ul>
            {item.details.map((detail, detailIndex) => (
              <li key={detailIndex}>{detail.info}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </div>
  )
}

export default Objects
