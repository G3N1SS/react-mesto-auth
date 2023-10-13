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
import StartPage from './StartPage.jsx'
import { Route, Routes, Link, useNavigate, Navigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import Register from './Register.jsx'
import Login from './Login.jsx'
import PageNotFound from './PageNotFound.jsx'
import SendContext from '../contexts/SendContext.jsx'
import InfoTooltip from './InfoToolTip.jsx'
import { authorization, getUserData, registration } from '../utils/auth.js'
import ProtectedRoute from './ProtectedRoute.jsx'

function App() {
  const navigate = useNavigate()
  //states for popups
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isButtonLoading, setIsButtonLoading] = useState(false)
  const [isResultPopupOpen, setIsResultPopupOpen] = useState(false)
  const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isDeletePopupOpen || isImagePopupOpen || isResultPopupOpen
  //context states
  const [currnetUser, setCurrentUser] = useState([])
  const [userEmail, setUserEmail] = useState('')
  //cards states
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoadingCards] = useState(true)
  const [deleteCardId, setDeleteCardId] = useState('')
  //login & registrations states
  const [loggedIn, setLoggedIn] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [isCheckToken, setIsCheckToken] = useState(true)

  const [register,setRegister] = useState(true)

  const registerLoginChange = useCallback(() => {
    register ? setRegister(false) : setRegister(true)
  }, [register])

  function handleLogin(password,email){
    setIsButtonLoading(true)
    authorization(password,email)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        window.scrollTo(0, 0)
        navigate('/')
      })
      .catch(err => {
        setIsResultPopupOpen(true)
        setIsSuccessful(false)
        console.error(`Ошибка при авторизации ${err}`)
      })
      .finally(() => setIsButtonLoading(false))
  }

  function handleRegister(password,email){
    setIsButtonLoading(true)
    registration(password,email)
      .then(() => {
        setIsResultPopupOpen(true)
        setIsSuccessful(true)
        window.scrollTo(0, 0)
        navigate('/sign-in')
      })
      .catch(err => {
        setIsResultPopupOpen(true)
        setIsSuccessful(false)
        console.error(`Ошибка при регистрации ${err}`)
      })
      .finally(() => setIsButtonLoading(false))
  }

  const setAllStatesForClosePopups = () => {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setImagePopup(false)
    setDeletePopupOpen(false)
    setIsResultPopupOpen(false)
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
  
  useEffect(() => {
    if(localStorage.jwt){
      getUserData(localStorage.jwt)
        .then(res => {
          setUserEmail(res.data.email)
          setLoggedIn(true)
          setIsCheckToken(false)
        })
        .catch(e => console.error(`Ошибка при авторизации ${e}`))
    } else{
      setLoggedIn(false)
      setIsCheckToken(false)
    }
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) {
      setIsLoadingCards(true)
      Promise.all([api.getInfo(), api.getCards()])
        .then(([userEmail, dataCards]) => {
          setCurrentUser(userEmail)
          setCards(dataCards)
          setIsLoadingCards(false)
        })
        .catch(e => console.error(`Ошибка при загрузке начальных данных ${e}`))
    }
  }, [loggedIn])

  useEffect(() => {
    function closePopupByEsc(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups()
      }
    }
    if(isOpen){
      document.addEventListener('keydown', closePopupByEsc)
      return() => {
        document.removeEventListener('keydown', closePopupByEsc)
      }
    }
  }, [isOpen, closeAllPopups])

  return (
  <>
  <CurrentUserContext.Provider value={currnetUser}>
  <div className="page">

    <Header
      loggedIn={loggedIn}
      titleButtonChange={registerLoginChange}
      register={register}
      userEmail={'someEmail@mail.ru'}
    />
    <SendContext.Provider value={isButtonLoading}>
    <Routes>
      <Route path='/' 
        element={<ProtectedRoute
            element={Main}
            name={'main'}
            onEditProfile = {handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleEditPlaceClick}
            onCardClick={handleCardClick}
            onDelete={handleDeletePopupClick}
            cards={cards}
            isLoadingCards = {isLoading}
            isLoadingProfile = {isLoading}
            loggedIn={loggedIn}
       />}/>
        <Route path='/sign-up' element={
          <Register
            name={'sign-up'}
            handleRegister={handleRegister}
          />}
          />
        <Route path='/sign-in' element={
          loggedIn ? <Navigate to={'/'} /> :
        <Login
          name={'sign-in'}
          handleLogin={handleLogin}
        />} />
        <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    </SendContext.Provider>

    <Footer/>

  <SendContext.Provider value={isButtonLoading}>
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
    </SendContext.Provider>

    <PopupImage  card={selectedCard} isOpen={isImagePopupOpen} onClose = {closeAllPopups}/>

    <InfoTooltip
      name='result'
      isSuccessful={isSuccessful}
      isOpen={isResultPopupOpen}
      onClose={closeAllPopups}
    />

  </div>
  </CurrentUserContext.Provider>
  </>
  )
}

export default App
