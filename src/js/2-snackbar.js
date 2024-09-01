// Додавання бібліотеки iziToast
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const notificationForm = document.querySelector('form');
const inputNumber = document.querySelector('input[type="number"]');
const radioBtn = notificationForm.elements.state;

notificationForm.addEventListener('submit', onClick);

function onClick(event) {
  event.preventDefault();
  const delay = inputNumber.value;
  const selectionResult = radioBtn.value;

  function selectedRadioButton(delay) {
    // Створення та повернення промісу
    return new Promise((resolve, reject) => {
      // Asynchronous operation
      setTimeout(() => {
        if (selectionResult === 'fulfilled') {
          resolve(`${delay}`);
        } else {
          reject(`${delay}`);
        }
      }, delay);
    });
  }

  // Виклик функції промісу
  selectedRadioButton(delay)
    .then(value => {
      // Ініціаналізація бібліотеки iziToast
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        transitionIn: 'bounceInDown',
        theme: 'dark',
        messageColor: '#ffffff',
        color: '#59A10D',
        progressBar: false,
        position: 'topRight',
      });
    })
    .catch(error => {
      // Ініціаналізація бібліотеки iziToast
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        transitionIn: 'bounceInDown',
        theme: 'dark',
        messageColor: '#ffffff',
        color: '#ef4040',
        progressBar: false,
        position: 'topRight',
      });
    });
}