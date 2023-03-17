let headingEl = document.querySelector(".heading");
let randomMealContainer = document.querySelector(".random-meal-info");
headingEl.style.display = "block";
randomMealContainer.style.display = "none";

function displayRandomMeal() {
  headingEl.style.display = "none";
  randomMealContainer.style.display = "block";
  let UrlRandomMeal = `https://www.themealdb.com/api/json/v1/1/random.php`;
  axios.get(UrlRandomMeal).then(getRandomMeal);
}

function getRandomMeal(response) {
  console.log(response.data.meals[0]);

  randomMealContainer.innerHTML = `
        <div class ="video-box">
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${response.data.meals[0].strYoutube.slice(
          32
        )}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        <span id="mealname" class="meal-name">${
          response.data.meals[0].strMeal
        }</span>
        <ul class="meal-info">
          <li>
            <strong>Category :</strong>
            <span>${response.data.meals[0].strCategory}</span>
          </li>
          <li>
            <strong>Area :</strong>
            <span>${response.data.meals[0].strArea}</span>
          </li>
          <li id="tags-el">
          </li>
        </ul>
        <img
          src="${response.data.meals[0].strMealThumb}"
          alt="${response.data.meals[0].strMeal}"
          class="random-img"
        />

        <div class="ingredients-img-box">
          <div class="ingredients-box">
            <h2>Ingredients</h2>
            <ul id = "ingredients-el">
            </ul>
          </div>
          <div class="img-box">
            <img
              src="${response.data.meals[0].strMealThumb}"
              alt="${response.data.meals[0].strMeal}"
            />
          </div>
        </div>
        <div class="instructions-box">
          <h2>instructions</h2>
          <p>
          ${response.data.meals[0].strInstructions}
          </p>
        </div>
`;
  let tagsEl = document.getElementById("tags-el");
  if (response.data.meals[0].strTags === null) {
  } else {
    tagsEl.innerHTML = `<strong>Tags :</strong>
            <span>${response.data.meals[0].strTags}</span>
`;
  }

  let ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (!response.data.meals[0]["strIngredient" + i]) {
      break;
    } else {
      ingredients.push(
        `${response.data.meals[0]["strIngredient" + i]} - ${
          response.data.meals[0]["strMeasure" + i]
        }`
      );
    }
  }
  let ingredientsEl = document.getElementById("ingredients-el");
  ingredients.forEach((item) => {
    ingredientsEl.innerHTML += `<li>${item}</li>`;
  });
}
