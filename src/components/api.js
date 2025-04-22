// Определяем конфигурацию для API-запросов
const config = {
    baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
    headers: {
      authorization: 'd9b35b8e-586c-4a1d-b2e2-06c1dae64849',
      'Content-Type': 'application/json'
    }
}
// Обработка ответов
const getResponseData = (res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}
// Получение user
export function getUser() {
    return fetch('https://nomoreparties.co/v1/apf-cohort-202/users/me', {
      headers: config.headers
    })
      .then(getResponseData)
  }
// Получение карточек
export function getCards(){
  return fetch('https://nomoreparties.co/v1/apf-cohort-202/cards', {
    headers: config.headers
  })
    .then(getResponseData)
}
// Редактирование профиля
export function editProfile(name, about) {
  return fetch('https://nomoreparties.co/v1/apf-cohort-202/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${about}`
    })
  })
    .then(getResponseData)
}
// Добавление новой карточки
export function addCard(name, link){
  return fetch('https://nomoreparties.co/v1/apf-cohort-202/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      link: `${link}`
    })
  })
    .then(getResponseData)
}

// Удаление карточки
export function deleteCard(cardId){
  return fetch(`https://nomoreparties.co/v1/apf-cohort-202/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  })
    .then(getResponseData)
}

// Поставить лайк
export function likeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/apf-cohort-202/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(getResponseData)
}
// Удалить лайк
export function deleteLike(cardId) {
  return fetch(`https://nomoreparties.co/v1/apf-cohort-202/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(getResponseData)
}

// Обновление аватара
export function updateAvatar(avatarLink){
  return fetch('https://nomoreparties.co/v1/apf-cohort-202/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${avatarLink}`
    })
  })
    .then(getResponseData)
}