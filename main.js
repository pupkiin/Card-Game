class Card {
  _open = false;
  _hasPair = false;

  constructor(num, findPair) {
    this.card = document.createElement('div');
    this.card.classList.add('card');
    this.card.textContent = num;
    this.num = num;

    this.card.addEventListener('click', () => {
      if (this.open == false && this.hasPair == false) {
        this.open = true;
        findPair(this);
      }
    })

    document.getElementById('card-place').append(this.card);
  }

  set open(value) {
    this._open = value;
    if (value) {
      this.card.classList.add('card-open');
    } else {
      this.card.classList.remove('card-open');
    }
  }

  get open() {
    return this._open;
  }

  set hasPair(value) {
    this._hasPair = value;
    if (value) {
      this.card.classList.add('card-pair');
    } else {
      this.card.classList.remove('card-pair');
    }
  }

  get hasPair() {
    return this._hasPair;
  }

}
// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
function createNumbersArray(count) {
  let mass1 = [];
  let mass2 = [];
  for (let i = 0; i < count; i++) {
    mass1[i] = i + 1;
  }

  for (let i = 0; i < count; i++) {
    mass2[i] = i + 1;
  }

  resultMass = [...mass1, ...mass2];
  return resultMass;
}

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел
function shuffle(arr) {
  let j, temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.
function startGame(count) {
  let arr = shuffle(createNumbersArray(count));
  let cardsArr = [];
  firstCard = null;
  secondCard = null;

  for (cardNum of arr) {
    cardsArr.push(new Card(cardNum, findPair))
  }

  function findPair(card) {
    // если карточки не равны
    if (firstCard !== null && secondCard !== null) {
      if (firstCard.num != secondCard.num) {
        firstCard.open = false;
        secondCard.open = false;
        // обнуляем содержимое первой и второй карточки
        firstCard = null;
        secondCard = null;
      }
    }

    if (firstCard == null) {
      firstCard = card;
    } else {
      if (secondCard == null) {
        secondCard = card;
      }
    }

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.num == secondCard.num) {
        firstCard.hasPair = true;
        secondCard.hasPair = true;
        // обнуляем содержимое первой и второй карточки
        firstCard = null;
        secondCard = null;
      }
    }

    function gameOver() {
      alert('Игра окончена!');
      document.getElementById('card-place').innerHTML = '';
      // удалить wrapper!
      if(document.getElementById('wrapper')) {
        document.getElementById('wrapper').innerHTML = '';
      }

      cardsArr = [];
      firstCard = null;
      secondCard = null;

      wrapper = document.createElement('div');
      wrapper.classList.add('wrapper');
      wrapper.id = 'wrapper';
      button = document.createElement('button');
      button.classList.add('btn', 'btn-primary');
      button.textContent = 'Начать сначала';

      button.addEventListener('click', () => {
        startGame(8);
        button.classList.add('disabled');
      })

      wrapper.append(button);
      document.getElementById('container').append(wrapper);
    }

    if (document.querySelectorAll('.card-pair').length == cardsArr.length) {
      setTimeout(gameOver, 300);
    }
  }
}

startGame(8);




