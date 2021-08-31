const searchBtn = document.getElementById("src-btn");

// searchBtn event handler

searchBtn.addEventListener("click", () => {
  // getting meal name from search form
  let mealName = document.getElementById("src-form").value;
  mealName = mealName.trim();
  // console.log(mealName);
  mealName.value = "";

  if (mealName != "") {
    findMeals(mealName);
  } else {
    let emptyField = "please type meal name";
    alertMessage(emptyField, "red");
  }
});

// fetching mealItems

const findMeals = (searchValue) => {
  const mealList = document.getElementById("meal-list");
  mealList.innerHTML = "";
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const itemName = data.meals;
      console.log(itemName);
      if (itemName === null) {
        let msg = "Meal not found";
        alertMessage(msg, "red");
      } else {
        itemName.forEach((item) => {
          const newDiv = document.createElement("div");
          newDiv.setAttribute("class", "col-3");
          newDiv.setAttribute("onclick", "displaySingleMeal(event)");
          const newParentDiv = `
                    <div class = "card" style="width: 18rem;">
                    <img class="img-fluid" src='${item.strMealThumb}' alt="">
                    <div class="card-body">
                      <h5 class="card-title text-center">${item.strMeal}</h5>        
                    </div>
                   </div> 
                    
                    `;
          newDiv.innerHTML = newParentDiv;
          mealList.appendChild(newDiv);
        });
      }
    });
};

// display alert message

const alertMessage = (message, color) => {
  const alertMsg = document.getElementById("alert-msg");
  console.log();
  alertMsg.children[0].innerText = message;
  alertMsg.style.display = "block";
  alertMsg.style.backgroundColor = color;
};

// single meal click handler

const displaySingleMeal = (event) => {
  let details =
    event.currentTarget.children[0].children[1].children[0].innerText;
  details = details.trim();
  displayMealData(details);
};

// display single meal data

const displayMealData = (mealName) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
  fetch(url)
    .then((res) => res.json())
    .then((item) => {
      const meal = item.meals[0];
      console.log(meal);

      const mealImage = document.getElementById("meal-image");
      mealImage.setAttribute("src", `${meal.strMealThumb}`);
      document.getElementById("meal-title").innerText = `${meal.strMeal}`;
      const listGroup = document.getElementById("list-group");
      listGroup.innerHTML = "";
      document.getElementById("single-meal").style.display = "block";
      let i = 1;

      while (i !== 0) {
        let ingredients = `strIngredient${i}`;
        if (meal[ingredients] === "" || meal[ingredients] === null) {
          break;
        } else {
          // let listItem = `<li class="list-group-item">${meal[ingredients]}</li>`
          let listItem = document.createElement("li");
          listItem.setAttribute("class", "list-group-item");
          listItem.innerHTML = `<i class="fa fa-check-square text-success"></i> ${meal[ingredients]}`;
          listGroup.appendChild(listItem);
          i++;
        }
        i++;
      }
    });
};
