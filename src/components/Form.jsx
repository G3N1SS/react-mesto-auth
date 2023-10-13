import { useContext  } from "react";


export default function Form({ name, titleButton, children, isValid, onSubmit }) {
  // const isSend = useContext(SendContext)

  return(
    <form onSubmit={onSubmit}>
      {children}
      {name === 'sign-in' || name === 'sign-up' ? 
      <button className='login__submit'>
        {titleButton}
      </button>
       : 
      <button className='popup__save'>
        {titleButton}
      </button>
      }
    </form>
  )
}