import { useEffect, useState } from "react"
import api from "../utils/api.js"
import Card from "./Card.jsx"

export default function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}){

  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [cards, setCards] = useState([])

  useEffect(() =>{
    Promise.all([api.getInfo(), api.getCards()])
      .then(([dataUser, dataCards]) => {
        setUserName(dataUser.name);
        setUserDescription(dataUser.about);
        setUserAvatar(dataUser.avatar);
        dataCards.forEach(dataEl => dataEl.myid = dataUser._id)
        setCards(dataCards)
      })
  }, []);

  return(
    <main>
      <section className="profile">
        <div className="profile__info">
          <img className="profile__avatar-image" alt="Аватар" src={userAvatar}/>
          <button className="profile__avatar-button" onClick={onEditAvatar}></button>
          <div className="profile__banner">
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__job">{userDescription}</p>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          </div>
          <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
        </div>
      </section>
      <section className="elements">
        <div>
          <div className="element">
            {cards.map(data => {
                return (
                <div className="elements__card" key={data._id}>
                  <Card card={data} onCardClick={onCardClick}/>
                </div>
                )
            })}
          </div>
        </div>
      </section>
    </main>
    )
}