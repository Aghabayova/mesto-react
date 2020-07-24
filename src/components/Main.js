import React from 'react';
import api from '../utils/Api.js';
import Card from './Card';
import pen from '../images/pencil.svg';
import avatar from '../images/avatar1.jpg';

function Main(props) {
    const [userName, setUserName] = React.useState('Darth Vader');
    const [userDescription, setUserDescription] = React.useState('Lord of universe‎');
    const [userAvatar, setUserAvatar] = React.useState(avatar);
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {

        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, initialCards]) => {
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);
                setCards([...initialCards]);
            })
            .catch(err => console.log(err));

    }, []);
    return (

        <main className="content">
            <section className="profile">
                <div className="profile__box">
                    <img className="profile__avatar" src={userAvatar} alt="аватар" />
                    <img className="profile__pencil" onClick={props.onEditAvatar} src={pen} alt="Редактировать" />
                </div>
                <div className="profile__info">
                    <div>
                        <h1 className="profile__name" data-id="">{userName}</h1>
                        <p className="profile__description">{userDescription}</p>
                    </div>
                    <button className="profile__edit-button" onClick={props.onEditProfile} type="button"/>
                </div>
                <button className="add-button" onClick={props.onAddPlace} type="button"/>
            </section>

            <section className="cards">
                {cards.map(item => <Card key={item._id} card={item} onClick={props.onCardClick} />)}
            </section>
        </main>

    );
}
export default Main;
