import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    name: '',
    link: ''
  });

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
    //setDataImage({});
  }
  function handleCardClick(props) {
    setSelectedCard({
      isOpen: true,
      name: props.name,
      link: props.link
    });
  }

  return (

    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <PopupWithForm heading="Вы уверены?" button="Да" />

      <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} heading="Обновить аватар?" button="Сохранить">
        <input className="popup__field popup__field_avatar" id="url-input" placeholder="Ссылка на картинку"
          type="url" name="link" required />
        <span className="popup__span-error" id="url-input-error"></span>
      </PopupWithForm>

      <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} heading="Редактировать профиль" button="Сохранить" >
        <input className="popup__field popup__field_name" id="name-field" placeholder="Имя" type="text"
          name="name" required pattern="[A-Za-zА-Яа-яЁё -]*" minlength="2" maxlength="40" />
        <span className="popup__span-error" id="name-field-error"></span>
        <input className="popup__field popup__field_job" id="job-field" placeholder="О себе" type="text"
          name="about" required minlength="2" maxlength="200" />
        <span className="popup__span-error" id="job-field-error"></span>
      </PopupWithForm >

      <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} heading="Новое место" button="Создать">
        <input className="popup__field popup__field_card" id="title-input" placeholder="Название"
          type="text" name="name" required minlength="1" maxlength="30" />
        <span className="popup__span-error" id="title-input-error"></span>
        <input className="popup__field popup__field_link" id="url-input" placeholder="Ссылка на картинку"
          type="url" required name="link" />
        <span className="popup__span-error" id="url-input-error"></span>
      </PopupWithForm >
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <Footer />



    </div>
  );
}

export default App;
