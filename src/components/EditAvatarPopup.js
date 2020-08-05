import React from 'react';
import PopupWithForm from './PopupWithForm';



function EditAvatarPopup(props) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value/* Значение инпута, полученное с помощью рефа */,
        });
    }

    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onUpdateAvatar={handleSubmit}  heading="Обновить аватар?" buttonText="Сохранить">
            <input
                className="popup__field popup__field_avatar"
                ref={avatarRef}
                id="url-input"
                placeholder="Ссылка на картинку"
                type="url"
                name="link"
                required />
            <span className="popup__span-error" id="url-input-error"></span>
        </PopupWithForm>

    )
}
export default EditAvatarPopup