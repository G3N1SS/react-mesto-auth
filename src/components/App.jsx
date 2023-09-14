import './Header.jsx'
import Header from './Header.jsx'
import Main from './Main.jsx'
import Footer from './Footer.jsx'
import PopupWithForm from './PopupWithForm.jsx'
import PopupImage from './PopupImage.jsx'
import { useState } from 'react'

function App() {
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setImagePopup] = useState(false);

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setImagePopup(false)
  }

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true)
  }

  function handleEditPlaceClick(){
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card){
    setSelectedCard(card);
    setImagePopup(true)
  }

  return (
  <>
  <div className="page">
    <Header/>
    <Main
      onEditProfile = {handleEditProfileClick}
      onEditAvatar={handleEditAvatarClick}
      onAddPlace={handleEditPlaceClick}
      onCardClick={handleCardClick}
    />
    <Footer/>

    <PopupWithForm 
      name='profile'
      title='Редактировать профиль'
      isOpen = {isEditProfilePopupOpen}
      onClose ={closeAllPopups}
    >
      <input 
        className="popup__input popup__input_type_name" 
        type="text" name="name" 
        required 
        minLength={2} 
        maxLength={40} 
        placeholder='Введите Имя'
      />
      <span id="name-error" className="error"/>
      <input 
        className="popup__input popup__input_type_job" 
        type="text" 
        name="job" 
        required 
        minLength={2} 
        maxLength={200} 
        placeholder='О себе'
      />
      <span id="job-error" className="error"/>
    </PopupWithForm>

    <PopupWithForm 
      name='add'
      title='Добавить mesto'
      titleBtn='Создать'
      isOpen={isAddPlacePopupOpen}
      onClose ={closeAllPopups}
    >
      <input 
        className="popup__input popup__input_type_place" 
        type="text" name="inputPlace" 
        placeholder="Название"
        required 
        minLength={2}
      />
      <span id="inputPlace-error" className="error"/>
      <input 
        className="popup__input popup__input_type_image" 
        name="inputImage"
        placeholder="Ссылка на картинку" 
        required 
        minLength={2} 
        type="url"
      />
      <span id="inputImage-error" className="error"/>
    </PopupWithForm>

    <PopupWithForm 
      name='avatar'
      title='Обновить аватар'
      isOpen={isEditAvatarPopupOpen}
      onClose ={closeAllPopups}
    >
      <input 
        className="popup__input popup__input_type_avatar" 
        type="url" 
        name="inputAvatar" 
        placeholder="Ссылка на аватар"
        required 
        minLength="2"
      />
      <span id="inputAvatar-error" className="error"/>
    </PopupWithForm>

    <PopupWithForm 
      name='delete'
      title='Вы уверены?'
      titleBtn='Да'
    />

    <PopupImage  card={selectedCard} isOpen={isImagePopupOpen} onClose = {closeAllPopups}/>

  </div>
  </>
  )
}

export default App
