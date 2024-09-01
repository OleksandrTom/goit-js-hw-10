// Додавання бібліотеки flatpickr
// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Додавання бібліотеки iziToast
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dayScoreboard = document.querySelector('[data-days]');
const hourScoreboard = document.querySelector('[data-hours]');
const minuteScoreboard = document.querySelector('[data-minutes]');
const secondScoreboard = document.querySelector('[data-seconds]');

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > options.defaultDate) {
      // Розблокування кнопки Start при обранні валідної дати
      startBtn.addEventListener('click', startTimer);
      startBtn.classList.add('is-active-btn');
    } else {
      startBtn.removeEventListener('click', startTimer);
      startBtn.classList.remove('is-active-btn');

      // Ініціаналізація бібліотеки iziToast
      iziToast.error({
        position: 'bottomLeft',
        message: 'Please choose a date in the future',
      });
    }
    userSelectedDate = selectedDates[0];
  },
};

// Ініціалізація бібліотеки flatpickr на елементі input
flatpickr('#datetime-picker', options);

// Функція старту відліку часу
function startTimer(event) {
  // Блокування кнопки Start при старті відліку часу на таймері
  startBtn.removeEventListener('click', startTimer);
  startBtn.classList.remove('is-active-btn');
  // Блокування елементу input при старті відліку часу на таймері
  input.disabled = true;
  const intervalTime = setInterval(convertMs, 1000);
}

// Функція підрахунку значень
function convertMs() {
  if (Date.now() < userSelectedDate) {
    const ms = userSelectedDate - Date.now();

    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    addLeadingZero(days, hours, minutes, seconds);
  } else {
    // Розблокування елементу input по спливу часу на таймері
    input.disabled = false;
  }
}

// Форматування залишку часу до двох знаків
function addLeadingZero(days, hours, minutes, seconds) {
  dayScoreboard.textContent = String(days).padStart(2, '0');
  hourScoreboard.textContent = String(hours).padStart(2, '0');
  minuteScoreboard.textContent = String(minutes).padStart(2, '0');
  secondScoreboard.textContent = String(seconds).padStart(2, '0');
}