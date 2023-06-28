
//Начало код JS Анжелика

// Меню бургер
const iconMenu= document.querySelector(".header__icon");
if(iconMenu){
    const menuNav= document.querySelector(".header__nav"); 

    iconMenu.addEventListener('click', function(e){
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuNav.classList.toggle('_active');
    })
}
//Открытие и закрытие модального окна
const buttonOpen= document.querySelector(".banner__button");//ищем кнопку открытия модального окна
const modalwindow= document.querySelector(".modal-window");//ищем модальное окно
const bottonClose= document.querySelector(".modal-window__button");//ищем кнопку закрытия модального окна

buttonOpen.onclick =function(){
  modalwindow.style.display="block";
}

bottonClose.onclick =function(){
  modalwindow.style.display="none";
}
window.onclick=function(event){
  if(event.target == modalwindow){
    modalwindow.style.display="none"
  }
}
// Форма подписки(регистрация + пожелание на день из api при регистраци)
const btnFormNews = document.querySelector(".form-news__button"); //находим кнопку в разметке ,записываем ее в переменную
const errorMesForm = document.querySelector(".form-news__errorMessage"); //находим разметку, где будет отображаться сообщение об ошибке
const resultFormNews = document.querySelector(".form-news__result"); //находим разметку, где будет отображаться сообщение c результатом

btnFormNews.onclick = function(event){// вешаем событие на кнопку
  event.preventDefault(); //отменяем дефолтное submit у кнопки
  resultFormNews.innerHTML = " "; //очищаем поле с результатом
  errorMesForm.innerHTML = " "; //очищаем поле с сообщением об ошибке
  const nameUser = document.querySelector(".form-news__name").value;//находим значение инпута с именем ,записываем значение в переменную
  const email = document.querySelector(".form-news__email").value;//находим значение инпута с email ,записываем значение в переменную
 
  if(nameUser ==="" || email ===""){ //проверяем заполненность инпутов ,если хоть одно поле не заполнено 
  errorMesForm.innerHTML="Please fill in your name and email for further registration";//выводим сообщение об ошибке
  errorMesForm.classList.add('form-news__errorMesForm');
  }
  else{
    fetch("https://type.fit/api/quotes")
    .then((response) =>{
      return response.json();
    })
    .then((data) =>{  
      const pResultMessage =document.createElement('p');// создаем элемент p  срезультатом сообщения о регистрации
      pResultMessage.classList.add('form-news__text');// Добавляем ему класс
      pResultMessage.innerHTML=`${nameUser}, thank you for registering!`;//Записываем в разметку
      resultFormNews.appendChild(pResultMessage);// Добавляем элемент в разметку
      const advice= document.createElement('p');// создаем элемент p  срезультатом совета на день
      advice.classList.add('form-news__textAdvice');// Добавляем ему класс
      const indexData = Math.floor(Math.random()*data.length)
      advice.innerHTML= `Advice of the day:" ${data[indexData].text}"`;
      resultFormNews.appendChild(advice);
    })
    .catch((error) => {
      //выводим сообщение об ошибке
      errorMesForm.innerHTML = `<p class="errorText">Sorry, there was an error during registration.Try again in a few minutes:(</p>`;
    });
    document.querySelector(".form-news__name").value =
    ""; //возвращаем начальное значение в инпут имени
    document.querySelector(".form-news__email").value = ""; //возвращаем изначальное значение в инпут имейл
  }
}
//Конец код JS Анжелика

// Safiullova / START 
const btnProduct = document.querySelector(".nutrients__form-button");  // Кнопка поиска продукта по названию
const productName = document.querySelector(".nutrients__form-input"); // Находим input в котором ввели название продукта
const productCardPicture = document.querySelector(".nutrients__card-picture"); // Элемент для вставки изображения продукта
const productCardTitle = document.querySelector(".nutrients__card-title"); // Элемент для вставки наименования продукта
const productCardNutrientsValue = document.querySelector("#nutrientsValue"); // Элемент (список) для отображения количества веществ в продукте
const productCardError = document.querySelector(".nutrients__form-error"); // Элемент с сообщением об ошибке
const productsSelectArr = document.querySelector("#productsSelect"); // Элемент выпадающего списка подсказок

function autoComplete (e) { // функция автозаполнения поля ввода продукта
  fetch (
    `https://api.edamam.com/auto-complete?app_id=b44244ac&app_key=6c563eac886cc3efc770b33d53ad0838&q=${productName.value}`
  )//обращаемся к API в соответствии с введенными пользователем символами в input
  .then((response) => {
    return response.json(); 
  })
  .then((data) => {
let productsSelect = ""; // переменая для выпадающего списка
for (let i=0; i<=data.length; i++) { // перебираю элементы массива совпадений из API
  productsSelect += ` <option value="${data[i]}">` // создаю элементы выпадающего списка из массива
};
productsSelectArr.innerHTML = ` <datalist id="productsSelect"> 
  ${productsSelect} </datalist>`; // создание списка подсказок
  })
}
productName.addEventListener('input', autoComplete ); // слушатель события при вводе символов в Input

