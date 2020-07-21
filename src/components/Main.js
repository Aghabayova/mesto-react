import React from 'react';
import api from '../utils/Api.js';
import avatar from '../images/avatar.jpg';


function Main(props) {
const [userName, setUserName] = React.useState('Darth Vader');
const [userDescription, setUserDescription] = React.useState('‎Dark Lord');
const [userAvatar, setUserAvatar] = React.useState(avatar);
  return (
    
        <main>
            <section className="profile">
                <div className="profile__box">
                    <img className="profile__avatar" src="#" alt="аватар"/>
                    <img className="profile__pencil" onClick={props.onEditAvatar} src="./images/pencil.svg" alt="Редактировать"/>
                </div>
                <div className="profile__info">
                    <div>
                        <h1 className="profile__name" data-id="">Жак Ив Кусто</h1>
                        <p className="profile__description"></p>
                    </div>
                    <button className="profile__edit-button" onClick={props.onEditProfile} type="button"></button>
                </div>
                <button className="add-button" onClick={props.onAddPlace} type="button"></button>
            </section>
            <section className="cards">
                <template id="cards-template">
                    <div className="card">
                        <img className="card__image" src="#" alt="Изображение"/>
                        <div className="card__description">
                            <h3 className="card__title"></h3>
                            <div className="card__like">
                                <button className="card__like-btn" type="button"></button>
                                <span className="card__like-counter"></span>
                            </div>
                        </div>
                        <button className="card__trash" type="button"></button>
                    </div>
                </template>
            </section>


            <section className="popup" id="view-image">
                <figure className="popup__view">
                    <button className="popup__close" id="close-view" type="button">+</button>
                    <img className="popup__image" alt="изображение места" src="#"/>
                    <figcaption className="popup__caption"></figcaption>
                </figure>
            </section>

        </main>
     
  );
}

export default Main;
