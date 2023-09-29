import './Header.jsx'
import Header from './Header.jsx'
import Main from './Main.jsx'
import Footer from './Footer.jsx'
import PopupWithForm from './PopupWithForm.jsx'
import PopupImage from './PopupImage.jsx'
import { useCallback, useEffect, useState } from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext.jsx'
import api from '../utils/api.js'
import EditProfilePopup from './EditProfilePopup.jsx'
import EditAvatarPopup from './EditAvatarPopup.jsx'
import AddPlacePopup from './AddPlacePopup.jsx'

function App() {
  //states
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isButtonLoading, setIsButtonLoading] = useState(false)
  //context
  const [currnetUser, setCurrentUser] = useState([])
  //cards
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoadingCards] = useState(true)

  const [deleteCardId, setDeleteCardId] = useState('')

  const setAllStatesForClosePopups = () => {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setImagePopup(false)
    setDeletePopupOpen(false)
  }

  const closePopupByEsc = useCallback((evt) => {
    if (evt.key === 'Escape') {
      setAllStatesForClosePopups()
      document.removeEventListener('keydown', closePopupByEsc)
    }
  }, [setAllStatesForClosePopups])

  const closeAllPopups = useCallback(() => {
    setAllStatesForClosePopups()
    document.removeEventListener('keydown', closePopupByEsc)
  }, [setAllStatesForClosePopups, closePopupByEsc])

  function setEventListenerForDocument(){
    document.addEventListener('keydown', closePopupByEsc)
  }

  // function closeAllPopups(){
  //   setIsEditAvatarPopupOpen(false)
  //   setIsEditProfilePopupOpen(false)
  //   setIsAddPlacePopupOpen(false)
  //   setImagePopup(false)
  //   setDeletePopupOpen(false)
  // }

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true)
    setEventListenerForDocument()
  }

  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true)
    setEventListenerForDocument()
  }

  function handleEditPlaceClick(){
    setIsAddPlacePopupOpen(true)
    setEventListenerForDocument()
  }

  function handleCardClick(card){
    setSelectedCard(card);
    setImagePopup(true)
    setEventListenerForDocument()
  }

  function handleDeletePopupClick(cardId){
    setDeleteCardId(cardId)
    setDeletePopupOpen(true)
    setEventListenerForDocument()
  }
  
  useEffect(() =>{
    setIsLoadingCards(true)
    Promise.all([api.getInfo(), api.getCards()])
      .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser)
        setCards(dataCards)
        console.log(dataCards)
        setIsLoadingCards(false)
      })
      .catch((err) => {
        setIsLoadingCards(false)
        console.error(`Ошибка при создании начальных элементов страницы ${err}`)
      })
  }, []);

  function handleDeleteCard(evt){
    evt.preventDefault()
    setIsButtonLoading(true)
    api.deleteCard(deleteCardId)
      .then(() => {
        setCards(cards.filter((item) => {
          return item._id !== deleteCardId
        }))
        closeAllPopups()
        setIsButtonLoading(false)
      })
      .catch((err) => {
        setIsButtonLoading(false)
        console.error(`Ошибка при удалении карточки ${err}`)
      })
  }

  function handleUpdateUser(dataUser, resetInputValues){
    setIsButtonLoading(true);
    api.setUserInfo(dataUser)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        resetInputValues()
        setIsButtonLoading(false);
      })
      .catch((err) => {
        setIsButtonLoading(false)
        console.error(`Ошибка при редактирования профиля ${err}`)
      })
  }

  function handleUpdateAvatar(dataUser, resetInputValues){
    setIsButtonLoading(true);
    api.setNewAvatar(dataUser)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        resetInputValues()
        setIsButtonLoading(false);
      })
      .catch((err) => {
        setIsButtonLoading(false);
        console.error(`Ошибка при редактирования аватара ${err}`)
    })
  }

  function handleAddCard(dataCard, resetInputValues){
    setIsButtonLoading(true)
    api.addCard(dataCard)
      .then(res => {
        setCards([res, ...cards])
        closeAllPopups()
        resetInputValues()
        setIsButtonLoading(false);
      })
      .catch((err) => {
        setIsButtonLoading(false)
        console.error(`Ошибка при добавлении карточки ${err}`)
      })
  }

  return (
  <>
  <CurrentUserContext.Provider value={currnetUser}>
  <div className="page">
    <Header/>
    <Main
      onEditProfile = {handleEditProfileClick}
      onEditAvatar={handleEditAvatarClick}
      onAddPlace={handleEditPlaceClick}
      onCardClick={handleCardClick}
      onDelete={handleDeletePopupClick}
      cards={cards}
      isLoadingCards = {isLoading}
    />
    <Footer/>

    <EditProfilePopup
      onUpdateUser = {handleUpdateUser}
      isOpen = {isEditProfilePopupOpen}
      onClose ={closeAllPopups}
      isButtonLoading = {isButtonLoading}
    />

    <AddPlacePopup
      onAddPlace={handleAddCard}
      isOpen ={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      isButtonLoading={isButtonLoading}
    />

    <EditAvatarPopup
      onUpdateAvatar={handleUpdateAvatar}      
      isOpen ={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      isButtonLoading={isButtonLoading}
    />

    <PopupWithForm 
      name='delete'
      title='Вы уверены?'
      titleBtn='Да'
      isOpen={isDeletePopupOpen}
      onClose ={closeAllPopups}
      onSubmit={handleDeleteCard}
      isButtonLoading={isButtonLoading}
    />

    <PopupImage  card={selectedCard} isOpen={isImagePopupOpen} onClose = {closeAllPopups}/>

  </div>
  </CurrentUserContext.Provider>
  </>
  )
}

export default App
