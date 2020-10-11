import React from 'react'
import "./Card.css"
function Card({img, title, description}) {
    return (
        <div className="card">
            <div className="card__row">
                <div className="card__column">
                    <div className="card__card">
                        <img className="card__image" src={img}/>
                        <div className="card__body">
                            <h4 className="card__title">{title}</h4>
                            <p className="card__description">{description}</p>
                            <div className="card__button">Ver en Maps</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
