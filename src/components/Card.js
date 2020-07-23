import React from 'react';

function Card(props) {
    function handleClick() {
        props.onClick(props.card)
    }
    return (
        <div className="card" key={props.card._id}>
            <img className="card__image" onClick={handleClick} src={props.card.link} alt={props.card.name} />
            <div className="card__description">
                <h3 className="card__title">{props.card.name}</h3>
                <div className="card__like">
                    <button className="card__like-btn" type="button"></button>
                    <span className="card__like-counter">{props.card.likes.length}</span>
                </div>
            </div>
            <button className="card__trash" type="button"></button>
        </div>
    );
}
export default Card;