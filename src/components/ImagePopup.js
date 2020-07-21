import React from 'react';


function ImagePopup(props) {
    return (
        <section className={(props.isOpen ? "popup popup_opened" : "popup")} id="view-image">
            <figure className="popup__view">
                <button className="popup__close" id="close-view" type="button">+</button>
                <img className="popup__image" alt="изображение места" src="#" />
                <figcaption className="popup__caption"></figcaption>
            </figure>
        </section>
    );
}

export default ImagePopup;


