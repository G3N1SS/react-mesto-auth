import { useContext } from 'react'
import SendContext from '../contexts/SendContext'

export default function Input({ name, type, placeholder, minLength, maxLength, isInputValid, value, onChange, error }) {
  const isSend = useContext(SendContext)

  return (
    <>
      {name === 'password' || name === 'email' ?
        <>
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            minLength={minLength}
            maxLength={maxLength}
            required
            className={`login__input ${isInputValid === undefined || isInputValid ? '' : 'login__input_invalid'}`}
            value={value || ''}
            onChange={onChange}
            disabled={isSend}
          />
          <span className={'login__error error'}>{error}</span>
        </>
        :
        <>
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            minLength={minLength}
            maxLength={maxLength}
            required
            className={`popup__input ${isInputValid === undefined || isInputValid ? '' : 'popup__input_state_invalid'}`}
            value={value}
            onChange={onChange}
            disabled={isSend}
          />
          <span id={`${name}-error`} className={'error'}>{error}</span>
        </>
      }
    </>
  )
}