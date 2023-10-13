import { useCallback, useState } from 'react'
import Vector from '../images/Vector.svg'
import { Link, Route, Routes } from 'react-router-dom'

export default function Header({loggedIn, titleButtonChange, register, userEmail, onSignOut}){

  return(
    <header className="header">
      <img className="header__logo" alt="Место" src={Vector}/>
      <Routes>
        <Route path='/sign-in' element={<Link to={`/sign-up`} className='header__button-register'>Регистрация</Link>}>     
        </Route>
        <Route path='/sign-up' element={<Link to={`/sign-in`} className='header__button-register'>Войти</Link>}>      
        </Route>
        <Route path='/' element={
          <div className='header__container'>
            <p className='header__email'>{userEmail}</p>
            <Link to="/sign-in" className="header__exit" onClick={onSignOut}>
              Выйти
            </Link>
          </div>}>
        </Route>
      </Routes>
    </header>
  )
}

