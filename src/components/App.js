import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup';
import PopupWithForm from './PopupWithForm';
import EditAvatarPopup from './EditAvatarPopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    name: '',
    link: ''
  });


  React.useEffect(() => {

    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        /*setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);*/
        setCards(cards);
        setCurrentUser(userData);

      })
      .catch(err => console.log(err));

  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
  }
  function handleCardClick(props) {
    setSelectedCard({
      isOpen: true,
      name: props.name,
      link: props.link
    });
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api.editUserInfo(userData)
      .then((res) => {
        setCurrentUser({ ...currentUser, name: res.name, about: res.about });
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }
  function handleUpdateAvatar(userdata) {
    setIsLoading(true);
    api.editUserAvatar(userdata)
      .then((res) => {
        setCurrentUser({ ...currentUser, avatar: res.avatar });
        closeAllPopups();
      })
  }

  //обработчик сабмит добавления карточки
  function handleCardSubmit(data) {
    setIsLoading(true);
    api.postNewCard(data)
      .then((newCard) => {
        setCards([...cards, newCard]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    });
  }
  function handleCardDelete(card) {

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(card._id).then(() => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.filter((c) => c._id !== card._id);
      // Обновляем стейт
      setCards(newCards);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}


        />
        <PopupWithForm heading="Вы уверены?" button="Да" />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />

        <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} heading="Новое место" buttonText="Создать">
          <input
            className="popup__field popup__field_card"
            id="title-input"
            placeholder="Название"
            type="text"
            name="name"
            required
            minLength="1"
            maxLength="30" />
          <span className="popup__span-error" id="title-input-error"></span>
          <input
            className="popup__field popup__field_link"
            id="url-input" placeholder="Ссылка на картинку"
            type="url"
            required name="link" />
          <span className="popup__span-error" id="url-input-error"></span>
        </PopupWithForm >
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Footer />

      </div>
    </CurrentUserContext.Provider >

  );
}
export default App;