btnProduct.onclick = function (e) {  // фнкция будет отображать карточку продукта, который ввел пользователь
  e.preventDefault(); // убираю submit
  console.log(productName);
  productCardError.innerHTML = " "; // очистка сообщения об ошибке
   if (productName.value == 0) {  //проверка, если пользователь не ввел значение, появится сообщение
    productCardError.innerHTML = "Please enter the product you want to know about";
  } else {
    fetch(
      `https://api.edamam.com/api/food-database/v2/parser?app_id=99d8e87e&app_key=00390c7f538b7700bb34ee921fe04978&ingr=${productName.value}&nutrition-type=cooking`
)//обращаемся к API в соответствии с введенными пользователем параметрами для поиска - продукт
      .then((response) => {
    return response.json(); 
  })
      .then((data) => {
        productCardPicture.innerHTML =
        `<img class="nutrients__card-picture" src="${data.hints[0].food.image}" alt="product picture" />`
        productCardTitle.innerHTML = 
`<p class="nutrients__card-title">${data.hints[0].food.label}, 100g</p>`;
productCardNutrientsValue.innerHTML =
`<ul class="nutrients__card-list"  id="nutrientsValue">
  <li class="nutrients__card-list__item">${data.hints[0].food.nutrients.ENERC_KCAL.toFixed(1)}</li>
  <li class="nutrients__card-list__item">${data.hints[0].food.nutrients.PROCNT.toFixed(1)}</li>
  <li class="nutrients__card-list__item">${data.hints[0].food.nutrients.FAT.toFixed(1)}</li>
  <li class="nutrients__card-list__item">${data.hints[0].food.nutrients.CHOCDF.toFixed(1)}</li>
  <li class="nutrients__card-list__item">${data.hints[0].food.nutrients.FIBTG.toFixed(1)}</li>
</ul>`
      })
      .catch((error) => {
        //выводим сообщение об ошибке, если она возникла
        productCardError.innerHTML = "Sorry, we couldn't find any data for this product. Please try again!";
      })
      .finally(() => {
        // что- то еще сюда написать
      });
  }
  productName.value = " "; // очистка поля ввода продукта
}

// Safiullova / END 

//Clifford / START

const btnRanRec = document.querySelector(".randomRecipe__form__button"); //находим кнопку в разметке и задаем переменную ей
const spinner = document.querySelector(".result__spinner"); //находим спиннер в разметке и задаем переменную ей
const resultDisplay = document.querySelector(".result-display"); //находим разметку, где будут отражаться рецепты
const errorMessage = document.querySelector(".errorMessage"); //находим разметку, где будет отображаться сообщение об ошибке
spinner.style.display = "none"; //убираем отображение спиннера в обычном режиме

btnRanRec.onclick = function (e) {
  //создаем функцию, которая будет срабатывать при клике на кнопку
  e.preventDefault(); //отменяем дефолтное submit у кнопки
  spinner.style.display = "block"; //задаем отображение спинеру загрузки
  document.querySelector(".input_error-message").innerHTML = " "; //убираем сообщение о незаполненных инпутах
  resultDisplay.innerHTML = " "; //очищаем поле с результатом поиска
  errorMessage.innerHTML = " "; //очищаем поле с сообщением об ошибке

  const mealType = document.querySelector(".form__inputs__meal").value; //находим инпут со значением приема пищи
  const product = document.querySelector(".form__inputs__product").value; // находим инпут со значением продукта

  if (mealType == "Please select meal type" || product.length === 0) {
    //проверяем заполненность инпутов
    document.querySelector(
      //если хотя бы один из инпутов не заполнен, выводим в поле разметки для ошибки инпутов сообщение
      ".input_error-message"
    ).innerHTML =
      "Please select meal type and a product, that you wish to include in the recipe";
    spinner.style.display = "none"; //убираем отображение спинера
  } else {
    fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${product}&app_id=cedf5a94&app_key=86e377f38e1d30b44776242e0c405d20&mealType=${mealType}`
    ) //обращаемся к API в соответствии с введенными пользователем параметрами для поиска - продукт и прием пищи
      .then((response) => {
        return response.json(); //преобразовываем данные в массив
      })
      .then((data) => {
        // выводим необходимые нам данные из массива, создаем разметку для result__item
        resultDisplay.innerHTML = `<div class="result__item"><img src="${
          data.hits[0].recipe.image
        }" alt="recipeImage" class="item__img" /> 
        <div class="item__info">
        <div class="item__type">${
          data.hits[0].recipe.dishType
        }</div> <div class="item__diet">${
          data.hits[0].recipe.dietLabels
        } </div><div class="item__title">${data.hits[0].recipe.label}</div>
        <div class="item__labels">${data.hits[0].recipe.healthLabels.join(
          ""
        )} </div>
        <div class="item__ingredients">Ingredients: ${data.hits[0].recipe.ingredientLines.join(
          ","
        )} </div>
        <a href="${
          data.hits[0].recipe.url
        }" class="item__prep">Preparation</a></div></div>`;
      })
      .catch((error) => {
        //выводим сообщение об ошибке, если она возникла
        errorMessage.innerHTML = `<p class="errorText">Sorry, we couldn't find any recipe. Please try again!</p>`;
      })
      .finally(() => {
        //в конце убираем отображение спинера
        spinner.style.display = "none";
      });
  }
  document.querySelector(".form__inputs__meal").value =
    "Please select meal type"; //возвращаем изначальное значение в инпут
  document.querySelector(".form__inputs__product").value = ""; //возвращаем изначальное значение в инпут
};

//Clifford / END
