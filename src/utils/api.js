class Api {
    constructor(config){
        this._url = config.url;
        this._headers = config.headers;
        this._authorization = config.headers.authorization;
    }

    _checkResponse(res) {return res.ok ? res.json() : Promise.reject(res.status)}

    getInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._authorization
            }
        })
        .then(this._checkResponse)
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._authorization
            }
        })
        .then(this._checkResponse)
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
        .then(this._checkResponse)
    }

    setNewAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.inputAvatar
            })
        })
        .then(this._checkResponse)
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
        .then(this._checkResponse)
    }

    putLike(cardId){
        return fetch(`${this._url}/cards/${cardId}/likes`,{
            method: 'PUT',
            headers: {
                authorization: this._authorization
            }
        })
        .then(this._checkResponse)
    }

    removeLike(cardId){
        return fetch(`${this._url}/cards/${cardId}/likes`,{
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
        })
        .then(this._checkResponse)
    }

    deleteCard(cardId){
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization:this._authorization
            }
        })
        .then(this._checkResponse)
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
