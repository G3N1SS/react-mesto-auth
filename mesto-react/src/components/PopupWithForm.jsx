export default function PopupWithForm({name, title, titleBtn, children, isOpen, onClose}){
    return(
    <div className={`popup popup_type_opened-${name} ${isOpen && 'popup_opened'}`}>
        <div className="popup__box">
        <button className="popup__close popup__close_profile" type="button" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form popup__form_profile" name={name}>
            {children}
            <button className="popup__save" type="submit">{titleBtn || 'Сохранить'}</button>
        </form>
        </div>
    </div>
    )
}