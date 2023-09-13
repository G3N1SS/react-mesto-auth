class Api {
    constructor(config){
        this._url = config.url;
        this._headers = config.headers;
        this._authorization = config.headers.authorization;
    }

    _checkResponce(res) {return res.ok ? res.json() : Promise.reject}

    getInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._authorization
            }
        })
        .then(this._checkResponce)
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._authorization
            }
        })
        .then(this._checkResponce)
    }

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.job
            })
        })
        .then(this._checkResponce)
    }

    setNewAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.inputAvatar
            })
        })
        .then(this._checkResponce)
    }

    addCard(data) {
        return fetch(`${this._url}/cards`,{
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.inputPlace,
                link: data.inputImage
            })
        })
        .then(this._checkResponce)
    }

    putLike(cardId){
        return fetch(`${this._url}/cards/${cardId}/likes`,{
            method: 'PUT',
            headers: {
                authorization: this._authorization
            }
        })
        .then(this._checkResponce)
    }

    removeLike(cardId){
        return fetch(`${this._url}/cards/${cardId}/likes`,{
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
        })
        .then(this._checkResponce)
    }

    deleteCard(cardId){
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization:this._authorization
            }
        })
        .then(this._checkResponce)
    }
}

const configApi = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-73',
    headers: {
      authorization: '45573968-5048-42c7-ac90-3ae0a9a860f3',
      "Content-Type": "application/json"
    }
  }
  
const api = new Api(configApi);

export default api
