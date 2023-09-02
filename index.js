const iconMenu = document.querySelector(".header__icon");
const menuNav = document.querySelector(".header__nav");
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("_lock");
    iconMenu.classList.toggle("_active");
    menuNav.classList.toggle("_active");
  });
  menuNav.addEventListener("click", function (e) {
    document.body.classList.remove("_lock");
    iconMenu.classList.toggle("_active");
    menuNav.classList.toggle("_active");
  });
}
const buttonOpen = document.querySelector(".banner__button"); 
const modalwindow = document.querySelector(".modal-window"); 
const bottonClose = document.querySelector(".modal-window__button");

buttonOpen.onclick = function () {
  modalwindow.style.display = "block";
};

bottonClose.onclick = function () {
  modalwindow.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modalwindow) {
    modalwindow.style.display = "none";
  }
};

const btnFormNews = document.querySelector(".form-news__button"); 
const errorMesForm = document.querySelector(".form-news__errorMessage"); 
const resultFormNews = document.querySelector(".form-news__result"); 

btnFormNews.onclick = function (event) {
  event.preventDefault(); 
  resultFormNews.innerHTML = " "; 
  errorMesForm.innerHTML = " "; 
  const nameUser = document.querySelector(".form-news__name").value; 
  const email = document.querySelector(".form-news__email").value; 

  if (nameUser === "" || email === "") {
    errorMesForm.innerHTML =
      "Please fill in your name and email for further registration"; 
    errorMesForm.classList.add("form-news__errorMesForm");
  } else {
    fetch("https://type.fit/api/quotes")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const pResultMessage = document.createElement("p");
        pResultMessage.classList.add("form-news__text");
        pResultMessage.innerHTML = `${nameUser}, thank you for registering!`; 
        resultFormNews.appendChild(pResultMessage);
        const advice = document.createElement("p"); 
        advice.classList.add("form-news__textAdvice");
        const indexData = Math.floor(Math.random() * data.length);
        advice.innerHTML = `Advice of the day:" ${data[indexData].text}"`;
        resultFormNews.appendChild(advice);
      })
      .catch((error) => {
        errorMesForm.innerHTML = `<p class="errorText">Sorry, there was an error during registration.Try again in a few minutes: ${error}</p>`;
      });
    document.querySelector(".form-news__name").value = ""; 
    document.querySelector(".form-news__email").value = ""; 
  }
};

const registeringButton = document.querySelector(".registration-form__button"); 
const headerText = document.querySelector(".header__text");
registeringButton.addEventListener("click", function (event) {
  event.preventDefault(); 
  const nameRegistering = document.querySelector(
    ".registration-form__name"
  ).value;
  headerText.textContent = `Hi, ${nameRegistering}!`;
});

const btnProduct = document.querySelector(".nutrients__form-button"); 
const productName = document.querySelector(".nutrients__form-input"); 
const productCardPicture = document.querySelector(".nutrients__card-picture"); 
const productCardTitle = document.querySelector(".nutrients__card-title"); 
const productCardNutrientsValue = document.querySelector("#nutrientsValue"); 
const productCardError = document.querySelector(".nutrients__form-error"); 
const productsSelectArr = document.querySelector("#productsSelect"); 

function autoComplete(e) {
  fetch(
    `https://api.edamam.com/auto-complete?app_id=b44244ac&app_key=6c563eac886cc3efc770b33d53ad0838&q=${productName.value}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let productsSelect = "";
      for (let i = 0; i <= data.length; i++) {
        productsSelect += ` <option value="${data[i]}">`; 
      }
      productsSelectArr.innerHTML = ` <datalist id="productsSelect"> 
  ${productsSelect} </datalist>`;
    });
}
productName.addEventListener("input", autoComplete); 
btnProduct.onclick = function (e) {
  e.preventDefault();
  console.log(productName);
  productCardError.innerHTML = " ";
  if (productName.value == 0) {
    productCardError.innerHTML =
      "Please enter the product you want to know about";
  } else {
    fetch(
      `https://api.edamam.com/api/food-database/v2/parser?app_id=99d8e87e&app_key=00390c7f538b7700bb34ee921fe04978&ingr=${productName.value}&nutrition-type=cooking`
    ) 
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        productCardPicture.innerHTML = `<img class="nutrients__card-picture" src="${data.hints[0].food.image}" alt="product picture" />`;
        productCardTitle.innerHTML = `<p class="nutrients__card-title">${data.hints[0].food.label}, 100g</p>`;
        productCardNutrientsValue.innerHTML = `<ul class="nutrients__card-list"  id="nutrientsValue">
  <li class="nutrients__card-list__item">${data.hints[0].food.nutrients.ENERC_KCAL.toFixed(
    1
  )}</li>
  <li class="nutrients__card-list__item">${data.hints[0].food.nutrients.PROCNT.toFixed(
    1
  )}</li>
  <li class="nutrients__card-list__item">${data.hints[0].food.nutrients.FAT.toFixed(
    1
  )}</li>
  <li class="nutrients__card-list__item">${data.hints[0].food.nutrients.CHOCDF.toFixed(
    1
  )}</li>
  <li class="nutrients__card-list__item">${data.hints[0].food.nutrients.FIBTG.toFixed(
    1
  )}</li>
</ul>`;
      })
      .catch((error) => {
        productCardError.innerHTML =
          "Sorry, we couldn't find any data for this product. Please try again!";
      })
  }
  productName.value = " "; 
};

