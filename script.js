let balance = 0;
let level = 1;
let nextLevelBalance = 10;
let profitPerHour = 5;  // Прибыль в час фиксированная

const balanceEl = document.getElementById('balance');
const profitPerHourEl = document.getElementById('profitPerHour');
const progressEl = document.getElementById('progress');
const levelEl = document.getElementById('level');
const nextLevelBalanceEl = document.getElementById('next-level-balance');
const sprite = document.getElementById('click-sprite');

// Функция для сохранения данных в localStorage
function saveGame() {
    localStorage.setItem('balance', balance);
    localStorage.setItem('level', level);
    localStorage.setItem('nextLevelBalance', nextLevelBalance);
}

// Функция для загрузки данных из localStorage
function loadGame() {
    const savedBalance = localStorage.getItem('balance');
    const savedLevel = localStorage.getItem('level');
    const savedNextLevelBalance = localStorage.getItem('nextLevelBalance');

    if (savedBalance !== null) balance = parseFloat(savedBalance);
    if (savedLevel !== null) level = parseInt(savedLevel, 10);
    if (savedNextLevelBalance !== null) nextLevelBalance = parseInt(savedNextLevelBalance, 10);

    updateUI();
}

// Функция обновления UI
function updateUI() {
    balanceEl.textContent = balance.toFixed(2);  // Форматируем до 2 знаков после запятой
    profitPerHourEl.textContent = profitPerHour;
    levelEl.textContent = level;
    nextLevelBalanceEl.textContent = nextLevelBalance;
    progressEl.style.width = (balance / nextLevelBalance) * 100 + '%';
}

// Обработка клика по спрайту
sprite.addEventListener('click', () => {
    balance += 1;
    
    // Если баланс достигает следующего уровня
    if (balance >= nextLevelBalance) {
        level++;
        balance = 0;
        nextLevelBalance = level * 10;
    }

    saveGame();  // Сохраняем каждый раз при изменении данных
    updateUI();
});

// Инициализация начального интерфейса
loadGame();

// Эмуляция прибыли в час (каждую секунду добавляем прибыль)
setInterval(() => {
    balance += profitPerHour / 3600;  // Прибыль раз в секунду
    saveGame();  // Сохраняем данные каждую секунду
    updateUI();
}, 1000);

// Переключение вкладок
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Скрываем все вкладки
        tabContents.forEach(content => {
            content.classList.add('hidden');
        });

        // Показываем нужную вкладку
        document.getElementById(`${targetTab}-content`).classList.remove('hidden');
    });
});
