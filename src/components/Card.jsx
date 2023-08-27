import React from 'react'

const Card = (props) => {
  return (
    <div>
      <div className="card-main">
        <div className="card-grid">
          <h3 className="card-header">{props.name}</h3>
        </div>
        <img
          src={props.imageURL}
          className="card-image"
        />
        <div className="card-description">{props.description}</div>
      </div>
    </div>
  )
}

export default Card