const btnRanRec = document.querySelector(".randomRecipe__form__button"); 
const spinner = document.querySelector(".result__spinner"); 
const resultDisplay = document.querySelector(".result-display"); 
const errorMessage = document.querySelector(".errorMessage"); 
spinner.style.display = "none";

btnRanRec.onclick = function (e) {
  e.preventDefault(); 
  spinner.style.display = "block"; 
  document.querySelector(".input_error-message").innerHTML = " "; 
  resultDisplay.innerHTML = " "; 
  errorMessage.innerHTML = " "; 

  const mealType = document.querySelector(".form__inputs__meal").value;
  const product = document.querySelector(".form__inputs__product").value; 

  if (mealType == "Please select meal type" || product.length === 0) {
    document.querySelector(
      ".input_error-message"
    ).innerHTML =
      "Please select meal type and a product, that you wish to include in the recipe";
    spinner.style.display = "none"; 
  } else {
    fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${product}&app_id=cedf5a94&app_key=86e377f38e1d30b44776242e0c405d20&mealType=${mealType}`
    ) 
      .then((response) => {
        return response.json(); 
      })
      .then((data) => {
        let i = Math.floor(Math.random() * data.hits.length); 
        resultDisplay.innerHTML = `<div class="result__item"><img src="${
          data.hits[i].recipe.image
        }" alt="recipeImage" class="item__img" /> 
        <div class="item__info">
        <div class="item__type">${
          data.hits[i].recipe.dishType
        }</div> <div class="item__diet">${
          data.hits[i].recipe.dietLabels
        } </div><div class="item__title">${data.hits[i].recipe.label}</div>
        <div class="item__labels">${data.hits[i].recipe.healthLabels.join(
          ""
        )} </div>
        <div class="item__ingredients">Ingredients: ${data.hits[
          i
        ].recipe.ingredientLines.join(",")} </div>
        <a href="${
          data.hits[i].recipe.url
        }" class="item__prep" target="_blank">Preparation</a></div></div>`;
      })
      .catch((error) => {
        errorMessage.innerHTML = `<p class="errorText">Sorry, we couldn't find any recipe. Please try again!</p>`;
      })
      .finally(() => {
        spinner.style.display = "none";
      });
  }
  document.querySelector(".form__inputs__meal").value =
    "Please select meal type"; 
  document.querySelector(".form__inputs__product").value = ""; 
};

function calculateCalories() {
  const age = Number(document.getElementById("age").value);
  const gender = document.querySelector('input[name="gender"]:checked')?.value;
  const weight = Number(document.getElementById("weight").value);
  const height = Number(document.getElementById("height").value);
  const activityLevel = document.getElementById("activity").value;
  const goal = document.getElementById("goal").value;
  const macronutrients = document.getElementById("macronutrients").value;
  const loadingDiv = document.getElementById("loading");
  const resultDiv = document.getElementById("result");
  const errorDiv = document.getElementById("error");

  resultDiv.textContent = "";
  errorDiv.textContent = "";

  if (!age) {
    errorDiv.textContent = "Error: Fill in the 'Age' field";
    return;
  }
  if (!gender) {
    errorDiv.textContent = "Error: Select field 'Gender'";
    return;
  }
  if (!weight || isNaN(weight) || weight < 40 || weight > 160) {
    errorDiv.textContent = "Error: Incorrect value in the 'Weight' field";
    return;
  }
  if (!height || isNaN(height) || height < 130 || height > 230) {
    errorDiv.textContent = "Error: Incorrect value in the 'Height' field";
    return;
  }
  if (!activityLevel) {
    errorDiv.textContent = "Error: Select field 'Activity Level'";
    return;
  }
  loadingDiv.style.display = "block";

  const url = `https://fitness-calculator.p.rapidapi.com/dailycalorie?age=${age}&gender=${gender}&weight=${weight}&height=${height}&activitylevel=${activityLevel}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a456518623msh308f85c8cdc0685p1504cejsn468aa2a2bb58",
      "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((response) => {
      loadingDiv.style.display = "none";
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); 
      const calorieResult = data.data?.BMR;

      if (calorieResult) {
        resultDiv.innerHTML = `Daily calorie: ${calorieResult}`;
      } else {
        errorDiv.innerHTML = "Error: Invalid data format";
      }
    })
    .catch((error) => {
      loadingDiv.style.display = "none";
      if (error.message === "Failed to fetch") {
        errorDiv.innerHTML = `Error: ${error.message}`;
      } else {
        errorDiv.innerHTML = "Error: 404  Not Found" + error.message;
      }
    })
    .finally(() => {
      loadingDiv.style.display = "none";
    });
}

const form = document.getElementById("calculatorForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  calculateCalories();
});

const shareWithUsBtn = document.querySelector(".share-with-us__btn");
const shareWithUsError = document.querySelector(".share-with-us__error"); 
const shareWithUsGratitude =document.querySelector(".share-with-us__gratitude"); 
const shareWithUsName = document.querySelector(".share-with-us__input_name");
const shareWithUsComment = document.querySelector(".share-with-us__input_comment"); 

shareWithUsBtn.addEventListener("click", (event) => {
event.preventDefault(); 
if (shareWithUsName.value === "" || shareWithUsComment.value === "") {
shareWithUsError.innerHTML =`Please fill in the fields your name and comment`; 
shareWithUsGratitude.innerHTML=""
}
else {
shareWithUsGratitude.innerHTML = `Thanks for your comment!`;
shareWithUsError.innerHTML ="";
}
document.querySelector(".share-with-us__form").reset();
});
