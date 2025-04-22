

export const enableValidation = (validationConfig) => {

    const formList = Array.from(document.querySelectorAll(`${validationConfig.formSelector}`))
    formList.forEach((formElement) => {
      setEventListeners(formElement, validationConfig);
    })
  }

  export const removeValidation = (validationConfig) => {
    const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
    forms.forEach((formElement) => {
      const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
      const errorElements = formElement.querySelectorAll(`.${validationConfig.errorClass}`);
      // Убираем класс ошибки у всех инпутов
      inputList.forEach((inputElement) => {
        inputElement.classList.remove(validationConfig.inputErrorClass);
      });
  
      // Очищаем сообщения об ошибках
      errorElements.forEach((errorElement) => {
        errorElement.textContent = '';
        errorElement.classList.remove(validationConfig.errorClass);
      });
    });
  };

  function setEventListeners(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(`${validationConfig.inputSelector}`))
    const buttonElement = formElement.querySelector(`${validationConfig.submitButtonSelector}`);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        isValid(formElement, inputElement, validationConfig);
        toggleButtonState(inputList, buttonElement);
      })
    })
    toggleButtonState(inputList, buttonElement);
  }

// Функция получает форму и инпут-элемент, проверяет его на валидность
function isValid(formElement, inputElement, validationConfig) {
    if (!inputElement.validity.valid) {
        let errorMessage = '';
        
        if (inputElement.validity.valueMissing) {
          errorMessage = 'Вы пропустили это поле.';
        } else if (inputElement.validity.typeMismatch) {
          errorMessage = 'Введите адрес сайта.';
        } else if (inputElement.validity.tooShort) {
          const currentLength = inputElement.value.length;
          errorMessage = `Минимальное количество символов: ${inputElement.minLength}. Длина текста сейчас: ${currentLength} символ${currentLength === 1 ? '' : 'а'}.`;
        }
        showInputError(formElement, inputElement, errorMessage, validationConfig)
      } else {
        hideInputError(formElement, inputElement, validationConfig)
      }
  }
// Стилизация невалидного поля
function showInputError(formElement, inputElement, errorMessage, validationConfig) {
    const errorElement = formElement.querySelector(`[name="${inputElement.name}-error"]`); // выбираем span ошибки для своего инпута
    inputElement.classList.add(`${validationConfig.inputErrorClass}`); // подсвечивает сам инпут
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${validationConfig.errorClass}`);
  }
  
  // Снятие стилей невалидного поля
  function hideInputError(formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`[name="${inputElement.name}-error"]`);
    inputElement.classList.remove(`${validationConfig.inputErrorClass}`); // убираем подсветку с инпута
    errorElement.textContent = '';
    errorElement.classList.remove(`${validationConfig.errorClass}`);
  }
// Блокировка кнопки
export function toggleButtonState(inputList, button) {
    if (InvalidInput(inputList)) {
      button.disabled = true;
      button.classList.add('popup__button_disabled');
    } else {
      button.disabled = false;
      button.classList.remove('popup__button_disabled');
    }
  }

function InvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }
  