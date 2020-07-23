import React from 'react';

function Card(props) {
    function handleClick() {
        props.onClick(props.card)
    }
    const imageStyle = {
        backgroundImage: 'url(' + props.card.link + ')',
      };
    return (
        <div className="card" key={props.card._id}>
            <div className="card__image" onClick={handleClick} style={imageStyle} />
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