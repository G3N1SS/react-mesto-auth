export default function Card({card, onCardClick}){
  return (
    <div className="elements__card">
      <img className="elements__image" alt={`Место: ${card.name}`} src={card.link} onClick={() => ()=>{onCardClick({link: card.link, name: card.name})}}/>
      <button className="elements__delete-button"></button>
      <div className="elements__banner">
        <h2 className="elements__name">{card.name}</h2>
        <div className="elements__like">
          <button className="elements__like-button" type="button"></button>
          <p className="elements__like-count">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}